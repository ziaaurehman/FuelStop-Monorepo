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
import { navigationConfig, NavItem } from "@/config";
import { ReactNode } from "react";
import Logo from "@repo/components/shared/logo";

interface AppSidebarProps {
  userProfile?: ReactNode;
}

export function AppSidebar({ userProfile }: AppSidebarProps) {
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

  function isItemActive(item: NavItem, pathname: string): boolean {
    if (pathname === item.href) return true;

    // Mark parent as active if pathname starts with its href + "/"
    if (pathname.startsWith(item.href + "/")) return true;

    // Recursively check children (if any)
    if (
      item.children &&
      item.children.some((child) => isItemActive(child, pathname))
    ) {
      return true;
    }

    return false;
  }

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
                          : "text-neutral-400 hover:bg-primary-light/50 hover:text-white rounded-xl py-1 transition-colors"
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
                  const isActive = isItemActive(item, pathname);

                  return (
                    <SidebarMenuItem
                      key={item.href}
                      className={`${
                        isActive
                          ? "bg-primary text-white font-medium rounded-xl py-1"
                          : "text-neutral-400 hover:bg-primary-light/50 hover:text-white rounded-xl py-1 transition-colors"
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
        {userProfile}
      </SidebarFooter>
    </Sidebar>
  );
}
