import { MOCK_PROJECTS } from "../mock/mockProjects";
import { MOCK_DOCUMENTS } from "../mock/mockDocuments";
import type { Project } from "../types/project";
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

export async function getProjectById(projectId: string): Promise<Project> {
  await delay(300);
  const project = MOCK_PROJECTS.find((p) => p.id === projectId);
  
  if (!project) {
    throw new Error("Project not found");
  }
  
  return project;
}

export async function getPhases(projectId: string): Promise<any[]> {
  await delay(300);
  const project = MOCK_PROJECTS.find((p) => p.id === projectId);
  return project ? [] : []; // Return phases when you add them to Project type
}

export async function getDocuments(params: {
  projectId: string;
  phaseId?: string;
}): Promise<DocumentMeta[]> {
  await delay(300);
  const { projectId, phaseId } = params;
  
  const project = MOCK_PROJECTS.find((p) => p.id === projectId);
  if (!project) return [];
  
  if (!phaseId) return MOCK_DOCUMENTS;
  return MOCK_DOCUMENTS.filter((doc) => doc.phaseId === phaseId);
}
