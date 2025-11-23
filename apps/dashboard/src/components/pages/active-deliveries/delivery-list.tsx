"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/components";
import { Droplet, Clock, Fuel } from "lucide-react";
import { useActiveDeliveriesStore } from "@/stores/active-deliveries-store";
import type { Delivery } from "@/services/mock/active-deliveries.service";
import { useMemo } from "react";

interface DeliveryListProps {
  deliveries: Delivery[];
  availableDrivers: string[];
}

export function DeliveryList({
  deliveries,
  availableDrivers,
}: DeliveryListProps) {
  const {
    regionFilter,
    driverFilter,
    fuelTypeFilter,
    dateFilter,
    setRegionFilter,
    setDriverFilter,
    setFuelTypeFilter,
    setDateFilter,
  } = useActiveDeliveriesStore();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Active Deliveries
            <Badge variant="secondary">{deliveries.length}</Badge>
          </CardTitle>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="uptown">Uptown</SelectItem>
            </SelectContent>
          </Select>

          <Select value={driverFilter} onValueChange={setDriverFilter}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Driver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drivers</SelectItem>
              {availableDrivers.map((driver) => (
                <SelectItem key={driver} value={driver}>
                  {driver}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={fuelTypeFilter} onValueChange={setFuelTypeFilter}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Gasoline">Gasoline</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto max-h-[1000px] space-y-4 pr-2">
        {deliveries.map((delivery) => (
          <Card key={delivery.id} className="overflow-hidden">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{delivery.companyName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {delivery.location}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-slate-100 text-slate-700"
                >
                  <span className="mr-1 h-2 w-2 rounded-full bg-slate-700" />
                  {delivery.status}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Gallons</p>
                    <p className="text-sm font-medium">
                      {delivery.gallons} gal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium">{delivery.fuelType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">{delivery.time}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    Progress
                  </span>
                  <span className="text-xs font-medium">
                    {delivery.progress}% Complete
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all"
                    style={{ width: `${delivery.progress}%` }}
                  />
                </div>
              </div>

              {/* Driver and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={delivery.driver.avatar} />
                    <AvatarFallback>
                      {delivery.driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {delivery.driver.name}
                  </span>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary p-0 h-auto"
                >
                  View Route
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
