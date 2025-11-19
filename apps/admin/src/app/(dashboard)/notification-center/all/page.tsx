"use client";

import { NotificationList } from "@/components";
import { dummyNotifications } from "@/data";

export default function AllNotificationsPage() {
  return <NotificationList notifications={dummyNotifications} />;
}