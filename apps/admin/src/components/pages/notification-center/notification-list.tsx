"use client";

import { useState } from "react";
import { Notification, ChatNotification, TicketNotification } from "@/data";
import { ChatNotificationItem } from "./notification-item";
import { AlertItem } from "./alert-item";
import { SystemMessageItem } from "./system-message-item";
import { ChatView } from "./chat-view";
import { TicketView } from "./ticket-view";
import { cn } from "@/lib";
import { InboxIcon } from "lucide-react";

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowMobileDetail(true);
  };

  const handleBack = () => {
    setShowMobileDetail(false);
  };

  if (notifications.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <InboxIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">No notifications</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You{"'"}re all caught up! Check back later for new updates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* List View */}
      <div
        className={cn(
          "w-full overflow-y-auto border-r bg-white md:w-2/5 lg:w-1/3",
          showMobileDetail && "hidden md:block"
        )}
      >
        {notifications.map((notification) => {
          if (notification.type === "chat") {
            return (
              <ChatNotificationItem
                key={notification.id}
                notification={notification as ChatNotification}
                onClick={() => handleNotificationClick(notification)}
                isSelected={selectedNotification?.id === notification.id}
              />
            );
          }

          if (notification.type === "ticket") {
            return (
              <div
                key={notification.id}
                className={cn(
                  "cursor-pointer border-b p-4 transition-colors hover:bg-accent/50",
                  selectedNotification?.id === notification.id && "bg-accent"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(notification.timestamp).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Ticket ID: {notification.ticketId}</span>
                    <span>•</span>
                    <span>{notification.company}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.description}
                  </p>
                  {notification.assignedTo && (
                    <p className="text-xs text-muted-foreground">
                      Assigned to: {notification.assignedTo.name}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-700">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
                      {notification.priority}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700">
                      {notification.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          if (notification.type === "alert") {
            return (
              <AlertItem key={notification.id} notification={notification} />
            );
          }

          if (notification.type === "system") {
            return (
              <SystemMessageItem
                key={notification.id}
                notification={notification}
              />
            );
          }

          return null;
        })}
      </div>

      {/* Detail View */}
      <div
        className={cn(
          "flex-1 bg-gray-50 dark:bg-gray-950",
          !showMobileDetail && "hidden md:flex"
        )}
      >
        {selectedNotification ? (
          selectedNotification.type === "chat" ? (
            <ChatView
              notification={selectedNotification as ChatNotification}
              onBack={handleBack}
            />
          ) : selectedNotification.type === "ticket" ? (
            <TicketView
              notification={selectedNotification as TicketNotification}
              onBack={handleBack}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <InboxIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">No detail view</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This notification type doesn{"'"}t have a detail view
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <InboxIcon className="h-10 w-10 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  No notification selected
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a notification from the list to view details
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
