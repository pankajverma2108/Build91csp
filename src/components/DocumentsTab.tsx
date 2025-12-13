import React from 'react';
import { StageCode, getStageConfig } from '../config/stages';
import { useStageDocuments } from '../hooks/useQueries';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { EmptyState } from './shared/EmptyState';
import { DocumentCard } from './DocumentCard';
import { EMPTY_STATE_MESSAGES } from '../config/messages';
import { FileText } from 'lucide-react';

interface DocumentsTabProps {
  projectId: string;
  stageCode: StageCode;
}

export function DocumentsTab({ projectId, stageCode }: DocumentsTabProps) {
  const { data: documents, isLoading } = useStageDocuments(projectId, stageCode);
  const stageConfig = getStageConfig(stageCode);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Documents - {stageConfig.label}
        </h3>
        <p className="text-sm text-slate-600">
          {stageConfig.description}
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Loading documents..." />
      ) : documents && documents.length > 0 ? (
        <div className="space-y-3">
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title={EMPTY_STATE_MESSAGES.noDocuments.title}
          description={EMPTY_STATE_MESSAGES.noDocuments.description}
        />
      )}
    </div>
  );
}
