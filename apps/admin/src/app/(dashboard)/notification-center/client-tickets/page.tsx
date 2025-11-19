"use client";

import { NotificationList } from "@/components";
import { dummyNotifications } from "@/data";
import { Button } from "@repo/components";
import { Plus } from "lucide-react";

export default function ClientTicketsPage() {
  const ticketNotifications = dummyNotifications.filter(
    (n) => n.type === "ticket"
  );

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 py-3 md:px-6 shrink-0">
        <h2 className="font-semibold">Client Tickets</h2>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <NotificationList notifications={ticketNotifications} />
      </div>
    </div>
  );
}
