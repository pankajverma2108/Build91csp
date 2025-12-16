import { useState } from "react";
import { ChevronDown, ChevronRight, Grid3x3, List, Eye, Download, FileText } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { useDocuments } from "../hooks/useDocuments";
import { PHASE_CONFIG } from "../config/phases";
import type { PhaseId } from "../types/phases";

export function Documents() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [expandedPhases, setExpandedPhases] = useState<PhaseId[]>(["onboarding"]);

  const { data: projects } = useProjects("customer-1");
  const project = projects?.[0] ?? null;
  
  const { data: allDocuments } = useDocuments(project?.id ?? "", undefined);

  const togglePhase = (phaseId: PhaseId) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getDocumentsByPhase = (phaseId: PhaseId) => {
    return allDocuments?.filter((doc) => doc.phaseId === phaseId) ?? [];
  };

  const getFileIcon = (type?: string) => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const handleView = (doc: any) => {
    if (doc.url) {
      window.open(doc.url, "_blank");
    }
  };

  const handleDownload = (doc: any) => {
    if (doc.url) {
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-card border-b-2 border-slate-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Documents</h1>
            <p className="text-sm text-muted-foreground mt-1">
              All project documents organized by phase
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border-2 border-slate-300">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-white border-2 border-slate-300 shadow-sm"
                  : "hover:bg-slate-200"
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-white border-2 border-slate-300 shadow-sm"
                  : "hover:bg-slate-200"
              }`}
              title="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Documents Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {Object.values(PHASE_CONFIG).map((phaseConfig) => {
            const isExpanded = expandedPhases.includes(phaseConfig.id);
            const docs = getDocumentsByPhase(phaseConfig.id);

            return (
              <div key={phaseConfig.id} className="bg-card border-2 border-slate-300 rounded-lg overflow-hidden">
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phaseConfig.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-sm font-bold text-blue-700">
                      {phaseConfig.order}
                    </span>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{phaseConfig.label}</h3>
                      <p className="text-xs text-muted-foreground">{phaseConfig.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {docs.length} {docs.length === 1 ? "document" : "documents"}
                  </span>
                </button>

                {/* Phase Documents */}
                {isExpanded && (
                  <div className="border-t-2 border-slate-300 bg-slate-50">
                    {docs.length === 0 ? (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        No documents in this phase yet.
                      </div>
                    ) : viewMode === "list" ? (
                      // LIST VIEW
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-100 border-b-2 border-slate-300">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-900">Name</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-900">Details</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-900">Uploaded By</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-900">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y-2 divide-slate-300 bg-white">
                            {docs.map((doc) => (
                              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-3">
                                    {getFileIcon(doc.type)}
                                    <span className="text-sm font-medium text-foreground">{doc.name}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="text-sm text-muted-foreground">
                                    {doc.uploadDate && <div>Uploaded {doc.uploadDate}</div>}
                                    {doc.size && <div className="text-xs">{doc.size}</div>}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className="text-sm text-muted-foreground">{doc.uploadedBy || "—"}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleView(doc)}
                                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                                      title="View document"
                                    >
                                      <Eye className="w-4 h-4 text-slate-600" />
                                    </button>
                                    <button
                                      onClick={() => handleDownload(doc)}
                                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                                      title="Download document"
                                    >
                                      <Download className="w-4 h-4 text-slate-600" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      // GRID VIEW
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {docs.map((doc) => (
                          <div
                            key={doc.id}
                            className="bg-white border-2 border-slate-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            {/* Document Thumbnail */}
                            <div className="h-40 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                              <FileText className="w-16 h-16 text-slate-400" />
                            </div>
                            {/* Document Info */}
                            <div className="p-3">
                              <h4 className="font-semibold text-sm text-foreground truncate" title={doc.name}>
                                {doc.name}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {doc.uploadDate && `Uploaded ${doc.uploadDate}`}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <span className="text-xs text-muted-foreground">{doc.size || "—"}</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleView(doc)}
                                    className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                    title="View document"
                                  >
                                    <Eye className="w-4 h-4 text-slate-600" />
                                  </button>
                                  <button
                                    onClick={() => handleDownload(doc)}
                                    className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                                    title="Download document"
                                  >
                                    <Download className="w-4 h-4 text-slate-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
