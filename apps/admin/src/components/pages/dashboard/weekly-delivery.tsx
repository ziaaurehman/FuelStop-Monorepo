"use client";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components";
import { Calendar } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Monday", gallons: 2500 },
  { day: "Tuesday", gallons: 2800 },
  { day: "Wednesday", gallons: 2200 },
  { day: "Thursday", gallons: 3000 },
  { day: "Friday", gallons: 2700 },
  { day: "Saturday", gallons: 2900 },
  { day: "Sunday", gallons: 2600 },
];

export function WeeklyDeliveryTrends() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weekly Delivery Trends</CardTitle>
          <Badge variant="outline" className="gap-2">
            <Calendar className="h-3 w-3" />
            Feb 04 - Feb 11, 2024
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGallons" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}K`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-md">
                        <div className="font-semibold">
                          {payload[0].payload.day}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payload[0].value?.toLocaleString()} gal
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="gallons"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorGallons)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
