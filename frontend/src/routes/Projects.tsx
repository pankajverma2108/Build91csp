import { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { KPICards } from "../components/KPICards";
import { PhaseCards } from "../components/PhaseCards";
import { MeetingSection } from "../components/MeetingSection";
import { DocumentsFiles } from "../components/DocumentsFiles";
import { ContactTeam } from "../components/ContactTeam";
import { ChatSessions } from "../components/ChatSessions";
import { useProjects } from "../hooks/useProjects";
import { useDocuments } from "../hooks/useDocuments";
import { PhaseCardsSkeleton } from "../components/skeletons/PhaseCardsSkeleton";
import { DocumentsSkeleton } from "../components/skeletons/DocumentsSkeleton";
import { KPICardsSkeleton } from "../components/skeletons/KPICardsSkeleton";

export function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterPhase, setFilterPhase] = useState<string>("all");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>("planning");

  const { data: projects, isLoading, error } = useProjects("customer-1");

  const project = projects?.[0] ?? null;
  const phases = project?.phases ?? [];

  const { data: allDocuments, isLoading: isLoadingDocs } = useDocuments(
    project?.id ?? "",
    undefined
  );

  const visibleDocuments =
    selectedPhaseId && allDocuments
      ? allDocuments.filter((d) => d.phaseId === selectedPhaseId)
      : allDocuments ?? [];

  return (
    <div className="flex-1 flex flex-col bg-background">
      <FilterBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterPhase={filterPhase}
        setFilterPhase={setFilterPhase}
      />

      <main className="flex-1 overflow-auto">
        <div className="max-w-480 mx-auto">
          <WelcomeBanner />

          <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
            {error && (
              <p className="text-sm text-destructive">
                Failed to load projects.
              </p>
            )}

            {!error && !project && !isLoading && (
              <p className="text-sm text-muted-foreground">
                No projects found.
              </p>
            )}

            {isLoading ? (
              <>
                <KPICardsSkeleton />
                <PhaseCardsSkeleton />
                <DocumentsSkeleton />
              </>
            ) : (
              project && (
                <>
                  <KPICards />
                  <PhaseCards
                    filterPhase={filterPhase}
                    viewMode={viewMode}
                    phases={phases}
                    selectedPhaseId={selectedPhaseId}
                    onSelectPhase={setSelectedPhaseId}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <ContactTeam />
                    <ChatSessions />
                  </div>
                  <MeetingSection />
                  {isLoadingDocs ? (
                    <DocumentsSkeleton />
                  ) : (
                    <DocumentsFiles documents={visibleDocuments} />
                  )}
                </>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
