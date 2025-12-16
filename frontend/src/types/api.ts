import type { Project } from "./project";
import type { Phase } from "./phases";

// Backend API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Customer profile from backend
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  customertype?: 'B2B' | 'B2C';
  adminmanager?: {
    id: string;
    name: string;
    email: string;
  };
  isactive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Project with phases (from GET /customers/projects/:id endpoint)
export interface ProjectWithPhases extends Project {
  phases?: Phase[];
}

// Meeting from backend
export interface Meeting {
  id: string;
  projectid: string;
  phaseid?: {
    id: string;
    name: string;
    typeofphase: string;
  };
  customerid?: string;
  title: string;
  description: string;
  summary: string;
  scheduledat: string; // ISO date
  durationminutes?: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingtype?: 'online' | 'offline' | 'hybrid';
  meetinglink?: string;
  attendees: {
    id?: string;
    name: string;
    email?: string;
    role: string;
  }[];
  actionitems: {
    id?: string;
    text: string;
    assignee?: string;
    duedate?: string;
    completed: boolean;
  }[];
  linkeddocuments?: {
    id: string;
    filename: string;
    filesize: number;
    filetype: string;
  }[];
  createdby?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Document from backend
export interface Document {
  id: string;
  projectid: string;
  metadata: {
    phaseid?: string;
    phasetype?: string;
    taskid?: string;
  };
  filename: string;
  filepath: string;
  filesize: number;
  filetype: string;
  category: 'passport' | 'visa' | 'ticket' | 'invoice' | 'contract' | 'design' | 'photo' | 'floorplan' | 'quotation' | 'other';
  visibility: 'allphases' | 'phaseonly' | 'taskonly';
  uploadedby: {
    id: string;
    name: string;
    type: 'admin' | 'customer';
  };
  approvalstatus?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Notification from backend
export interface Notification {
  id: string;
  customerid: string;
  projectid?: string;
  phaseid?: {
    id: string;
    name: string;
    typeofphase: string;
  };
  documentid?: string;
  channel: 'wati' | 'email' | 'inapp';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  triggerevent?: string;
  status: 'pending' | 'sent' | 'failed';
  read: boolean;
  readat?: string;
  createdAt: string;
  updatedAt: string;
}
