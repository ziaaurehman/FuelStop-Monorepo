"use client";

import { Driver } from "@/data/drivers";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  getStatusColor,
} from "@repo/components";
import { Card, CardContent } from "@repo/components/ui/card";
import { Phone, Mail, Truck, MapPin, MessageCircle } from "lucide-react";

interface DriverInfoCardProps {
  driver: Driver;
}

export function DriverInfoCard({ driver }: DriverInfoCardProps) {
  const initials = driver.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card>
      <CardContent className="p-6">
        {/* Driver Profile */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={driver.avatar} alt={driver.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{driver.name}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{driver.number || "+1 567-8901"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{"john@gmail.com"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Deliveries</p>
            <p className="text-3xl font-bold">{"3,484"}</p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Rating</p>
            <p className="text-3xl font-bold">{"4.9"}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>Vehicle</span>
            </div>
            <span className="font-semibold">{driver.vehicle}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
              <span>Status</span>
            </div>
            <Badge
              variant="secondary"
              className={getStatusColor(driver.status)}
            >
              <span className="mr-1 h-2 w-2 rounded-full bg-current" />
              {driver.status === "on break"
                ? "On Break"
                : driver.status.charAt(0).toUpperCase() +
                  driver.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Location</span>
            </div>
            <span className="font-semibold">{driver.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
