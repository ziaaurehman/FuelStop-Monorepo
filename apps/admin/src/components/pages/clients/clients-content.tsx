"use client";

import { Client } from "@/data/clients";
import { ClientHeader, ClientInfoCard, ClientTabs } from "./modal";


interface ClientDetailsContentProps {
  client: Client;
}

export function ClientDetailsContent({ client }: ClientDetailsContentProps) {
  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <ClientHeader />

      {/* Info Card */}
      <ClientInfoCard client={client} />

      {/* Tabs with Content */}
      <ClientTabs />
    </div>
  );
}