"use client";

import {
  NotificationSection,
} from "@/components";
import { useState } from "react";

const Page = () => {
  const [generalNotifications, setGeneralNotifications] = useState({
    transactionAlerts: true,
    systemAlerts: true,
    exclusiveOffers: true,
  });

  const [notificationMethods, setNotificationMethods] = useState({
    email: true,
    push: true,
    sms: false,
  });

  return (
    <>
      {/* General Notifications Section */}
      <NotificationSection
        title="General Notifications"
        description="Notifications about transactions, balance and exclusive offers."
        items={[
          {
            id: "transactionAlerts",
            label: "Transaction Alerts",
            description: "Receive notifications for every transaction.",
            checked: generalNotifications.transactionAlerts,
            onCheckedChange: (checked) =>
              setGeneralNotifications((prev) => ({
                ...prev,
                transactionAlerts: checked,
              })),
          },
          {
            id: "systemAlerts",
            label: "System Alerts",
            description: "Receive a warning if your system have a problem",
            checked: generalNotifications.systemAlerts,
            onCheckedChange: (checked) =>
              setGeneralNotifications((prev) => ({
                ...prev,
                systemAlerts: checked,
              })),
          },
          {
            id: "exclusiveOffers",
            label: "Exclusive Offers",
            description:
              "Get exclusive access to promotions, discounts, and more.",
            checked: generalNotifications.exclusiveOffers,
            onCheckedChange: (checked) =>
              setGeneralNotifications((prev) => ({
                ...prev,
                exclusiveOffers: checked,
              })),
          },
        ]}
      />

      {/* Notification Method Section */}
      <NotificationSection
        title="Notification Method"
        description="Choose how you prefer to receive notifications."
        items={[
          {
            id: "email",
            label: "Email Notifications",
            description: "Receive notifications via email",
            checked: notificationMethods.email,
            onCheckedChange: (checked) =>
              setNotificationMethods((prev) => ({
                ...prev,
                email: checked,
              })),
            type: "checkbox",
          },
          {
            id: "push",
            label: "Push Notifications",
            description:
              "Get real-time updates and alerts directly on your device",
            checked: notificationMethods.push,
            onCheckedChange: (checked) =>
              setNotificationMethods((prev) => ({
                ...prev,
                push: checked,
              })),
            type: "checkbox",
          },
          {
            id: "sms",
            label: "SMS Notifications",
            description: "Receive notifications via SMS",
            checked: notificationMethods.sms,
            onCheckedChange: (checked) =>
              setNotificationMethods((prev) => ({
                ...prev,
                sms: checked,
              })),
            type: "checkbox",
          },
        ]}
      />
    </>
  );
};
export default Page;
