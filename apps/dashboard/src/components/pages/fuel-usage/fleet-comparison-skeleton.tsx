import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function FleetComparisonSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <Skeleton className="h-[300px] w-full rounded-full aspect-square mx-auto" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-sm" />
              <div className="flex-1">
                <Skeleton className="h-3 w-20 mb-1" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

