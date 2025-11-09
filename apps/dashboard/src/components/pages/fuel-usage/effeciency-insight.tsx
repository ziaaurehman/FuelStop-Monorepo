"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@repo/components";
import { Info } from "lucide-react";

interface InsightItemProps {
  title: string;
  description?: string;
}

function InsightItem({ title, description }: InsightItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
      {/* <div className="rounded-full border-2 border-foreground p-1 mt-0.5"> */}
      <Info className="h-5 w-5" />
      {/* </div> */}
      <div className="flex-1 space-y-2">
        <p className="text-sm leading-relaxed">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <Button variant="link" size="sm" className="h-auto p-0 text-primary">
          View Details
        </Button>
      </div>
    </div>
  );
}

export function EfficiencyInsights() {
  const insights = [
    {
      title: "Vehicle #102: 11% higher than fleet average",
    },
    {
      title: "Predictive refueling reduced 22 labor hours this week.",
    },
    {
      title:
        "Your retail division achieved 17% lower emissions vs. Q1 baseline.",
    },
  ];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Efficiency & Emission Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {insights.map((insight, index) => (
          <InsightItem key={index} {...insight} />
        ))}
      </CardContent>
    </Card>
  );
}
