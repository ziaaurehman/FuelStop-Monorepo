"use client";

import { Card, CardContent } from "@repo/components/ui/card";
import { CheckCircle } from "lucide-react";

interface DeliveryItem {
  id: number;
  date: string;
  type: "Diesel" | "Petrol" | "Gasoline";
  gallons: number;
}

export function DeliveryHistory() {
  const deliveries: DeliveryItem[] = [
    {
      id: 1,
      date: "Oct 12, 2024 10:30 pm",
      type: "Diesel",
      gallons: 500,
    },
    {
      id: 2,
      date: "Oct 12, 2024 10:30 pm",
      type: "Petrol",
      gallons: 500,
    },
    {
      id: 3,
      date: "Oct 12, 2024 10:30 pm",
      type: "Petrol",
      gallons: 500,
    },
    {
      id: 4,
      date: "Oct 12, 2024 10:30 pm",
      type: "Petrol",
      gallons: 500,
    },
  ];

  return (
    <div className="space-y-4">
      {deliveries.map((delivery, index) => (
        <div key={delivery.id} className="flex gap-4">
          {/* Timeline */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            {index < deliveries.length - 1 && (
              <div className="w-0.5 h-full bg-border mt-2" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <p className="text-sm text-muted-foreground mb-2">
              {delivery.date}
            </p>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-1">{delivery.type}</h4>
                <p className="text-2xl font-bold">{delivery.gallons} Gallons</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
