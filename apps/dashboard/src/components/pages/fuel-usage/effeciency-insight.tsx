"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@repo/components";
import { Info } from "lucide-react";
import type { EfficiencyInsight } from "@/services/mock/fuel-usage.service";

interface InsightItemProps {
  title: string;
  description?: string;
}

function InsightItem({ title, description }: InsightItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
      <Info className="h-5 w-5" />
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

interface EfficiencyInsightsProps {
  insights: EfficiencyInsight[];
}

export function EfficiencyInsights({ insights }: EfficiencyInsightsProps) {
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
