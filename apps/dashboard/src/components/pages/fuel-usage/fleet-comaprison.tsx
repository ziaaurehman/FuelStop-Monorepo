"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  Button,
  colors,
} from "@repo/components";
import { Cell, Label, Pie, PieChart } from "recharts";
import { useState } from "react";
import type { FleetComparisonData } from "@/services/mock/fuel-usage.service";

const chartConfig = {
  value: {
    label: "Percentage",
  },
  petroleum: {
    label: "Petroleum Haulers",
    color: "hsl(var(--chart-1))",
  },
  retail: {
    label: "Retail Fleets",
    color: "hsl(var(--chart-2))",
  },
  municipal: {
    label: "Municipal",
    color: "hsl(var(--chart-3))",
  },
  construction: {
    label: "Construction",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface FleetComparisonChartProps {
  data: FleetComparisonData[];
}

export function FleetComparisonChart({
  data,
}: FleetComparisonChartProps) {
  const [activeTab, setActiveTab] = useState<"fleet" | "operation">("fleet");

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Fleet Comparison</CardTitle>
        <div className="flex gap-2 mt-4">
          <Button
            variant={activeTab === "fleet" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("fleet")}
            className="flex-1"
          >
            Fleet Type
          </Button>
          <Button
            variant={activeTab === "operation" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("operation")}
            className="flex-1"
          >
            Operation Types
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.reduce((a, b) => a + b.value, 0)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Total Fleet
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground leading-tight">
                  {item.name}
                </p>
                <p className="text-sm font-semibold">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
