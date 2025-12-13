import React from 'react';
import { StageCode, getStageConfig } from '../config/stages';
import { useStageComments } from '../hooks/useQueries';
import { LoadingSpinner } from './shared/LoadingSpinner';
import { EmptyState } from './shared/EmptyState';
import { CommentItem } from './CommentItem';
import { EMPTY_STATE_MESSAGES } from '../config/messages';
import { MessageSquare } from 'lucide-react';

interface CommentsTabProps {
  projectId: string;
  stageCode: StageCode;
}

export function CommentsTab({ projectId, stageCode }: CommentsTabProps) {
  const { data: comments, isLoading } = useStageComments(projectId, stageCode);
  const stageConfig = getStageConfig(stageCode);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Activity - {stageConfig.label}
        </h3>
        <p className="text-sm text-slate-600">
          Comments and updates for this stage
        </p>
      </div>

      {isLoading ? (
        <LoadingSpinner text="Loading activity..." />
      ) : comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title={EMPTY_STATE_MESSAGES.noComments.title}
          description={EMPTY_STATE_MESSAGES.noComments.description}
        />
      )}
    </div>
  );
}
