"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  useSidebar,
} from "@repo/components";
import { navigationConfig } from "@/config";
import { UserProfile } from "./user-profile";
import Logo from "../misc/logo";

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  // Filter out the "System" group and limit the main sidebar items to 5
  const filteredNavigation = navigationConfig
    .filter((group) => group.title !== "System")
    .slice(0, 5);

  // Get only the "System" group for the footer
  const systemGroup = navigationConfig.find(
    (group) => group.title === "System"
  );

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false); // <--- close sidebar on mobile
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="text-white bg-black border-none data-[mobile=true]:bg-black"
    >
      <SidebarHeader>
        <Logo color="white" />
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
                          ? "bg-primary text-white font-medium rounded-xl py-1"
                          : "text-neutral-400 py-1"
                      }`}
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.href} onClick={handleLinkClick}>
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
                          ? "bg-primary text-white rounded-xl"
                          : "text-gray-300"
                      }`}
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.href} onClick={handleLinkClick}>
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
        )}
        {/* User Profile Section */}
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
