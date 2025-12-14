import { Skeleton } from "../ui/skeleton";

export function PhaseCardsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-40" />
      </div>

      {/* Overall Progress Bar Skeleton */}
      <div className="bg-card border-2 border-slate-300 rounded-lg p-4">
        <Skeleton className="h-4 w-32 mb-3" />
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Phase Cards Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card border-2 border-slate-300 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 flex-1" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-11 w-11 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
