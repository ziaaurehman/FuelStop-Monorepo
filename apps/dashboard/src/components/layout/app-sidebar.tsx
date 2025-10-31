"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fuel } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/components";
import { navigationConfig } from "@/config";
import { UserProfile } from "./user-profile";

export function AppSidebar() {
  const pathname = usePathname();

  // Filter out the "System" group and limit the main sidebar items to 5
  const filteredNavigation = navigationConfig
    .filter((group) => group.title !== "System")
    .slice(0, 5);

  // Get only the "System" group for the footer
  const systemGroup = navigationConfig.find(
    (group) => group.title === "System"
  );

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="text-white bg-black border-none"
      
    >
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="w-full justify-start gap-2 py-3 px-2 data-[state=open]:bg-transparent"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Fuel className="h-5 w-5 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-black text-white">
                  FuelStop
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-xl font-semibold text-white truncate">
              FuelStop
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {filteredNavigation.map((group, index) => (
          <SidebarGroup key={index}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem
                      key={item.href}
                      className={`${
                        isActive
                          ? "bg-[#172D32] text-white font-medium rounded-xl py-1"
                          : "text-neutral-400 py-1"
                      }`}
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon className="h-6 w-6" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto text-xs">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        {/* Only display the "System" group */}
        {systemGroup && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {systemGroup.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem
                      key={item.href}
                      className={`${
                        isActive
                          ? "bg-[#172D32] text-white rounded-xl"
                          : "text-gray-300"
                      }`}
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto text-xs">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {/* User Profile Section */}
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
