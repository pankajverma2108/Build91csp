import React from 'react';
import { Stage } from '../types';
import { StageCode, getStageConfig, STAGE_ORDER } from '../config/stages';
import { Check } from 'lucide-react';

interface StageTimelineProps {
  stages: Stage[];
  selectedStageCode: StageCode | null;
  onStageSelect: (stageCode: StageCode) => void;
}

export function StageTimeline({ stages, selectedStageCode, onStageSelect }: StageTimelineProps) {
  // Create a map for quick stage lookup
  const stageMap = new Map(stages.map(stage => [stage.stageCode, stage]));

  const statusColors = {
    completed: 'bg-emerald-600 border-emerald-600',
    'in-progress': 'bg-blue-600 border-blue-600',
    'not-started': 'bg-slate-300 border-slate-300',
    'on-hold': 'bg-orange-600 border-orange-600',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Timeline</h2>
      
      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200" style={{ zIndex: 0 }} />
          
          {STAGE_ORDER.map((stageCode, index) => {
            const stage = stageMap.get(stageCode);
            const config = getStageConfig(stageCode);
            const StageIcon = config.icon;
            const isSelected = selectedStageCode === stageCode;
            const statusColor = stage ? statusColors[stage.status] : statusColors['not-started'];

            return (
              <div key={stageCode} className="flex flex-col items-center" style={{ zIndex: 1 }}>
                <button
                  onClick={() => onStageSelect(stageCode)}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${statusColor} ${
                    isSelected ? 'ring-4 ring-blue-200 scale-110' : 'hover:scale-105'
                  }`}
                  title={config.label}
                >
                  {stage?.status === 'completed' ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <StageIcon className="w-5 h-5 text-white" />
                  )}
                </button>
                <p className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                  isSelected ? 'text-blue-600' : 'text-slate-600'
                }`}>
                  {config.label}
                </p>
                {stage && (
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {stage.progress}%
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-2">
        {STAGE_ORDER.map((stageCode) => {
          const stage = stageMap.get(stageCode);
          const config = getStageConfig(stageCode);
          const StageIcon = config.icon;
          const isSelected = selectedStageCode === stageCode;
          const statusColor = stage ? statusColors[stage.status] : statusColors['not-started'];

          return (
            <button
              key={stageCode}
              onClick={() => onStageSelect(stageCode)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                isSelected 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColor}`}>
                {stage?.status === 'completed' ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <StageIcon className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 text-left">
                <p className={`font-medium ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                  {config.label}
                </p>
                {stage && (
                  <p className="text-xs text-slate-500">
                    {stage.progress}% complete
                  </p>
                )}
              </div>
              {stage && (
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
