'use client'
import React from "react";
import {
  ClockArrowDown,
  CalendarX2,
  CircleCheckBig,
  CircleDollarSign,
} from "lucide-react";
import { StatItem, StatsCard } from "@/components/misc";

const stats: StatItem[] = [
  {
    icon: CircleDollarSign,
    label: "Total Revenue",
    value: "3,484",
    badge: { text: "2.2%", variant: "success" },
  },
  {
    icon: ClockArrowDown,
    label: "Pending Invoices",
    value: "12",
    badge: { text: "$ 23,998 Total" },
  },
  {
    icon: CalendarX2,
    label: "Overdue",
    value: "230",
    badge: { text: "$ 23,998 Total" },
  },
  {
    icon: CircleCheckBig,
    label: "Paid this Month",
    value: "$14,532",
    badge: { text: "1.22%", variant: "success" },
  },
];

export function BillingStatsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1">
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </div>
  );
}
