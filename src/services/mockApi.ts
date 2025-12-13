import { Customer, Project, Stage, Document, Comment } from '../types';
import { StageCode } from '../config/stages';

// Simulate API delay (configurable via env or default to 300ms)
const DEFAULT_DELAY = Number(import.meta.env.VITE_MOCK_DELAY) || 300;
const delay = (ms: number = DEFAULT_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Customers
const mockCustomers: Record<string, Customer> = {
  'customer-1': {
    id: 'customer-1',
    name: 'Upmanyu Sharma',
    email: 'upmanyu@example.com',
    phone: '+91-9876543210',
    companyName: 'Tech Innovations Ltd',
    avatar: 'https://ui-avatars.com/api/?name=Upmanyu+Sharma&background=0066FF&color=fff',
    createdAt: '2024-01-15T10:00:00Z',
  },
  'customer-2': {
    id: 'customer-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0123',
    companyName: 'Global Ventures Inc',
    createdAt: '2024-02-01T10:00:00Z',
  },
  'customer-empty': {
    id: 'customer-empty',
    name: 'New Customer',
    email: 'new@example.com',
    phone: '+1-555-9999',
    createdAt: '2024-12-01T10:00:00Z',
  },
};

// Mock Projects
const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Smart Home Devices Manufacturing',
    description: 'Manufacturing of IoT-enabled smart home devices including thermostats, security cameras, and door locks.',
    location: 'Shenzhen, China',
    status: 'active',
    currentStageCode: 'MANUFACTURING',
    customerId: 'customer-1',
    startDate: '2024-10-01T00:00:00Z',
    estimatedEndDate: '2025-03-31T00:00:00Z',
    overallProgress: 65,
    budget: 500000,
    currency: 'USD',
    createdAt: '2024-09-15T10:00:00Z',
    updatedAt: '2024-12-10T15:30:00Z',
  },
  {
    id: 'project-2',
    name: 'Office Furniture Sourcing',
    description: 'Bulk sourcing of ergonomic office furniture for corporate offices.',
    location: 'Guangzhou, China',
    status: 'active',
    currentStageCode: 'TRAVEL',
    customerId: 'customer-1',
    startDate: '2024-11-15T00:00:00Z',
    estimatedEndDate: '2025-02-28T00:00:00Z',
    overallProgress: 30,
    budget: 150000,
    currency: 'USD',
    createdAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-12-12T10:00:00Z',
  },
  {
    id: 'project-3',
    name: 'Electronics Components Supply',
    description: 'Sourcing high-quality electronics components for manufacturing.',
    location: 'Shanghai, China',
    status: 'completed',
    currentStageCode: 'INSTALLATION',
    customerId: 'customer-2',
    startDate: '2024-06-01T00:00:00Z',
    estimatedEndDate: '2024-11-30T00:00:00Z',
    actualEndDate: '2024-11-28T00:00:00Z',
    overallProgress: 100,
    budget: 300000,
    currency: 'USD',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-11-28T16:00:00Z',
  },
];

