"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

const chartData = [
  { month: "Jan", fuelStopRate: 32000, marketRate: 55000 },
  { month: "Feb", fuelStopRate: 35000, marketRate: 57000 },
  { month: "Mar", fuelStopRate: 38000, marketRate: 59000 },
  { month: "Apr", fuelStopRate: 36000, marketRate: 58000 },
  { month: "May", fuelStopRate: 34000, marketRate: 56000 },
  { month: "Jun", fuelStopRate: 37000, marketRate: 60000 },
  { month: "Jul", fuelStopRate: 70000, marketRate: 95200 },
  { month: "Aug", fuelStopRate: 42000, marketRate: 62000 },
  { month: "Sep", fuelStopRate: 45000, marketRate: 65000 },
  { month: "Oct", fuelStopRate: 43000, marketRate: 63000 },
  { month: "Nov", fuelStopRate: 41000, marketRate: 61000 },
  { month: "Dec", fuelStopRate: 44000, marketRate: 64000 },
];

const chartConfig = {
  fuelStopRate: {
    label: "Fuel Stop Rate",
    color: "hsl(var(--chart-1))",
  },
  marketRate: {
    label: "Market Rate",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SavingsComparisonChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Estimates Savings vs Local Rate</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <defs>
              <linearGradient id="fillFuelStop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-fuelStopRate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-fuelStopRate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMarket" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-marketRate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-marketRate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => {
                    const dataPoint = chartData.find((d) => d.month === value);
                    if (dataPoint) {
                      const savings =
                        dataPoint.marketRate - dataPoint.fuelStopRate;
                      return (
                        <div className="space-y-1">
                          <div className="font-medium">{value}</div>
                          <div className="text-xs text-muted-foreground">
                            Savings: ${savings.toLocaleString()}
                          </div>
                        </div>
                      );
                    }
                    return value;
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="fuelStopRate"
              stroke="var(--color-fuelStopRate)"
              strokeWidth={2}
              fill="url(#fillFuelStop)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="marketRate"
              stroke="var(--color-marketRate)"
              strokeWidth={2}
              fill="url(#fillMarket)"
              fillOpacity={0.4}
            />
            <ChartLegend
              payload={[
                {
                  value: "Fuel Stop Rate",
                  type: "line",
                  color: "var(--color-fuelStopRate)",
                  id: "fuelStopRate",
                },
                {
                  value: "Market Rate",
                  type: "line",
                  color: "var(--color-marketRate)",
                  id: "marketRate",
                },
              ]}
              verticalAlign="top"
              content={<ChartLegendContent />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
