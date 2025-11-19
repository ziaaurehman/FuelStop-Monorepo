"use client";

import { Card, CardContent } from "@repo/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

export function LiveMap() {
  // Mock delivery data
  const deliveries = [
    {
      id: 1,
      type: "departure",
      time: "Oct 12, 2024 10:30 pm",
      label: "Departure",
      address: "45 E 9th Street, Ashford, MS 291 UK",
    },
    {
      id: 2,
      type: "arrival",
      time: "Oct 12, 2024 10:30 pm",
      label: "Arrival",
      address: "45 E 9th Street, Ashford, MS 291 UK",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
            {/* Map placeholder with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Live Map Integration
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Google Maps / Mapbox will be integrated here
                  </p>
                </div>
              </div>
              {/* Mock route line */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.3 }}
              >
                <path
                  d="M 100 350 Q 200 200 400 250 T 700 200"
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                />
              </svg>
              {/* Mock markers */}
              <div className="absolute top-[70%] left-[15%] w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Navigation className="h-4 w-4 text-white" />
              </div>
              <div className="absolute top-[40%] right-[20%] w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Timeline */}
      <div className="space-y-4">
        {deliveries.map((delivery, index) => (
          <Card key={delivery.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      delivery.type === "departure"
                        ? "bg-slate-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {delivery.type === "departure" ? (
                      <Navigation
                        className={`h-5 w-5 ${
                          delivery.type === "departure"
                            ? "text-slate-600"
                            : "text-blue-600"
                        }`}
                      />
                    ) : (
                      <MapPin
                        className={`h-5 w-5 ${
                          delivery.type === "arrival"
                            ? "text-blue-600"
                            : "text-slate-600"
                        }`}
                      />
                    )}
                  </div>
                  {index < deliveries.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    {delivery.type === "departure" ? (
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {delivery.time}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{delivery.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {delivery.address}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
