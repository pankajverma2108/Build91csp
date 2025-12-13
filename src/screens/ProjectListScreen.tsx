import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useProjects } from '../hooks/useQueries';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { EmptyState } from '../components/shared/EmptyState';
import { ProjectCard } from '../components/ProjectCard';
import { EMPTY_STATE_MESSAGES } from '../config/messages';
import { FolderOpen, LogOut } from 'lucide-react';

export function ProjectListScreen() {
  const navigate = useNavigate();
  const { currentCustomer, isAuthenticated, logout } = useStore();
  const { data: projects, isLoading } = useProjects(currentCustomer?.id, isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentCustomer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                Build91 Customer Portal
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Welcome, {currentCustomer.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Your Projects
          </h2>
          <p className="text-slate-600">
            Track and manage your China sourcing projects
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner text="Loading projects..." />
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/projects/${project.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title={EMPTY_STATE_MESSAGES.noProjects.title}
            description={EMPTY_STATE_MESSAGES.noProjects.description}
          />
        )}
      </main>
    </div>
  );
}
