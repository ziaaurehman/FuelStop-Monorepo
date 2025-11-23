import { Card, CardContent, Skeleton } from "@repo/components";

export function MetricsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 grid-cols-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

