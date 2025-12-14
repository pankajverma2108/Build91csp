import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../services/mockApi";

export function useProject(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId!),
    enabled: !!projectId,
  });
}
