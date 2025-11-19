"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/components";
import { cn } from "@/lib";
import { ChatNotification } from "@/data";

interface ChatNotificationItemProps {
  notification: ChatNotification;
  onClick: () => void;
  isSelected?: boolean;
}

export function ChatNotificationItem({
  notification,
  onClick,
  isSelected,
}: ChatNotificationItemProps) {
  const initials = notification.user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

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
        "w-full flex cursor-pointer items-start gap-3 border-b p-4 transition-colors hover:bg-neutral-200",
        isSelected && "bg-neutral-200",
        notification.unread && "bg-blue-50/50 "
      )}
      onClick={onClick}
    >
      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{notification.user.name}</h4>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatTime(notification.timestamp)}
          </span>
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {notification.lastMessage}
        </p>
      </div>
    </div>
  );
}