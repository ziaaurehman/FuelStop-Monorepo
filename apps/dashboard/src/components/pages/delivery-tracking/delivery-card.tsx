"use client";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage, Badge } from "@repo/components";
import {
  User,
  MapPin,
  Package,
  Droplet,
  Clock,
  Navigation,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib";

interface DeliveryCardProps {
  delivery: {
    id: string;
    driver: {
      name: string;
      avatar?: string;
    };
    destination: string;
    quantity: string;
    fuelType: string;
    eta: string;
    distance: string;
    status: "completed" | "in-transit" | "pending";
  };
}

const statusConfig = {
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  "in-transit": {
    label: "In Transit",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  },
};

export const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[delivery.status];

  return (
    <div className="border rounded-lg bg-card hover:shadow-md transition-shadow">
      {/* Desktop View - Full Card */}
      <div className="hidden md:block">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">#{delivery.id}</h3>
          <Badge className={cn("text-xs", status.className)}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
            {status.label}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1: Driver & Quantity */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    Driver
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={delivery.driver.avatar} />
                      <AvatarFallback className="text-xs">
                        {delivery.driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium truncate">
                      {delivery.driver.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    Quantity
                  </div>
                  <div className="font-medium">{delivery.quantity}</div>
                </div>
              </div>
            </div>

            {/* Column 2: Destination & Fuel Type */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    Destination
                  </div>
                  <div className="font-medium">{delivery.destination}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Droplet className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    Fuel Type
                  </div>
                  <div className="font-medium">{delivery.fuelType}</div>
                </div>
              </div>
            </div>

            {/* Column 3: ETA & Distance */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground mb-1">ETA</div>
                  <div className="font-medium">{delivery.eta}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    Distance
                  </div>
                  <div className="font-medium">{delivery.distance}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Accordion */}
      <div className="md:hidden">
        {/* Accordion Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            )}
            <h3 className="text-base font-semibold">#{delivery.id}</h3>
          </div>
          <Badge className={cn("text-xs", status.className)}>
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
            {status.label}
          </Badge>
        </button>

        {/* Accordion Content - Expandable */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t space-y-4">
            {/* Driver */}
            <div className="flex items-start gap-3 pt-4">
              <User className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground mb-1">Driver</div>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={delivery.driver.avatar} />
                    <AvatarFallback className="text-xs">
                      {delivery.driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate">
                    {delivery.driver.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Destination
                </div>
                <div className="font-medium">{delivery.destination}</div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Quantity
                </div>
                <div className="font-medium">{delivery.quantity}</div>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Fuel Type
                </div>
                <div className="font-medium">{delivery.fuelType}</div>
              </div>
            </div>

            {/* ETA */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground mb-1">ETA</div>
                <div className="font-medium">{delivery.eta}</div>
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Distance
                </div>
                <div className="font-medium">{delivery.distance}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
