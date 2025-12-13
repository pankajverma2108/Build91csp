import { StageCode } from '../config/stages';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  avatar?: string;
  createdAt: string;
}

export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';
export type StageStatus = 'not-started' | 'in-progress' | 'completed' | 'on-hold';

export interface Project {
  id: string;
  name: string;
  description?: string;
  location: string;
  status: ProjectStatus;
  currentStageCode: StageCode;
  customerId: string;
  startDate: string;
  estimatedEndDate?: string;
  actualEndDate?: string;
  overallProgress: number; // 0-100
  budget?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stage {
  id: string;
  projectId: string;
  stageCode: StageCode;
  status: StageStatus;
  startDate?: string;
  endDate?: string;
  estimatedDuration?: number; // in days
  actualDuration?: number; // in days
  progress: number; // 0-100
  tasksTotal?: number;
  tasksCompleted?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentType = 'pdf' | 'image' | 'spreadsheet' | 'document' | 'other';
export type AuthorType = 'customer' | 'team';

export interface Document {
  id: string;
  projectId: string;
  stageCode?: StageCode;
  name: string;
  type: DocumentType;
  mimeType?: string;
  url: string;
  size?: number; // in bytes
  uploadedAt: string;
  uploadedBy: string;
  uploadedByType: AuthorType;
  description?: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  projectId: string;
  stageCode?: StageCode;
  authorType: AuthorType;
  authorName: string;
  authorAvatar?: string;
  message: string;
  timestamp: string;
  isInternal?: boolean;
  attachments?: string[];
}

export interface Milestone {
  id: string;
  projectId: string;
  stageCode: StageCode;
  title: string;
  description?: string;
  dueDate: string;
  completedDate?: string;
  isCompleted: boolean;
  priority?: 'low' | 'medium' | 'high';
}

// Mock data type for testing scenarios
export interface MockDataScenario {
  name: string;
  customer: Customer;
  projects: Project[];
  stages: Record<string, Stage[]>;
  documents: Record<string, Document[]>;
  comments: Record<string, Comment[]>;
}
