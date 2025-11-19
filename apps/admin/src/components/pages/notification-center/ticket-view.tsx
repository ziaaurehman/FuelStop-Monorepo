"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/components/ui/avatar";
import { Badge } from "@repo/components/ui/badge";
import { Button } from "@repo/components/index";
import {
  MoreVertical,
  Building2,
  UserCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Printer,
  MessageSquare,
} from "lucide-react";
import { TicketNotification } from "@/data";
import { cn } from "@/lib";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/components/ui/dropdown-menu";

interface TicketViewProps {
  notification: TicketNotification;
  onBack?: () => void;
}

export function TicketView({ notification, onBack }: TicketViewProps) {
  const priorityColors = {
    high: "text-red-700 bg-red-50 border-red-200",
    medium: "text-orange-700 bg-orange-50 border-orange-200",
    low: "text-gray-700 bg-gray-50 border-gray-200",
  };

  const statusColors = {
    "in progress": "text-orange-700 bg-orange-50 border-orange-200",
    pending: "text-blue-700 bg-blue-50 border-blue-200",
    resolved: "text-green-700 bg-green-50 border-green-200",
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) + ` ( 12 minutes ago )`; // Replace random number with a static value to ensure pure rendering
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">{notification.title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Ticket ID: {notification.ticketId}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {notification.company}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="outline"
                className={cn("cursor-pointer", statusColors[notification.status])}
              >
                <AlertTriangle className="mr-1 h-3 w-3" />
                {notification.status}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Resolved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* Ticket Info */}
        <div className="mb-6 space-y-4 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">{notification.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {notification.assignedTo && (
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="font-medium">{notification.assignedTo.name}</span>
              </div>
            )}
            {notification.lastUpdate && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Update:</span>
                <span className="font-medium">{notification.lastUpdate}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={priorityColors[notification.priority]}
            >
              <span className="mr-1 h-2 w-2 rounded-full bg-current" />
              {notification.priority}
            </Badge>
            <Badge
              variant="outline"
              className={statusColors[notification.status]}
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              {notification.status}
            </Badge>
          </div>
        </div>

        {/* Messages/Comments */}
        {notification.messages && notification.messages.length > 0 && (
          <div className="space-y-4">
            {notification.messages.map((msg) => {
              const initials = msg.sender.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <div key={msg.id} className="flex gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{msg.sender.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-3 md:px-6">
        <Button variant="outline" className="w-full">
          Close Ticket
        </Button>
      </div>
    </div>
  );
}