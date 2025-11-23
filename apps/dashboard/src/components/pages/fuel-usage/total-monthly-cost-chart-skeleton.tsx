import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function TotalMonthlyCostChartSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-8 w-32 mt-2" />
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>
  );
}

