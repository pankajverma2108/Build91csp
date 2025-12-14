import React from 'react';
import { TrendingUp } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <div className="border-b border-slate-300 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-foreground mb-1">Welcome, Upmanyu! 👋</h2>
            <p className="text-muted-foreground text-sm">
              Here's your project overview. You're making great progress!
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-emerald-100 border-2 border-slate-300 rounded-xl flex-shrink-0">
            <TrendingUp className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}