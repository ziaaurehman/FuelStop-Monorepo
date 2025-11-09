"use client";

import { Button } from "@repo/components";
import { cn } from "@/lib";

interface TimeRangeSelectorProps {
  value: "3" | "6" | "12";
  onChange: (value: "3" | "6" | "12") => void;
}

export function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  const options = [
    { label: "3 Month", value: "3" as const },
    { label: "6 Month", value: "6" as const },
    { label: "12 Month", value: "12" as const },
  ];

  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {options.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-md px-4",
            value === option.value &&
              "bg-background shadow-sm hover:bg-background"
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
