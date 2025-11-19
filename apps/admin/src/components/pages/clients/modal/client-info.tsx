"use client";

import { Client } from "@/data/clients";
import { Avatar, AvatarFallback, AvatarImage, Badge } from "@repo/components";
import { Card, CardContent } from "@repo/components/ui/card";
import { Phone, Mail, Building2, MapPin, CheckCircle } from "lucide-react";

interface ClientInfoCardProps {
  client: Client;
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card>
      <CardContent className="p-6">
        {/* Client Profile */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{client.name}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{client.phone || "+1 567-8901"}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{client.email || "leul@fuelstop.com"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Receivables</p>
            <p className="text-3xl font-bold">
              {client.receivables || "3,484"}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Unused Credits</p>
            <p className="text-3xl font-bold">
              {client.unusedCredits || "4.9"}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Building2 className="h-5 w-5" />
              <span>Company</span>
            </div>
            <span className="font-semibold">{client.company}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Location</span>
            </div>
            <span className="font-semibold">123 Main St, Downtown</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <CheckCircle className="h-5 w-5" />
              <span>Status</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <span className="mr-1 h-2 w-2 rounded-full bg-current" />
              {client.status === "on break"
                ? "On Break"
                : client.status.charAt(0).toUpperCase() +
                  client.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
