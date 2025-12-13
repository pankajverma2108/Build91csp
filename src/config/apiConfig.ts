// API Configuration
// These endpoints are placeholders for future backend integration

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Auth
  login: '/auth/login',
  logout: '/auth/logout',
  me: '/auth/me',
  
  // Customers
  customers: '/customers',
  customer: (id: string) => `/customers/${id}`,
  
  // Projects
  projects: '/projects',
  project: (id: string) => `/projects/${id}`,
  customerProjects: (customerId: string) => `/customers/${customerId}/projects`,
  
  // Stages
  projectStages: (projectId: string) => `/projects/${projectId}/stages`,
  stage: (projectId: string, stageCode: string) => `/projects/${projectId}/stages/${stageCode}`,
  
  // Documents
  documents: '/documents',
  projectDocuments: (projectId: string) => `/projects/${projectId}/documents`,
  stageDocuments: (projectId: string, stageCode: string) => `/projects/${projectId}/stages/${stageCode}/documents`,
  document: (id: string) => `/documents/${id}`,
  documentDownload: (id: string) => `/documents/${id}/download`,
  
  // Comments
  comments: '/comments',
  stageComments: (projectId: string, stageCode: string) => `/projects/${projectId}/stages/${stageCode}/comments`,
  
  // Meetings
  meetings: '/meetings',
  projectMeetings: (projectId: string) => `/projects/${projectId}/meetings`,
};

export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};
