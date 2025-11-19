"use client";

import { dummyNotifications } from "@/data";
import { AlertItem } from "@/components";
import { InboxIcon } from "lucide-react";

export default function AlertsPage() {
  const alertNotifications = dummyNotifications.filter(
    (n) => n.type === "alert"
  );

  if (alertNotifications.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <InboxIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">No alerts</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You&apos;re all caught up! Check back later for new alerts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      {alertNotifications.map((notification) => (
        <AlertItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
