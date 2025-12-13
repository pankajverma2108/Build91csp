import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useProjectDetail, useProjectStages } from '../hooks/useQueries';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { StageTimeline } from '../components/StageTimeline';
import { DocumentsTab } from '../components/DocumentsTab';
import { CommentsTab } from '../components/CommentsTab';
import { ArrowLeft, MapPin } from 'lucide-react';
import { format } from 'date-fns';

type TabType = 'documents' | 'activity';

export function ProjectDetailScreen() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('documents');
  const { isAuthenticated, selectedStageCode, selectStage } = useStore();
  
  const { data: project, isLoading: isLoadingProject } = useProjectDetail(projectId);
  const { data: stages, isLoading: isLoadingStages } = useProjectStages(projectId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Set default selected stage to current stage
    if (project && !selectedStageCode) {
      selectStage(project.currentStageCode);
    }
  }, [project, selectedStageCode, selectStage]);

  const isLoading = isLoadingProject || isLoadingStages;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner text="Loading project details..." />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Project not found</p>
          <button
            onClick={() => navigate('/projects')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 truncate">
                {project.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
                <span>•</span>
                <span>Started {format(new Date(project.startDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-0.5">Overall Progress</p>
                <p className="text-lg font-bold text-blue-600">{project.overallProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stage Timeline */}
        {stages && stages.length > 0 && (
          <div className="mb-6">
            <StageTimeline
              stages={stages}
              selectedStageCode={selectedStageCode}
              onStageSelect={selectStage}
            />
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('documents')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'documents'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                Documents
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'activity'
                    ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                Activity
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'documents' && projectId && selectedStageCode && (
              <DocumentsTab projectId={projectId} stageCode={selectedStageCode} />
            )}
            {activeTab === 'activity' && projectId && selectedStageCode && (
              <CommentsTab projectId={projectId} stageCode={selectedStageCode} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
