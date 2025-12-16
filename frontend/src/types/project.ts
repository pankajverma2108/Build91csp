import type { PhaseId } from "./phases";

export interface Project {
  id: string;
  customerid: {
    id: string;
    name: string;
    email: string;
  };
  adminid: {
    id: string;
    name: string;
    email: string;
  };
  projecttype: string;
  projectdescription?: string;
  projectlevelbudget?: number;
  location?: string;
  status: 'draft' | 'active' | 'onhold' | 'completed' | 'cancelled';
  currentphase: PhaseId;
  estimatedstartdate?: string;
  estimatedcompletedate?: string;
  actualstartdate?: string;
  actualcompletedate?: string;
  ordervalue?: number;
  createdAt: string;
  updatedAt: string;
}
