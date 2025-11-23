import { Card, CardContent, CardHeader, Skeleton } from "@repo/components";

export function FuelCalculatorSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 py-4 border-t">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className={index === 5 ? "col-span-2" : ""}>
              <Skeleton className="h-3 w-32 mb-1" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

