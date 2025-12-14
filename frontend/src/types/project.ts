import type { Phase } from "./phases";

export interface Project {
  id: string;
  name: string;
  referenceCode?: string;
  location?: string;
  customerName?: string;
  overallStatus: "completed" | "in-progress" | "pending" | "on-hold";
  currentPhaseId: Phase["id"];
  phases: Phase[];
}
