import { Skeleton } from "../ui/skeleton";

export function DocumentsSkeleton() {
  return (
    <div className="bg-card border-2 border-slate-300 rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-3 border-2 border-slate-300 rounded-lg"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <Skeleton className="h-8 w-8" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>

            <Skeleton className="h-4 w-full mb-2" />

            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
