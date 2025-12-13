import React, { useState } from 'react';
import { ChevronDown, Grid3x3, List, RefreshCw } from 'lucide-react';

interface FilterBarProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filterPhase: string;
  setFilterPhase: (phase: string) => void;
}

export function FilterBar({
  viewMode,
  setViewMode,
  filterPhase,
  setFilterPhase
}: FilterBarProps) {
  const [showPhaseFilter, setShowPhaseFilter] = useState(false);

  const phases = [
    { id: 'all', label: 'All Phases' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'planning', label: 'Planning & Design' },
    { id: 'sourcing', label: 'Sourcing' },
    { id: 'production', label: 'Production' },
    { id: 'quality', label: 'Quality Control' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="bg-background border-b border-border sticky top-14 md:top-16 z-40">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 h-12 md:h-14 flex items-center justify-between gap-4">
        {/* Left Side - Phase Filter */}
        <div className="relative">
          <button
            onClick={() => setShowPhaseFilter(!showPhaseFilter)}
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-border rounded-md hover:bg-muted transition-colors text-sm"
          >
            <span className="text-foreground font-medium">
              {phases.find(p => p.id === filterPhase)?.label || 'All Phases'}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {showPhaseFilter && (
            <div className="absolute top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-md py-1 left-0 max-h-80 overflow-y-auto z-50">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => {
                    setFilterPhase(phase.id);
                    setShowPhaseFilter(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    filterPhase === phase.id
                      ? 'bg-muted text-foreground font-medium'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - View Toggle & Refresh */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-0.5 border border-border rounded-md p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-slate-900 text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              title="Grid View"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-slate-900 text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Refresh Button */}
          <button className="p-1.5 md:p-2 hover:bg-muted rounded-md transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}