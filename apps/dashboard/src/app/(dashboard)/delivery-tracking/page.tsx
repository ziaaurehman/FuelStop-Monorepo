"use client";
import {
  AppHeader,
  DeliveryCard,
  DeliveryStats,
  HeaderActions,
} from "@/components";
import React from "react";

// Mock data - replace with actual data fetching
const deliveries = [
  {
    id: "ORD-98745",
    driver: {
      name: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
    },
    destination: "34355 Industrial Avenue",
    quantity: "1200 Gallons",
    fuelType: "Petrol",
    eta: "2:30pm",
    distance: "1.1 Kilometer",
    status: "completed" as const,
  },
  {
    id: "ORD-98745",
    driver: {
      name: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
    },
    destination: "34355 Industrial Avenue",
    quantity: "1200 Gallons",
    fuelType: "Petrol",
    eta: "2:30pm",
    distance: "1.1 Kilometer",
    status: "completed" as const,
  },
  {
    id: "ORD-98745",
    driver: {
      name: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
    },
    destination: "34355 Industrial Avenue",
    quantity: "1200 Gallons",
    fuelType: "Petrol",
    eta: "2:30pm",
    distance: "1.1 Kilometer",
    status: "completed" as const,
  },
];

const stats = [
  {
    label: "In Transit",
    value: "3,484",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
  },
  {
    label: "Nearby",
    value: "486 gal",
    bgColor: "bg-yellow-100",
    textColor: "text-amber-900",
  },
  {
    label: "Delivered",
    value: "$4,484",
    bgColor: "bg-green-100",
    textColor: "text-green-900",
  },
];

const Page = () => {
  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="space-y-6 md:p-8 p-4">
        {/* Stats Cards */}
        <DeliveryStats stats={stats} />

        {/* Current Deliveries Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Deliveries</h2>
          <div className="space-y-4">
            {deliveries.map((delivery, index) => (
              <DeliveryCard
                key={`${delivery.id}-${index}`}
                delivery={delivery}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
