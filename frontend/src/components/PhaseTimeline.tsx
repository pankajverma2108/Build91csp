import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';

interface PhaseTimelineProps {
  filterPhase: string;
}

export function PhaseTimeline({ filterPhase }: PhaseTimelineProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['design']);

  const phases = [
    {
      id: 'onboarding',
      number: 1,
      emoji: '1️⃣',
      title: 'ONBOARDING',
      status: 'completed',
      progress: 100,
      tasks: [
        { name: 'Upload signed agreement', status: 'completed', date: 'Dec 10' },
        { name: 'Confirm your details', status: 'completed', date: 'Dec 12' },
        { name: 'First meeting notes', status: 'completed', date: 'Dec 14' },
        { name: 'Pay commitment fee', status: 'completed', date: 'Dec 15' }
      ],
      duration: '4 days • Completed',
      icon: '✓'
    },
    {
      id: 'design',
      number: 2,
      emoji: '2️⃣',
      title: 'PLANNING - DESIGN',
      status: 'in-progress',
      progress: 65,
      tasks: [
        { name: 'Upload 2D files', status: 'completed', date: 'Dec 12' },
        { name: 'Upload 3D files', status: 'completed', date: 'Dec 14' },
        { name: 'Finalize item list', status: 'in-progress', date: 'Due: Dec 18' },
        { name: 'Confirm budget plan', status: 'in-progress', date: 'Due: Dec 20' },
        { name: 'Confirm colour scheme', status: 'pending', date: 'Due: Dec 22' }
      ],
      duration: '13 of 20 days • In Progress',
      icon: '⏳'
    },
    {
      id: 'travel',
      number: 3,
      emoji: '3️⃣',
      title: 'PLANNING - TRAVEL',
      status: 'locked',
      progress: 0,
      tasks: [],
      duration: 'Locked • Starts after Design phase',
      icon: '🔒'
    },
    {
      id: 'itinerary',
      number: 4,
      emoji: '4️⃣',
      title: 'ITINERARY',
      status: 'locked',
      progress: 0,
      tasks: [],
      duration: 'Locked • Starts after Travel phase',
      icon: '🔒'
    }
  ];

  const togglePhase = (phaseId: string) => {
    if (expandedPhases.includes(phaseId)) {
      setExpandedPhases(expandedPhases.filter(id => id !== phaseId));
    } else {
      setExpandedPhases([...expandedPhases, phaseId]);
    }
  };

  const filteredPhases = filterPhase === 'all' 
    ? phases 
    : phases.filter(p => p.id === filterPhase);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-slate-900 mb-6">Phase Progression Timeline</h2>

      <div className="space-y-6">
        {filteredPhases.map((phase) => {
          const isExpanded = expandedPhases.includes(phase.id);
          const isLocked = phase.status === 'locked';

          return (
            <div key={phase.id} className="space-y-3">
              {/* Phase Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${isLocked ? 'text-gray-500' : 'text-slate-900'}`}>
                    {phase.emoji} {phase.title}
                  </span>
                  <span className="text-xl">{phase.icon}</span>
                  {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                {!isLocked && (
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        <span>Collapse</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Expand details</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      phase.status === 'completed' ? 'bg-emerald-500' :
                      phase.status === 'in-progress' ? 'bg-amber-500' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`${isLocked ? 'text-gray-500' : 'text-gray-600'}`}>
                    {phase.progress}%
                  </span>
                  <span className={`${isLocked ? 'text-gray-500' : 'text-gray-600'}`}>
                    {phase.duration}
                  </span>
                </div>
              </div>

              {/* Tasks Pills */}
              {isExpanded && phase.tasks.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {phase.tasks.map((task, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-lg border ${
                        task.status === 'completed'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : task.status === 'in-progress'
                          ? 'bg-amber-50 border-amber-200 text-amber-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' && '✓'}
                        {task.status === 'in-progress' && '⏳'}
                        {task.status === 'pending' && '❌'}
                        <span className="font-medium">{task.name}</span>
                      </div>
                      <div className="mt-1">{task.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Locked Message */}
              {isLocked && (
                <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-3 rounded-lg">
                  <Lock className="w-4 h-4" />
                  <span>{phase.duration}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
