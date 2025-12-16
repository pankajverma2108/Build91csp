// Backend API Response Types

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  city?: string;
  customertype: 'B2B' | 'B2C';
  adminmanager?: {
    id: string;
    name: string;
    email: string;
  };
  isactive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Meeting {
  id: string;
  projectid: string;
  phaseid?: {
    id: string;
    name: string;
    typeofphase: string;
  };
  title: string;
  description: string;
  summary: string;
  scheduledat: string; // ISO date
  status: 'scheduled' | 'completed' | 'cancelled';
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
