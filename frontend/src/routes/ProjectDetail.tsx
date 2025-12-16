import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useDocuments } from "../hooks/useDocuments";
import { PhaseCards } from "../components/PhaseCards";
import { Header } from "../components/Header";
import { DocumentsFiles } from "../components/DocumentsFiles";
import { PhaseCardsSkeleton } from "../components/skeletons/PhaseCardsSkeleton";
import { DocumentsSkeleton } from "../components/skeletons/DocumentsSkeleton";

export function ProjectDetail() {
  const { projectId } = useParams();
  const [filterPhase, setFilterPhase] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>("planninganddesign");

  const { data: project, isLoading, error } = useProject(projectId);
  const { data: allDocuments, isLoading: isLoadingDocs } = useDocuments(
    projectId ?? "",
    undefined
  );

  const phases = project?.phases ?? [];
  const visibleDocuments =
    selectedPhaseId && allDocuments
      ? allDocuments.filter((d) => d.phaseId === selectedPhaseId)
      : allDocuments ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-480 mx-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        {isLoading && (
          <>
            <div className="space-y-2">
              <div className="h-7 w-64 bg-muted animate-pulse rounded" />
              <div className="h-5 w-32 bg-muted animate-pulse rounded" />
            </div>
            <PhaseCardsSkeleton />
            <DocumentsSkeleton />
          </>
        )}

        {error && (
          <p className="text-sm text-destructive">Failed to load project.</p>
        )}

        {!isLoading && !error && !project && (
          <p className="text-sm text-muted-foreground">Project not found.</p>
        )}

        {!isLoading && !error && project && (
          <>
            <div>
              <h1 className="text-xl font-semibold">{project.projecttype}</h1>
              <p className="text-sm text-muted-foreground">{project.location}</p>
            </div>

            <PhaseCards
              filterPhase={filterPhase}
              viewMode={viewMode}
              phases={phases}
              selectedPhaseId={selectedPhaseId}
              onSelectPhase={setSelectedPhaseId}
            />

            {isLoadingDocs ? (
              <DocumentsSkeleton />
            ) : (
              <DocumentsFiles documents={visibleDocuments} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
