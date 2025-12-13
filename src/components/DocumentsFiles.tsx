import React from 'react';
import { FileText, Download, Upload, Eye, CheckCircle } from 'lucide-react';

export function DocumentsFiles() {
  const documents = [
    {
      id: 1,
      name: 'Contract_Agreement.pdf',
      phase: 'Onboarding',
      task: 'Upload signed agreement',
      uploadedBy: 'Pankaj Verma',
      uploadDate: 'Dec 5, 2025',
      size: '2.4 MB',
      approved: true,
      assignedContact: 'Pankaj Verma'
    },
    {
      id: 2,
      name: 'Design_Specs.pdf',
      phase: 'Planning & Design',
      task: 'Upload product specs',
      uploadedBy: 'Upmanyu',
      uploadDate: 'Dec 10, 2025',
      size: '3.2 MB',
      approved: true,
      assignedContact: 'Upmanyu'
    },
    {
      id: 3,
      name: 'Budget_Plan.xlsx',
      phase: 'Planning & Design',
      task: 'Budget confirmation',
      uploadedBy: 'Sarah Chen',
      uploadDate: 'Dec 12, 2025',
      size: '124 KB',
      approved: false,
      assignedContact: 'Upmanyu'
    },
    {
      id: 4,
      name: 'KYC_Documents.pdf',
      phase: 'Onboarding',
      task: 'Confirm your details',
      uploadedBy: 'Sarah Chen',
      uploadDate: 'Dec 6, 2025',
      size: '1.8 MB',
      approved: true,
      assignedContact: 'Pankaj Verma'
    }
  ];

  return (
    <div className="bg-card border-2 border-slate-300 rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-foreground font-semibold">Documents & Files</h2>
        <span className="text-lg">📄</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-3 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex flex-col h-full"
          >
            {/* Header with Icon and Actions */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <FileText className="w-8 h-8 text-slate-600 flex-shrink-0" />
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors" title="View" />
                <Download className="w-4 h-4 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors" title="Download" />
              </div>
            </div>

            {/* Document Name */}
            <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-1">{doc.name}</h3>

            {/* Phase Badge and Metadata */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-300 font-medium">
                {doc.phase}
              </span>
              <span>•</span>
              <span>{doc.size}</span>
              <span>•</span>
              <span>{doc.uploadDate}</span>
            </div>

            {/* Details */}
            <div className="space-y-0.5 text-xs flex-1">
              <div className="flex items-start gap-1">
                <span className="font-medium text-slate-900 whitespace-nowrap">Task:</span>
                <span className="text-muted-foreground line-clamp-1">{doc.task}</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="font-medium text-slate-900 whitespace-nowrap">Uploaded by:</span>
                <span className="text-muted-foreground line-clamp-1">{doc.uploadedBy}</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="font-medium text-slate-900 whitespace-nowrap">Assigned Contact:</span>
                <span className="text-muted-foreground line-clamp-1">{doc.assignedContact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}