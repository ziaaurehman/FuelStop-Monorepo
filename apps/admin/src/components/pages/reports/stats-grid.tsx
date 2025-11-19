"use client";

import React from "react";
import { CircleDollarSign, Fuel, ShoppingCart, UsersRound } from "lucide-react";
import { StatItem, StatsCard } from "@/components/misc";

const stats: StatItem[] = [
  {
    icon: CircleDollarSign,
    label: "Total Revenue",
    value: "3,484",
    badge: { text: "2.2%", variant: "success" },
  },
  {
    icon: ShoppingCart,
    label: "Total Deliveries",
    value: "3,484",
    badge: { text: "8.2%", variant: "success" },
  },
  {
    icon: UsersRound,
    label: "Active Clients",
    value: "486 gal",
    badge: { text: "3.22%", variant: "success" },
  },
  {
    icon: Fuel,
    label: "Fuel Delivers",
    value: "230 gal",
    badge: { text: "2.1%", variant: "destructive" },
  },
];

export function ReportsStatsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1">
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </div>
  );
}
