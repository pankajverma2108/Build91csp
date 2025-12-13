import React from 'react';
import { TrendingUp, MapPin, CheckCircle, Target } from 'lucide-react';

export function KPICards() {
  const kpis = [
    {
      id: 'progress',
      title: 'Overall Progress',
      icon: TrendingUp,
      value: '40%',
      progress: 40,
      subtitle: 'Project tracking well',
      detail: 'On track',
      accentColor: 'blue'
    },
    {
      id: 'phase',
      title: 'Current Phase',
      icon: MapPin,
      value: 'Onboarding',
      subtitle: '100% Complete',
      detail: '4 of 4 tasks completed',
      footer: 'Duration: 4 days',
      accentColor: 'emerald'
    },
    {
      id: 'tasks',
      title: 'Tasks Completed',
      icon: CheckCircle,
      value: '6 / 18',
      progress: 33,
      subtitle: '33% done',
      detail: '+2 this week',
      accentColor: 'slate'
    },
    {
      id: 'milestone',
      title: 'Next Milestone',
      icon: Target,
      value: 'Budget Plan',
      subtitle: 'Awaiting confirmation',
      detail: 'In Progress',
      footer: 'Status: Active',
      accentColor: 'blue'
    }
  ];

  const getAccentClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-600',
        progress: 'bg-blue-600'
      },
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-600',
        progress: 'bg-emerald-600'
      },
      slate: {
        bg: 'bg-slate-50',
        text: 'text-slate-900',
        border: 'border-slate-300',
        progress: 'bg-slate-900'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const accent = getAccentClasses(kpi.accentColor);
        return (
          <div
            key={kpi.id}
            className={`bg-card border-2 ${accent.border} rounded-lg p-4 hover:shadow-lg transition-all hover:-translate-y-0.5`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-muted-foreground text-sm font-medium">{kpi.title}</span>
              <div className={`h-10 w-10 rounded-lg ${accent.bg} flex items-center justify-center border-2 ${accent.border}`}>
                <Icon className={`w-5 h-5 ${accent.text}`} />
              </div>
            </div>

            {/* Value */}
            <div className={`text-2xl md:text-3xl font-bold ${accent.text} mb-2`}>
              {kpi.value}
            </div>

            {/* Progress Bar */}
            {kpi.progress !== undefined && (
              <div className="mb-3">
                <div className={`w-full h-2.5 ${accent.bg} rounded-full overflow-hidden border-2 ${accent.border}`}>
                  <div
                    className={`h-full ${accent.progress} transition-all duration-500`}
                    style={{ width: `${kpi.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Subtitle */}
            <div className="text-muted-foreground mb-1 text-sm font-medium">
              {kpi.subtitle}
            </div>

            {/* Detail */}
            {kpi.detail && (
              <div className="text-sm text-foreground">
                {kpi.detail}
              </div>
            )}

            {/* Footer */}
            {kpi.footer && (
              <div className="text-muted-foreground mt-3 pt-3 border-t-2 border-slate-300 text-xs">
                {kpi.footer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}