import React from 'react';
import { Project } from '../types';
import { getStageConfig } from '../config/stages';
import { MapPin, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const stageConfig = getStageConfig(project.currentStageCode);
  const StageIcon = stageConfig.icon;

  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    completed: 'bg-blue-100 text-blue-700 border-blue-300',
    'on-hold': 'bg-orange-100 text-orange-700 border-orange-300',
    cancelled: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">
            {project.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>
        <div
          className={`px-2.5 py-1 text-xs font-medium rounded-md border ${statusColors[project.status]} flex-shrink-0 ml-2`}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Progress</span>
          </div>
          <span className="text-sm font-semibold text-blue-600">
            {project.overallProgress}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${project.overallProgress}%` }}
          />
        </div>
      </div>

      {/* Current Stage */}
      <div className={`flex items-center gap-2 p-3 rounded-lg ${stageConfig.bgColor} border ${stageConfig.borderColor}`}>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-white`}>
          <StageIcon className={`w-4 h-4 ${stageConfig.textColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-600 mb-0.5">Current Stage</p>
          <p className={`text-sm font-semibold ${stageConfig.textColor} truncate`}>
            {stageConfig.label}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>Started {format(new Date(project.startDate), 'MMM d, yyyy')}</span>
        </div>
        {project.budget && (
          <span className="font-medium">
            {project.currency} {project.budget.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
