"use client";

import { ChevronRight } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/components";

import Link from "next/link";

export function UserProfile() {
  // Replace with actual user data from your auth system
  const user = {
    name: "Arthur Taylor",
    email: "arthur@gmail.com",
    avatar: "/avatars/arthur.jpg", // or null for fallback
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Link href={"/login"}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold text-white">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            <ChevronRight className="ml-auto h-4 w-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Link>
  );
}
