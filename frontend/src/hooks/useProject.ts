import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../services/mockApi";
import type { ProjectWithPhases } from "../types/api";

export function useProject(projectId: string | undefined) {
  return useQuery<ProjectWithPhases>({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId!),
    enabled: !!projectId,
  });
}
