import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function EfficiencyInsightsSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-6 w-56" />
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

