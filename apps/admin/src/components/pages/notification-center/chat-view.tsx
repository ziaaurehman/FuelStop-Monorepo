"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/components/ui/avatar";
import { Button, Input } from "@repo/components/index";
import {
  Phone,
  Video,
  MoreVertical,
  Send,
  Smile,
  Mic,
  ArrowLeft,
} from "lucide-react";
import { ChatNotification } from "@/data";
import { cn } from "@/lib";
import { useState } from "react";

interface ChatViewProps {
  notification: ChatNotification;
  onBack?: () => void;
}

export function ChatView({ notification, onBack }: ChatViewProps) {
  const [message, setMessage] = useState("");
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

  const handleSend = () => {
    if (message.trim()) {
      console.log("Send message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={notification.user.avatar}
              alt={notification.user.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{notification.user.name}</h3>
            <p className="text-xs text-muted-foreground">
              {notification.user.lastOnline || "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
        {notification.messages?.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.isOwn ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-2",
                msg.isOwn
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <p className="text-sm whitespace-pre-wrap break-words">
                {msg.content}
              </p>
            </div>
          </div>
        ))}
        <div className="text-center">
          <span className="text-xs text-muted-foreground">
            {formatTime(notification.timestamp)}
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="border-t px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-9 w-9 shrink-0 bg-teal-600 hover:bg-teal-700"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
