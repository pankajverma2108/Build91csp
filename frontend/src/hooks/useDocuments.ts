import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../services/mockApi";

export function useDocuments(projectId: string, phaseId?: string) {
  return useQuery({
    queryKey: ["documents", projectId, phaseId],
    queryFn: () => getDocuments({ projectId, phaseId }),
    enabled: !!projectId,
  });
}