// Mock Stages
const mockStages: Record<string, Stage[]> = {
  'project-1': [
    {
      id: 'stage-1-1',
      projectId: 'project-1',
      stageCode: 'PLANNING',
      status: 'completed',
      startDate: '2024-10-01T00:00:00Z',
      endDate: '2024-10-10T00:00:00Z',
      estimatedDuration: 10,
      actualDuration: 9,
      progress: 100,
      tasksTotal: 5,
      tasksCompleted: 5,
      notes: 'Initial planning completed successfully',
      createdAt: '2024-10-01T10:00:00Z',
      updatedAt: '2024-10-10T17:00:00Z',
    },
    {
      id: 'stage-1-2',
      projectId: 'project-1',
      stageCode: 'TRAVEL',
      status: 'completed',
      startDate: '2024-10-11T00:00:00Z',
      endDate: '2024-10-20T00:00:00Z',
      estimatedDuration: 10,
      actualDuration: 9,
      progress: 100,
      tasksTotal: 8,
      tasksCompleted: 8,
      notes: 'Factory visits completed',
      createdAt: '2024-10-11T10:00:00Z',
      updatedAt: '2024-10-20T18:00:00Z',
    },
    {
      id: 'stage-1-3',
      projectId: 'project-1',
      stageCode: 'ORDERING',
      status: 'completed',
      startDate: '2024-10-21T00:00:00Z',
      endDate: '2024-10-30T00:00:00Z',
      estimatedDuration: 10,
      actualDuration: 9,
      progress: 100,
      tasksTotal: 6,
      tasksCompleted: 6,
      notes: 'Orders placed with suppliers',
      createdAt: '2024-10-21T10:00:00Z',
      updatedAt: '2024-10-30T16:00:00Z',
    },
    {
      id: 'stage-1-4',
      projectId: 'project-1',
      stageCode: 'MANUFACTURING',
      status: 'in-progress',
      startDate: '2024-11-01T00:00:00Z',
      estimatedDuration: 60,
      progress: 70,
      tasksTotal: 12,
      tasksCompleted: 8,
      notes: 'Manufacturing in progress, on schedule',
      createdAt: '2024-11-01T10:00:00Z',
      updatedAt: '2024-12-12T14:00:00Z',
    },
    {
      id: 'stage-1-5',
      projectId: 'project-1',
      stageCode: 'DELIVERY',
      status: 'not-started',
      estimatedDuration: 20,
      progress: 0,
      tasksTotal: 5,
      tasksCompleted: 0,
      createdAt: '2024-11-01T10:00:00Z',
      updatedAt: '2024-11-01T10:00:00Z',
    },
    {
      id: 'stage-1-6',
      projectId: 'project-1',
      stageCode: 'INSTALLATION',
      status: 'not-started',
      estimatedDuration: 10,
      progress: 0,
      tasksTotal: 4,
      tasksCompleted: 0,
      createdAt: '2024-11-01T10:00:00Z',
      updatedAt: '2024-11-01T10:00:00Z',
    },
  ],
  'project-2': [
    {
      id: 'stage-2-1',
      projectId: 'project-2',
      stageCode: 'PLANNING',
      status: 'completed',
      startDate: '2024-11-15T00:00:00Z',
      endDate: '2024-11-25T00:00:00Z',
      estimatedDuration: 10,
      actualDuration: 10,
      progress: 100,
      tasksTotal: 4,
      tasksCompleted: 4,
      createdAt: '2024-11-15T10:00:00Z',
      updatedAt: '2024-11-25T17:00:00Z',
    },
    {
      id: 'stage-2-2',
      projectId: 'project-2',
      stageCode: 'TRAVEL',
      status: 'in-progress',
      startDate: '2024-11-26T00:00:00Z',
      estimatedDuration: 14,
      progress: 50,
      tasksTotal: 6,
      tasksCompleted: 3,
      notes: 'Currently visiting furniture manufacturers',
      createdAt: '2024-11-26T10:00:00Z',
      updatedAt: '2024-12-12T10:00:00Z',
    },
    {
      id: 'stage-2-3',
      projectId: 'project-2',
      stageCode: 'ORDERING',
      status: 'not-started',
      estimatedDuration: 7,
      progress: 0,
      tasksTotal: 5,
      tasksCompleted: 0,
      createdAt: '2024-11-26T10:00:00Z',
      updatedAt: '2024-11-26T10:00:00Z',
    },
    {
      id: 'stage-2-4',
      projectId: 'project-2',
      stageCode: 'MANUFACTURING',
      status: 'not-started',
      estimatedDuration: 30,
      progress: 0,
      tasksTotal: 8,
      tasksCompleted: 0,
      createdAt: '2024-11-26T10:00:00Z',
      updatedAt: '2024-11-26T10:00:00Z',
    },
    {
      id: 'stage-2-5',
      projectId: 'project-2',
      stageCode: 'DELIVERY',
      status: 'not-started',
      estimatedDuration: 20,
      progress: 0,
      tasksTotal: 4,
      tasksCompleted: 0,
      createdAt: '2024-11-26T10:00:00Z',
      updatedAt: '2024-11-26T10:00:00Z',
    },
    {
      id: 'stage-2-6',
      projectId: 'project-2',
      stageCode: 'INSTALLATION',
      status: 'not-started',
      estimatedDuration: 5,
      progress: 0,
      tasksTotal: 3,
      tasksCompleted: 0,
      createdAt: '2024-11-26T10:00:00Z',
      updatedAt: '2024-11-26T10:00:00Z',
    },
  ],
};

