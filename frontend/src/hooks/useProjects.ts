import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/mockApi";

export function useProjects(customerId?: string) {
  return useQuery({
    queryKey: ["projects", customerId],
    queryFn: () => getProjects({ customerId }),
    enabled: !!customerId, // only fetch if customerId is set
  });
}
