"use client";

import { ScheduleDelivery } from "@/data";
import { Card, CardContent } from "@repo/components/ui/card";
import { Badge } from "@repo/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/components/ui/avatar";
import { Droplet, Clock, MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib";

interface DeliveryCardProps {
  delivery: ScheduleDelivery;
}

export function DeliveryCard({ delivery }: DeliveryCardProps) {
  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            {delivery.orderId}
          </span>
          <Badge
            variant="outline"
            className={cn(priorityColors[delivery.priority])}
          >
            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
            {delivery.priority.charAt(0).toUpperCase() +
              delivery.priority.slice(1)}
          </Badge>
        </div>

        {/* Company Name */}
        <h4 className="font-semibold mb-3">{delivery.companyName}</h4>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Droplet className="h-4 w-4" />
            <span>{delivery.gallons} gal</span>
            <span>•</span>
            <span>{delivery.fuelType}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            {delivery.completedAt ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Completed at {delivery.completedAt}</span>
                <span className="ml-auto text-green-600">✓</span>
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" />
                <span>{delivery.time}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{delivery.location}</span>
          </div>
        </div>

        {/* Driver */}
        {delivery.driver && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
            <Avatar className="h-6 w-6">
              <AvatarImage src={delivery.driver.avatar} />
              <AvatarFallback className="text-xs">
                {delivery.driver.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {delivery.driver.name}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
