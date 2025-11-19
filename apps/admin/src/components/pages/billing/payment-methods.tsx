"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  colors,
} from "@repo/components";
import { Cell, Pie, PieChart } from "recharts";

const chartData = [
  { name: "Bank Transfer", value: 15, fill: colors.primary },
  { name: "Cash", value: 25, fill: colors.primaryLight },
  { name: "Credit Card", value: 60, fill: colors.secondary },
];

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

export function PaymentMethods() {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pb-4">
        <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              {/* <Label
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
                          {chartData.reduce((a, b) => a + b.value, 0)}%
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
              /> */}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {chartData.map((item, index) => (
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
