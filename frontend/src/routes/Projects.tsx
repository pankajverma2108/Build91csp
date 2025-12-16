import { useState } from "react";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { PhaseCards } from "../components/PhaseCards";
import { MeetingSection } from "../components/MeetingSection";
import { ContactTeam } from "../components/ContactTeam";
import { ChatSessions } from "../components/ChatSessions";
import { useProjects } from "../hooks/useProjects";
import { useProject } from "../hooks/useProject";
import { PhaseCardsSkeleton } from "../components/skeletons/PhaseCardsSkeleton";

export function Projects() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>("planninganddesign");

  const { data: projects, isLoading: isLoadingProjects, error: projectsError } = useProjects("customer-1");
  const projectId = projects?.[0]?.id;
  const { data: projectDetails, isLoading: isLoadingDetails, error: detailsError } = useProject(projectId);

  const phases = projectDetails?.phases ?? [];
  const isLoading = isLoadingProjects || isLoadingDetails;
  const error = projectsError || detailsError;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <main className="flex-1 overflow-auto">
        <div className="max-w-480 mx-auto">
          <WelcomeBanner />

          <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
            {error && (
              <p className="text-sm text-destructive">
                Failed to load projects.
              </p>
            )}

            {!error && !projectDetails && !isLoading && (
              <p className="text-sm text-muted-foreground">
                No projects found.
              </p>
            )}

            {isLoading ? (
              <PhaseCardsSkeleton />
            ) : (
              projectDetails && (
                <>
                  <PhaseCards
                    phases={phases}
                    selectedPhaseId={selectedPhaseId}
                    onSelectPhase={setSelectedPhaseId}
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <ContactTeam />
                    <ChatSessions />
                  </div>
                  <MeetingSection />
                </>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
