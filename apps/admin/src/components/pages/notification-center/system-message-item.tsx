"use client";

import { SystemNotification } from "@/data";
import { Badge } from "@repo/components/ui/badge";
import { cn } from "@/lib";
import { Database, AlertTriangle } from "lucide-react";

interface SystemMessageItemProps {
  notification: SystemNotification;
  onClick?: () => void;
  isSelected?: boolean;
}

const severityColors = {
  critical: "text-red-700 bg-red-50 border-red-200",
  warning: "text-orange-700 bg-orange-50 border-orange-200",
  info: "text-blue-700 bg-blue-50 border-blue-200",
};

const statusColors = {
  active: "text-green-700 bg-green-50 border-green-200",
  resolved: "text-gray-700 bg-gray-50 border-gray-200",
};

export function SystemMessageItem({
  notification,
  onClick,
  isSelected,
}: SystemMessageItemProps) {
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
        onClick && "cursor-pointer hover:bg-accent/50",
        isSelected && "bg-accent"
      )}
      onClick={onClick}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <Database className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold">{notification.title}</h4>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatTime(notification.timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {notification.description}
        </p>

        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={severityColors[notification.severity]}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {notification.severity}
          </Badge>
          <Badge
            variant="outline"
            className={statusColors[notification.status]}
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-current" />
            {notification.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
