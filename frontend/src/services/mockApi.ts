import { MOCK_PROJECT } from "../mock/mockProjects";
import { MOCK_DOCUMENTS } from "../mock/mockDocuments";
import type { Project } from "../types/project";
import type { DocumentMeta } from "../types/documents";

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
  // ignore params for now, single-project mock
  return [MOCK_PROJECT];
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  if (projectId === MOCK_PROJECT.id) return MOCK_PROJECT;
  return null;
}

export async function getPhases(projectId: string): Promise<Project["phases"]> {
  if (projectId !== MOCK_PROJECT.id) return [];
  return MOCK_PROJECT.phases;
}

export async function getDocuments(params: {
  projectId: string;
  phaseId?: string;
}): Promise<DocumentMeta[]> {
  const { projectId, phaseId } = params;
  if (projectId !== MOCK_PROJECT.id) return [];
  if (!phaseId) return MOCK_DOCUMENTS;
  return MOCK_DOCUMENTS.filter((doc) => doc.phaseId === phaseId);
}
