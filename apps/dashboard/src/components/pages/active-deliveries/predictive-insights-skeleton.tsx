import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function PredictiveInsightsSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
          >
            <Skeleton className="h-5 w-5" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

