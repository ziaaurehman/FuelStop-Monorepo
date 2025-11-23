import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function WeeklyDeliveryTrendsSkeleton() {
  const barHeights = [65, 75, 55, 85, 70, 80, 68];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-[350px] w-full">
          <div className="h-full w-full flex flex-col justify-end gap-2 px-2">
            <div className="flex items-end gap-2 h-full">
              {barHeights.map((height, index) => (
                <div key={index} className="flex-1 flex flex-col gap-2">
                  <Skeleton
                    className="w-full rounded-t"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                  <Skeleton className="h-4 w-12 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
