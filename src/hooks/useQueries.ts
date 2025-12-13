import { useQuery } from '@tanstack/react-query';
import { 
  getCustomerProjects, 
  getProjectById, 
  getProjectStages, 
  getStageDocuments, 
  getStageComments 
} from '../services/mockApi';
import { StageCode } from '../config/stages';

export function useProjects(customerId: string | null | undefined, enabled: boolean = true) {
  return useQuery({
    queryKey: ['projects', customerId],
    queryFn: () => customerId ? getCustomerProjects(customerId) : Promise.resolve([]),
    enabled: enabled && !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProjectDetail(projectId: string | null | undefined) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectId ? getProjectById(projectId) : Promise.resolve(null),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProjectStages(projectId: string | null | undefined) {
  return useQuery({
    queryKey: ['projectStages', projectId],
    queryFn: () => projectId ? getProjectStages(projectId) : Promise.resolve([]),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useStageDocuments(
  projectId: string | null | undefined, 
  stageCode: StageCode | null | undefined
) {
  return useQuery({
    queryKey: ['stageDocuments', projectId, stageCode],
    queryFn: () => 
      projectId && stageCode 
        ? getStageDocuments(projectId, stageCode) 
        : Promise.resolve([]),
    enabled: !!projectId && !!stageCode,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useStageComments(
  projectId: string | null | undefined, 
  stageCode: StageCode | null | undefined
) {
  return useQuery({
    queryKey: ['stageComments', projectId, stageCode],
    queryFn: () => 
      projectId && stageCode 
        ? getStageComments(projectId, stageCode) 
        : Promise.resolve([]),
    enabled: !!projectId && !!stageCode,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}
