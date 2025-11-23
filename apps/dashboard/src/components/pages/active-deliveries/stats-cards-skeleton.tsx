import { Card, CardContent, Skeleton } from "@repo/components";

export function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
      {[1, 2, 3].map((index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <div className="flex items-baseline gap-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-3 w-48" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

