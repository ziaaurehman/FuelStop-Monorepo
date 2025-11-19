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

const chartConfig = {
  value: {
    label: "Percentage",
  },
} satisfies ChartConfig;

const chartData = [
  { name: "Diesel", value: 35, fill: colors.primary },
  { name: "Petrol", value: 25, fill: colors.primaryLight },
  { name: "Bio-fuel", value: 10, fill: colors.secondary },
  { name: "Premium", value: 15, fill: colors.secondaryLight },
];

export function FuelUsage() {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pb-4">
        <CardHeader>
          <CardTitle>Fuel Usages</CardTitle>
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
            </Pie>
          </PieChart>
        </ChartContainer>

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
