import React from 'react';
import { Comment } from '../types';
import { User, Users } from 'lucide-react';
import { format } from 'date-fns';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const isTeam = comment.authorType === 'team';

  return (
    <div className="flex gap-3">
      <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
        isTeam ? 'bg-blue-100' : 'bg-emerald-100'
      }`}>
        {comment.authorAvatar ? (
          <img
            src={comment.authorAvatar}
            alt={comment.authorName}
            className="w-10 h-10 rounded-full"
          />
        ) : isTeam ? (
          <Users className="w-5 h-5 text-blue-600" />
        ) : (
          <User className="w-5 h-5 text-emerald-600" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-slate-900 text-sm">
              {comment.authorName}
            </span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${
              isTeam 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              {isTeam ? 'Team' : 'Customer'}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {comment.message}
          </p>
        </div>
        <p className="text-xs text-slate-500 mt-1 ml-1">
          {format(new Date(comment.timestamp), 'MMM d, yyyy h:mm a')}
        </p>
      </div>
    </div>
  );
}
