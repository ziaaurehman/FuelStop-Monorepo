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
import type { FuelConsumptionData } from "@/services/mock/fuel-usage.service";

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
  data: FuelConsumptionData[];
}

export function FuelConsumptionChart({
  data,
}: FuelConsumptionChartProps) {

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Fuel Consumptions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart
            data={data}
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
