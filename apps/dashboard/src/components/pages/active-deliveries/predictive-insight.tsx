"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components";
import { Info } from "lucide-react";

const insights = [
  {
    message: "Your construction fleet will require refueling in 2.4 days.",
    action: "Schedule Now",
    actionLink: "#",
  },
  {
    message: "3 trucks exceeded ideal idle thresholds this week.",
    action: "View Details",
    actionLink: "#",
  },
  {
    message: "Reordering now saves ~12 refueling hours this week.",
    action: "Optimize Schedule",
    actionLink: "#",
  },
  {
    message: "Your construction fleet will require refueling in 2.4 days.",
    action: "View Route",
    actionLink: "#",
  },
  {
    message: "Your construction fleet will require refueling in 2.4 days.",
    action: "View Route",
    actionLink: "#",
  },
];

export function PredictiveInsights() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Predictive Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
          >
            <Info className="h-5 w-5" />

            <div className="flex-1 space-y-2">
              <p className="text-sm leading-relaxed">{insight.message}</p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary font-medium"
              >
                {insight.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
