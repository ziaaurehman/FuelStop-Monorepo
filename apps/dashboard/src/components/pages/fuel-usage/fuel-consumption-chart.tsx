"use client";

import {
  Card,
  CardContent,
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
  { month: "Jan", predicted: 30000, actual: 32000 },
  { month: "Feb", predicted: 35000, actual: 33000 },
  { month: "Mar", predicted: 40000, actual: 38000 },
  { month: "Apr", predicted: 45000, actual: 42000 },
  { month: "May", predicted: 50000, actual: 35000 },
  { month: "Jun", predicted: 60000, actual: 35000 },
  { month: "Jul", predicted: 55000, actual: 30000 },
  { month: "Aug", predicted: 58000, actual: 34000 },
  { month: "Sep", predicted: 62000, actual: 38000 },
  { month: "Oct", predicted: 65000, actual: 42000 },
  { month: "Nov", predicted: 63000, actual: 45000 },
  { month: "Dec", predicted: 60000, actual: 43000 },
];

const chartConfig = {
  predicted: {
    label: "Predicted Forecast",
    color: "hsl(var(--chart-2))",
  },
  actual: {
    label: "Actual consumptions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface FuelConsumptionChartProps {
  timeRange: "3" | "6" | "12";
}

export function FuelConsumptionChart({ timeRange }: FuelConsumptionChartProps) {
  // Filter data based on timeRange
  const filteredData = chartData.slice(-parseInt(timeRange));

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Fuel Consumptions</CardTitle>
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
              tickFormatter={(value) => `${value / 1000}gal`}
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
              dataKey="predicted"
              stroke="#fa7319"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#005F71"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
