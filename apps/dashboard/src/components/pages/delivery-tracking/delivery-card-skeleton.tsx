import { Skeleton } from "@repo/components";

export function DeliveryCardSkeleton() {
  return (
    <div className="border rounded-lg bg-card">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between p-6 border-b">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((col) => (
              <div key={col} className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Skeleton className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}

