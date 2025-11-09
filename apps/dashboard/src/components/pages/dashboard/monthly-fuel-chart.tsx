"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/components/ui/chart";

const chartData = [
  { month: "Jan", gallons: 32000 },
  { month: "Feb", gallons: 58000 },
  { month: "Mar", gallons: 43000 },
  { month: "Apr", gallons: 75000 },
  { month: "May", gallons: 42000 },
  { month: "Jun", gallons: 70000 },
  { month: "Jul", gallons: 88000 },
  { month: "Aug", gallons: 67000 },
  { month: "Sep", gallons: 36000 },
  { month: "Oct", gallons: 45000 },
  { month: "Nov", gallons: 52000 },
  { month: "Dec", gallons: 33000 },
];

const chartConfig = {
  gallons: {
    label: "Gallons",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonthlyFuelChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Monthly Fuel Consumption</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="gallons" fill="#005F71" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
