import React, { useState } from "react";
import { Lock, CheckCircle, Clock, XCircle, ChevronDown, FileText, Download, Eye } from "lucide-react";

import type { Phase, Task } from "../types/phases";
import { PHASE_CONFIG } from "../config/phases";

interface PhaseCardsProps {
  phases: Phase[];
  selectedPhaseId?: string | null;
  onSelectPhase?: (phaseId: string) => void;
}

export function PhaseCards({
  phases,
  selectedPhaseId,
  onSelectPhase,
}: PhaseCardsProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("planning");
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<string[]>(["t5"]);

  const togglePhase = (phaseId: string, isLocked: boolean) => {
    const newExpanded = expandedPhase === phaseId ? null : phaseId;
    setExpandedPhase(newExpanded);
    if (onSelectPhase && !isLocked) {
      onSelectPhase(phaseId);
    }
  };

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getPhaseColor = (status: string) => {
    if (status === "completed") return "emerald";
    if (status === "in-progress") return "blue";
    if (status === "pending") return "slate";
    return "gray";
  };

  const CircularProgress = ({
    completedTasks,
    totalTasks,
    status,
  }: {
    completedTasks: number;
    totalTasks: number;
    status: string;
  }) => {
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const color = getPhaseColor(status);
    const strokeColor =
      color === "emerald"
        ? "#059669"
        : color === "blue"
        ? "#2563eb"
        : "#64748b";

    return (
      <div className="relative w-11 h-11">
        <svg className="w-11 h-11 transform -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke={strokeColor}
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {status === "completed" ? (
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          ) : status === "locked" ? (
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <span className="text-[10px] font-bold text-foreground leading-none">
              {completedTasks}/{totalTasks}
            </span>
          )}
        </div>
      </div>
    );
  };

  const getTaskCounts = (tasks: Task[]) => {
    let total = 0;
    let completed = 0;

    tasks.forEach((task) => {
      if (task.subtasks && task.subtasks.length > 0) {
        total += task.subtasks.length;
        completed += task.subtasks.filter(
          (st) => st.status === "completed"
        ).length;
      } else {
        total += 1;
        completed += task.status === "completed" ? 1 : 0;
      }
    });

    return { completed, total };
  };

  const getPhaseIcon = (phaseId: string) => {
    const iconClass = "w-5 h-5";
    switch (phaseId) {
      case "onboarding":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case "planning":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
          </svg>
        );
      case "travel":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        );
      case "shopping":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        );
      case "ordering":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        );
      case "production":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m5.2-14.2L14 8m-4 4-3.2 3.2M23 12h-6m-6 0H5m14.2 5.2L16 14m-4-4-3.2-3.2" />
          </svg>
        );
      case "deliver":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        );
      case "installation":
        return (
          <svg
            className={iconClass}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        );
      default:
        return <FileText className={iconClass} />;
    }
  };


    return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-foreground font-semibold">Phase Progression</h2>
        <span className="text-lg">🎯</span>
      </div>
      
      {/* Overall Progress Bar */}
      <div className="bg-card border-2 border-slate-300 rounded-lg p-4">
        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
          Overall Progress
        </h3>
        <div className="grid grid-cols-8 gap-1">
          {phases.map((phase) => {
            const bgColor = 
              phase.status === "completed" ? "bg-emerald-600" :
              phase.status === "in-progress" ? "bg-emerald-300" :
              "bg-slate-300";
            
            return (
              <div key={phase.id} className="flex flex-col gap-1">
                <div className={`h-2 ${bgColor} rounded-full transition-all duration-300`} />
                <p className="text-[10px] text-muted-foreground text-center truncate">
                  {phase.number}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-emerald-600 rounded-full" />
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-emerald-300 rounded-full" />
              <span className="text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-slate-300 rounded-full" />
              <span className="text-muted-foreground">Pending</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {phases.map((phase, index) => {
          const isLocked = phase.status === "locked";
          const isExpanded = expandedPhase === phase.id;
          const isSelected = selectedPhaseId === phase.id;

          return (
            <div key={phase.id} className="relative">
              {/* Connecting Line Between Cards */}
              {index < phases.length - 1 && (
                <div className="absolute left-6.5 top-full w-0.5 h-3 bg-slate-300 z-0" />
              )}
              
              <div
                className={`relative bg-card border-2 rounded-lg overflow-hidden transition-all ${
                  isLocked ? "opacity-60" : ""
                } ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-slate-300"
                }`}
              >
                {/* Vertical List Phase Card */}
                <div
                  className={`flex items-center justify-between p-3 ${
                    isLocked 
                      ? "cursor-not-allowed" 
                      : phase.status === "pending" 
                      ? "" 
                      : "cursor-pointer hover:bg-slate-50"
                  } transition-colors`}
                  onClick={() => phase.status !== "pending" && togglePhase(phase.id, isLocked)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Icon */}
                    <div className={`shrink-0 ${
                      phase.status === "completed" ? "text-slate-900" :
                      phase.status === "in-progress" ? "text-slate-900" :
                      "text-slate-400"
                    }`}>
                      {getPhaseIcon(phase.id)}
                    </div>

                    {/* Phase Name and Meta */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold ${
                        isLocked ? "text-muted-foreground" : 
                        phase.status === "pending" ? "text-slate-400" : 
                        "text-foreground"
                      }`}>
                        {phase.title}
                      </h3>
                    </div>

                    {/* Status and Progress */}
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${
                        phase.status === "completed" ? "text-emerald-700" :
                        phase.status === "in-progress" ? "text-blue-700" :
                        "text-slate-400"
                      }`}>
                        {phase.status === "completed" ? "Completed" :
                         phase.status === "in-progress" ? "In Progress" :
                         "Pending"}
                      </span>
                      
                      {phase.status === "completed" ? (
                        <div className="shrink-0">
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                      ) : phase.status === "in-progress" ? (
                        <CircularProgress 
                          completedTasks={getTaskCounts(phase.tasks).completed} 
                          totalTasks={getTaskCounts(phase.tasks).total} 
                          status={phase.status} 
                        />
                      ) : null}
                      
                      {!isLocked && phase.status !== "pending" && (
                        <ChevronDown
                          className={`w-4 h-4 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && !isLocked && phase.status !== "pending" && (
                  <div className="border-t-2 border-slate-300 bg-slate-50 p-4 space-y-3">
                    {/* Task Progress */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                        Task Progress
                      </h4>
                      
                      {phase.tasks.length > 0 ? (
                        <div className="border-2 border-slate-300 rounded-lg overflow-x-auto bg-white">
                          <table className="w-full min-w-125">
                            <thead className="bg-slate-100 border-b-2 border-slate-300">
                              <tr>
                                <th className="px-3 py-1.5 text-left text-xs font-bold text-slate-900 w-auto">
                                  Task
                                </th>
                                <th className="px-3 py-1.5 text-left text-xs font-bold text-slate-900 whitespace-nowrap w-32">
                                  Status
                                </th>
                                <th className="px-3 py-1.5 text-left text-xs font-bold text-slate-900 whitespace-nowrap w-32">
                                  Date
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-300">
                              {phase.tasks.map((task) => {
                                const hasSubtasks = task.subtasks && task.subtasks.length > 0;
                                const isTaskExpanded = expandedTasks.includes(task.id);
                                
                                return (
                                  <React.Fragment key={task.id}>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                      <td className="px-3 py-2">
                                        <div className="flex items-start gap-2">
                                          <div className="shrink-0 mt-0.5">
                                            {task.status === "completed" && (
                                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                                            )}
                                            {task.status === "in-progress" && (
                                              <Clock className="w-4 h-4 text-slate-600" />
                                            )}
                                            {task.status === "pending" && (
                                              <XCircle className="w-4 h-4 text-muted-foreground" />
                                            )}
                                          </div>
                                          <span className="text-sm text-foreground wrap-break-word">
                                            {task.name}
                                          </span>
                                          {hasSubtasks && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTask(task.id);
                                              }}
                                              className="ml-1 shrink-0"
                                            >
                                              <ChevronDown
                                                className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${
                                                  isTaskExpanded ? "rotate-180" : ""
                                                }`}
                                              />
                                            </button>
                                          )}
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${
                                          task.status === "completed" 
                                            ? "text-emerald-600" 
                                            : task.status === "in-progress"
                                            ? "text-blue-600"
                                            : "text-slate-500"
                                        }`}>
                                          {task.status === "completed" ? "Completed" :
                                           task.status === "in-progress" ? "In Progress" :
                                           "Pending"}
                                        </span>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <span className="text-sm text-slate-600">
                                          {task.completedDate || "—"}
                                        </span>
                                      </td>
                                    </tr>
                                    
                                    {/* Subtasks */}
                                    {hasSubtasks && isTaskExpanded && task.subtasks!.map((subtask) => (
                                      <tr key={subtask.id} className="bg-slate-50 hover:bg-slate-100 transition-colors">
                                        <td className="px-3 py-2 pl-10">
                                          <div className="flex items-start gap-2">
                                            <div className="shrink-0 mt-0.5">
                                              {subtask.status === "completed" && (
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                              )}
                                              {subtask.status === "in-progress" && (
                                                <Clock className="w-3.5 h-3.5 text-slate-600" />
                                              )}
                                              {subtask.status === "pending" && (
                                                <XCircle className="w-3.5 h-3.5 text-muted-foreground" />
                                              )}
                                            </div>
                                            <span className="text-sm text-muted-foreground wrap-break-word">
                                              {subtask.name}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                          <span className={`text-xs font-medium ${
                                            subtask.status === "completed" 
                                              ? "text-emerald-600" 
                                              : subtask.status === "in-progress"
                                              ? "text-blue-600"
                                              : "text-slate-500"
                                          }`}>
                                            {subtask.status === "completed" ? "Completed" :
                                             subtask.status === "in-progress" ? "In Progress" :
                                             "Pending"}
                                          </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                          <span className="text-sm text-slate-600">
                                            {subtask.completedDate || "—"}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </React.Fragment>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No tasks available</p>
                      )}
                    </div>

                    {/* Related Documents */}
                    {phase.documents && phase.documents.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                          Related Documents
                        </h4>
                        <div className="space-y-1.5">
                          {phase.documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border-2 border-slate-300 rounded-lg hover:bg-white transition-colors bg-white"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-300">
                                  <FileText className="w-4 h-4 text-slate-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-foreground">
                                    {doc.name}
                                  </div>
                                  {doc.size && (
                                    <div className="text-xs text-muted-foreground">
                                      {doc.size}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Eye className="w-4 h-4 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors" aria-label="View" role="img" />
                                <Download className="w-4 h-4 text-slate-600 cursor-pointer hover:text-slate-900 transition-colors" aria-label="Download" role="img" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}