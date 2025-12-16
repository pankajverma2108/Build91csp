import { MOCK_PROJECTS, MOCK_PROJECT_WITH_PHASES, MOCK_PHASES } from "../mock/mockProjects";
import { MOCK_DOCUMENTS } from "../mock/mockDocuments";
import type { Project } from "../types/project";
import type { ProjectWithPhases } from "../types/api";
import type { Phase } from "../types/phases";
import type { DocumentMeta } from "../types/documents";

// Helper function for simulating API delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function authMe(): Promise<{ id: string; name: string }> {
  // v1: pretend the customer is logged in
  return { id: "customer-1", name: "Demo Customer" };
}

export async function getCustomers(): Promise<{ id: string; name: string }[]> {
  return [{ id: "customer-1", name: "Demo Customer" }];
}

export async function getProjects(params?: {
  customerId?: string;
}): Promise<Project[]> {
  await delay(300);
  
  if (params?.customerId) {
    return MOCK_PROJECTS.filter(
      (p) => p.customerid.id === params.customerId
    );
  }
  
  return MOCK_PROJECTS;
}

export async function getProjectById(projectId: string): Promise<ProjectWithPhases> {
  await delay(300);
  
  if (projectId === MOCK_PROJECT_WITH_PHASES.id) {
    return MOCK_PROJECT_WITH_PHASES;
  }
  
  throw new Error("Project not found");
}

export async function getPhases(projectId: string): Promise<Phase[]> {
  await delay(300);
  
  if (projectId === MOCK_PROJECT_WITH_PHASES.id) {
    return MOCK_PHASES;
  }
  
  return [];
}

export async function getDocuments(params: {
  projectId: string;
  phaseId?: string;
}): Promise<DocumentMeta[]> {
  await delay(300);
  const { projectId, phaseId } = params;
  
  if (projectId !== MOCK_PROJECT_WITH_PHASES.id) {
    return [];
  }
  
  if (!phaseId) return MOCK_DOCUMENTS;
  return MOCK_DOCUMENTS.filter((doc) => doc.phaseId === phaseId);
}
