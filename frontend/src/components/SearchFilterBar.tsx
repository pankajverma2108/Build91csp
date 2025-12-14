import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, Grid3x3, List, RefreshCw } from 'lucide-react';

interface SearchFilterBarProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  filterPhase: string;
  setFilterPhase: (phase: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchFilterBar({
  viewMode,
  setViewMode,
  filterPhase,
  setFilterPhase,
  dateRange,
  setDateRange,
  searchQuery,
  setSearchQuery
}: SearchFilterBarProps) {
  const [showPhaseFilter, setShowPhaseFilter] = useState(false);

  const phases = [
    { id: 'all', label: 'All Phases' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'design', label: 'Planning - Design' },
    { id: 'travel', label: 'Planning - Travel' },
    { id: 'itinerary', label: 'Itinerary' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-[1920px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, files, tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPhaseFilter(!showPhaseFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <span className="text-slate-900">
              {phases.find(p => p.id === filterPhase)?.label || 'All Phases'}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {showPhaseFilter && (
            <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 left-0">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => {
                    setFilterPhase(phase.id);
                    setShowPhaseFilter(false);
                  }}
                  className={`w-full px-4 py-2 text-left transition-colors ${
                    filterPhase === phase.id
                      ? 'bg-blue-50 text-blue-500'
                      : 'text-slate-900 hover:bg-gray-50'
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Range Picker */}
        <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-slate-900">{dateRange}</span>
        </button>

        {/* View Toggle */}
        <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-md p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Refresh Button */}
        <button className="p-2 hover:bg-gray-50 rounded-md transition-colors">
          <RefreshCw className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
