import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function FuelConsumptionChartSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <Skeleton className="h-[400px] w-full" />
      </CardContent>
    </Card>
  );
}

