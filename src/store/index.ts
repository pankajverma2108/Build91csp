import { create } from 'zustand';
import { Customer, Project, Stage } from '../types';
import { StageCode } from '../config/stages';
import { 
  mockLogin, 
  getCustomerProjects, 
  getProjectById, 
  getProjectStages 
} from '../services/mockApi';

interface AuthState {
  currentCustomer: Customer | null;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<void>;
  logout: () => void;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  currentProjectStages: Stage[];
  selectedStageCode: StageCode | null;
  isLoadingProjects: boolean;
  isLoadingProjectDetail: boolean;
  loadProjects: () => Promise<void>;
  loadProjectDetail: (projectId: string) => Promise<void>;
  selectStage: (stageCode: StageCode | null) => void;
  clearCurrentProject: () => void;
}

type Store = AuthState & ProjectState;

export const useStore = create<Store>((set, get) => ({
  // Auth State
  currentCustomer: null,
  isAuthenticated: false,
  
  login: async (phone: string) => {
    try {
      const customer = await mockLogin(phone);
      set({ 
        currentCustomer: customer, 
        isAuthenticated: true 
      });
      
      // Auto-load projects after login
      const projects = await getCustomerProjects(customer.id);
      set({ projects });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  logout: () => {
    set({ 
      currentCustomer: null, 
      isAuthenticated: false,
      projects: [],
      currentProject: null,
      currentProjectStages: [],
      selectedStageCode: null,
    });
  },
  
  // Project State
  projects: [],
  currentProject: null,
  currentProjectStages: [],
  selectedStageCode: null,
  isLoadingProjects: false,
  isLoadingProjectDetail: false,
  
  loadProjects: async () => {
    const { currentCustomer } = get();
    if (!currentCustomer) {
      console.error('No customer logged in');
      return;
    }
    
    set({ isLoadingProjects: true });
    try {
      const projects = await getCustomerProjects(currentCustomer.id);
      set({ projects, isLoadingProjects: false });
    } catch (error) {
      console.error('Failed to load projects:', error);
      set({ isLoadingProjects: false });
      throw error;
    }
  },
  
  loadProjectDetail: async (projectId: string) => {
    set({ isLoadingProjectDetail: true });
    try {
      const [project, stages] = await Promise.all([
        getProjectById(projectId),
        getProjectStages(projectId),
      ]);
      
      set({ 
        currentProject: project,
        currentProjectStages: stages,
        selectedStageCode: project?.currentStageCode || null,
        isLoadingProjectDetail: false,
      });
    } catch (error) {
      console.error('Failed to load project detail:', error);
      set({ isLoadingProjectDetail: false });
      throw error;
    }
  },
  
  selectStage: (stageCode: StageCode | null) => {
    set({ selectedStageCode: stageCode });
  },
  
  clearCurrentProject: () => {
    set({ 
      currentProject: null,
      currentProjectStages: [],
      selectedStageCode: null,
    });
  },
}));
