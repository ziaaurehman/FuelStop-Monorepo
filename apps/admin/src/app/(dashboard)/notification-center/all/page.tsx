"use client";

import { NotificationList } from "@/components";
import { dummyNotifications } from "@/data";
import { useNotificationUrlSync } from "@/hooks/use-notification-url-sync";

export default function AllNotificationsPage() {
  useNotificationUrlSync();
  return <NotificationList notifications={dummyNotifications} />;
}
