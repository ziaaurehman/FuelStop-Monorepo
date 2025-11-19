import React from "react";
import { DollarSign, Leaf, ShoppingCart } from "lucide-react";
import { StatItem, StatsCard } from "@/components/misc";

const stats: StatItem[] = [
  {
    icon: ShoppingCart,
    label: "Active Orders",
    value: "3,484",
    badge: { text: "2.2%", variant: "success" },
  },
  {
    icon: DollarSign,
    label: "Total Gallons Delivered",
    value: "486 gal",
    badge: { text: "3.22%", variant: "success" },
  },
  {
    icon: Leaf,
    label: "Live Drivers",
    value: "230",
    badge: { text: "2.1%", variant: "destructive" },
  },
  {
    icon: Leaf,
    label: "Revenue",
    value: "$4,532",
    badge: { text: "1.22%", variant: "success" },
  },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1">
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </div>
  );
}
