import type { PhaseId } from "./phases";

export type DocumentVisibility = "customer" | "admin" | "internal";

export interface DocumentMeta {
  id: string;
  name: string;
  size?: string;
  type?: string;
  url?: string;
  phaseId: PhaseId;
  phase: string; // display label e.g. "Onboarding", "Design Planning"
  uploadDate?: string;
  uploadedAt?: string; // optional, can mirror uploadDate if needed
  uploadedBy?: string;
  task?: string;
  assignedContact?: string;
  visibility?: DocumentVisibility;
}
