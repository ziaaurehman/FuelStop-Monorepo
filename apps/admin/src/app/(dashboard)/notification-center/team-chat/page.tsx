"use client";

import { dummyNotifications } from "@/data";
import { Button, Input } from "@repo/components";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { ChatNotification } from "@/data";
import { cn } from "@/lib";
import { InboxIcon } from "lucide-react";
import { ChatNotificationItem, ChatView } from "@/components";

export default function TeamChatPage() {
  const chatNotifications = dummyNotifications.filter(
    (n) => n.type === "chat"
  ) as ChatNotification[];

  const [selectedChat, setSelectedChat] = useState<ChatNotification | null>(
    null
  );
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const handleChatClick = (chat: ChatNotification) => {
    setSelectedChat(chat);
    setShowMobileDetail(true);
  };

  const handleBack = () => {
    setShowMobileDetail(false);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar with chat list */}
      <div
        className={cn(
          "w-full md:w-96 border-r bg-white flex flex-col",
          showMobileDetail && "hidden md:flex"
        )}
      >
        {/* Search */}
        <div className="p-4 border-b space-y-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9" />
          </div>
          <Button className="w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Chat list */}
        <div
          className={cn(
            "flex-1 overflow-y-auto",
          )}
        >
          {chatNotifications.length === 0 ? (
            <div className="flex h-full items-center justify-center p-4">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <InboxIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">No conversations</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start a new chat to begin
                  </p>
                </div>
              </div>
            </div>
          ) : (
            chatNotifications.map((notification) => (
              <ChatNotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleChatClick(notification)}
                isSelected={selectedChat?.id === notification.id}
              />
            ))
          )}
        </div>
      </div>

      {/* Chat Detail View */}
      <div
        className={cn(
          "flex-1 bg-gray-50 dark:bg-gray-950",
          !showMobileDetail && "hidden md:flex"
        )}
      >
        {selectedChat ? (
          <ChatView notification={selectedChat} onBack={handleBack} />
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
                  No conversation selected
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a conversation from the list to start chatting
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
