import React from 'react';
import { Document } from '../types';
import { FileText, Download, Image, FileSpreadsheet, File } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'image':
        return Image;
      case 'spreadsheet':
        return FileSpreadsheet;
      default:
        return File;
    }
  };

  const FileIcon = getFileIcon(document.type);

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'Unknown size';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const getTypeColor = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'image':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'spreadsheet':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <div className={`w-12 h-12 flex-shrink-0 rounded-lg border flex items-center justify-center ${getTypeColor(document.type)}`}>
        <FileIcon className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 truncate mb-1">
          {document.name}
        </h4>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{formatFileSize(document.size)}</span>
          <span>•</span>
          <span>
            Uploaded {format(new Date(document.uploadedAt), 'MMM d, yyyy')}
          </span>
          <span>•</span>
          <span>{document.uploadedBy}</span>
        </div>
        {document.description && (
          <p className="text-xs text-slate-600 mt-1 line-clamp-1">
            {document.description}
          </p>
        )}
      </div>

      <button
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        title="Download document"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
}
