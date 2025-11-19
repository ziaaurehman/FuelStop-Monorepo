"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/components";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", actual: 32000 },
  { month: "Feb", actual: 33000 },
  { month: "Mar", actual: 38000 },
  { month: "Apr", actual: 42000 },
  { month: "May", actual: 35000 },
  { month: "Jun", actual: 35000 },
  { month: "Jul", actual: 30000 },
  { month: "Aug", actual: 34000 },
  { month: "Sep", actual: 38000 },
  { month: "Oct", actual: 42000 },
  { month: "Nov", actual: 45000 },
  { month: "Dec", actual: 43000 },
];

const chartConfig = {
  actual: {
    label: "Profit",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface FuelConsumptionChartProps {
  timeRange: "3" | "6" | "12";
}

export function TotalProfit({ timeRange }: FuelConsumptionChartProps) {
  // Filter data based on timeRange
  const filteredData = chartData.slice(-parseInt(timeRange));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>Total Profit</CardDescription>
        <CardTitle className="text-lg">$ 422,983</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart
            data={filteredData}
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
              tickFormatter={(value) => `$ ${value}`}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => value}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#005F71"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
