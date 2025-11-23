import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function SystemAlertsSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-40 mb-4" />

        {/* Tabs Skeleton */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-9 w-20" />
          ))}
        </div>

        {/* Search Skeleton */}
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-lg">
            {/* Icon Skeleton */}
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />

            {/* Content Skeleton */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
