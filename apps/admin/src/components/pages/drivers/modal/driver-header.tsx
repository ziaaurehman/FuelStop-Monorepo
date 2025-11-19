"use client";

import { Driver } from "@/data";
import { Badge } from "@repo/components";

interface DriverHeaderProps {
  driver: Driver;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function DriverHeader({
  driver,
}: DriverHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Diver Details</h2>
        <Badge variant="outline" className="text-sm">
          ID #{driver.id}
        </Badge>
      </div>
      {/* <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          disabled={!onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={!onNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
}