// Mock Documents
const mockDocuments: Record<string, Document[]> = {
  'project-1-PLANNING': [
    {
      id: 'doc-1-1',
      projectId: 'project-1',
      stageCode: 'PLANNING',
      name: 'Project Requirements Document.pdf',
      type: 'pdf',
      mimeType: 'application/pdf',
      url: '/documents/project-requirements.pdf',
      size: 245000,
      uploadedAt: '2024-10-05T10:00:00Z',
      uploadedBy: 'Build91 Team',
      uploadedByType: 'team',
      description: 'Detailed project requirements and specifications',
      tags: ['requirements', 'planning'],
    },
    {
      id: 'doc-1-2',
      projectId: 'project-1',
      stageCode: 'PLANNING',
      name: 'Budget Breakdown.xlsx',
      type: 'spreadsheet',
      mimeType: 'application/vnd.ms-excel',
      url: '/documents/budget-breakdown.xlsx',
      size: 128000,
      uploadedAt: '2024-10-08T14:30:00Z',
      uploadedBy: 'Build91 Team',
      uploadedByType: 'team',
      description: 'Detailed budget analysis',
      tags: ['budget', 'financial'],
    },
  ],
  'project-1-TRAVEL': [
    {
      id: 'doc-1-3',
      projectId: 'project-1',
      stageCode: 'TRAVEL',
      name: 'Factory Visit Photos.zip',
      type: 'other',
      mimeType: 'application/zip',
      url: '/documents/factory-photos.zip',
      size: 5200000,
      uploadedAt: '2024-10-18T16:00:00Z',
      uploadedBy: 'Build91 Team',
      uploadedByType: 'team',
      description: 'Photos from factory visits',
      tags: ['photos', 'factory'],
    },
  ],
  'project-1-MANUFACTURING': [
    {
      id: 'doc-1-4',
      projectId: 'project-1',
      stageCode: 'MANUFACTURING',
      name: 'Quality Control Report.pdf',
      type: 'pdf',
      mimeType: 'application/pdf',
      url: '/documents/qc-report.pdf',
      size: 350000,
      uploadedAt: '2024-12-05T11:00:00Z',
      uploadedBy: 'Build91 Team',
      uploadedByType: 'team',
      description: 'First batch quality control report',
      tags: ['quality', 'inspection'],
    },
    {
      id: 'doc-1-5',
      projectId: 'project-1',
      stageCode: 'MANUFACTURING',
      name: 'Production Timeline.pdf',
      type: 'pdf',
      mimeType: 'application/pdf',
      url: '/documents/production-timeline.pdf',
      size: 180000,
      uploadedAt: '2024-11-10T09:00:00Z',
      uploadedBy: 'Build91 Team',
      uploadedByType: 'team',
      description: 'Updated production schedule',
      tags: ['timeline', 'schedule'],
    },
  ],
  'project-2-PLANNING': [
    {
      id: 'doc-2-1',
      projectId: 'project-2',
      stageCode: 'PLANNING',
      name: 'Furniture Specifications.pdf',
      type: 'pdf',
      mimeType: 'application/pdf',
      url: '/documents/furniture-specs.pdf',
      size: 420000,
      uploadedAt: '2024-11-20T10:00:00Z',
      uploadedBy: 'Sarah Johnson',
      uploadedByType: 'customer',
      description: 'Detailed furniture specifications and requirements',
      tags: ['specifications', 'furniture'],
    },
  ],
};

// Mock Comments
const mockComments: Record<string, Comment[]> = {
  'project-1-PLANNING': [
    {
      id: 'comment-1-1',
      projectId: 'project-1',
      stageCode: 'PLANNING',
      authorType: 'team',
      authorName: 'Build91 Team',
      message: 'Planning phase completed successfully. All requirements documented and approved.',
      timestamp: '2024-10-10T17:00:00Z',
    },
  ],
  'project-1-MANUFACTURING': [
    {
      id: 'comment-1-2',
      projectId: 'project-1',
      stageCode: 'MANUFACTURING',
      authorType: 'team',
      authorName: 'Build91 Team',
      message: 'Manufacturing is progressing well. First batch completed quality inspection.',
      timestamp: '2024-12-05T11:30:00Z',
    },
    {
      id: 'comment-1-3',
      projectId: 'project-1',
      stageCode: 'MANUFACTURING',
      authorType: 'customer',
      authorName: 'Upmanyu Sharma',
      message: 'Great to hear! When can we expect the next batch?',
      timestamp: '2024-12-05T14:00:00Z',
    },
    {
      id: 'comment-1-4',
      projectId: 'project-1',
      stageCode: 'MANUFACTURING',
      authorType: 'team',
      authorName: 'Build91 Team',
      message: 'The second batch is scheduled for completion by December 20th.',
      timestamp: '2024-12-06T09:00:00Z',
    },
  ],
  'project-2-TRAVEL': [
    {
      id: 'comment-2-1',
      projectId: 'project-2',
      stageCode: 'TRAVEL',
      authorType: 'team',
      authorName: 'Build91 Team',
      message: 'Currently visiting three furniture manufacturers in Guangzhou. Will share photos soon.',
      timestamp: '2024-12-10T10:00:00Z',
    },
  ],
};

// API Functions
export async function getCustomerProjects(customerId: string): Promise<Project[]> {
  await delay();
  
  const projects = mockProjects.filter(p => p.customerId === customerId);
  return projects;
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  await delay();
  
  const project = mockProjects.find(p => p.id === projectId);
  return project || null;
}

export async function getProjectStages(projectId: string): Promise<Stage[]> {
  await delay();
  
  const stages = mockStages[projectId] || [];
  return stages;
}

export async function getStageDocuments(projectId: string, stageCode: StageCode): Promise<Document[]> {
  await delay(300);
  
  const key = `${projectId}-${stageCode}`;
  const documents = mockDocuments[key] || [];
  return documents;
}

export async function getStageComments(projectId: string, stageCode: StageCode): Promise<Comment[]> {
  await delay(300);
  
  const key = `${projectId}-${stageCode}`;
  const comments = mockComments[key] || [];
  return comments;
}

export async function mockLogin(phone: string): Promise<Customer> {
  await delay(800);
  
  // For demo, any phone number returns customer-1
  // Phone ending in '9999' returns customer-empty
  if (phone.endsWith('9999')) {
    return mockCustomers['customer-empty'];
  }
  
  return mockCustomers['customer-1'];
}

export async function getCustomerById(customerId: string): Promise<Customer | null> {
  await delay();
  
  return mockCustomers[customerId] || null;
}
