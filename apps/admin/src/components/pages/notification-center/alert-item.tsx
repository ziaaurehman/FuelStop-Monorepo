"use client";

import { AlertNotification } from "@/data";
import { cn } from "@/lib";
import {
  Truck,
  PackageX,
  PackageOpen,
  UserPlus,
  AlertTriangle,
} from "lucide-react";

interface AlertItemProps {
  notification: AlertNotification;
  onClick?: () => void;
  isSelected?: boolean;
}

const iconMap = {
  truck: Truck,
  "package-x": PackageX,
  "package-open": PackageOpen,
  "user-plus": UserPlus,
};

const severityColors = {
  critical: "bg-red-50 border-red-200 dark:bg-red-950/20",
  warning: "bg-orange-50 border-orange-200 dark:bg-orange-950/20",
  info: "bg-blue-50 border-blue-200 dark:bg-blue-950/20",
};

const iconColors = {
  critical: "text-red-600 bg-red-100",
  warning: "text-orange-600 bg-orange-100",
  info: "text-blue-600 bg-blue-100",
};

export function AlertItem({
  notification,
  onClick,
  isSelected,
}: AlertItemProps) {
  const Icon =
    iconMap[notification.icon as keyof typeof iconMap] || AlertTriangle;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={cn(
        "flex items-start gap-4 border-b p-4 transition-colors max-w-2xl mx-auto",
        severityColors[notification.severity],
        onClick && "cursor-pointer hover:bg-accent/50",
        isSelected && "bg-accent"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
          iconColors[notification.severity]
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold">{notification.title}</h4>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatTime(notification.timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {notification.description}
        </p>
        {notification.metadata && (
          <p className="text-sm text-muted-foreground">
            {notification.metadata}
          </p>
        )}
      </div>
    </div>
  );
}
