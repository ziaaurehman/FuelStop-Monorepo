"use client";

import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigation";
import { SidebarTrigger } from "@repo/components";
import Logo from "../misc/logo";
import { ReactNode } from "react";

interface AppHeaderProps {
  headerActions?: ReactNode;
}

function findPageMeta(pathname: string) {
  for (const group of navigationConfig) {
    for (const item of group.items) {
      if (item.href === pathname) return item;
      if (item.children) {
        const child = item.children.find((child) => child.href === pathname);
        if (child) return child;
      }
    }
  }
  return null;
}

export function AppHeader({ headerActions }: AppHeaderProps) {
  const pathname = usePathname();

  const currentPage = findPageMeta(pathname) || {
    title: "",
    description: "",
    icon: null,
  };

  const Icon = currentPage.icon;

  return (
    <header className="flex h-16 items-center justify-between gap-4 bg-black text-white md:text-black md:bg-background px-2 md:p-6">
      <div className="flex md:gap-6 gap-2 items-center">
        <SidebarTrigger />
        <div className="flex items-center md:hidden">
          <Logo color="white" />
        </div>
        {Icon && <Icon className="h-5 w-5 hidden md:flex" />}

        <div className="hidden md:flex">
          <div className="relative max-w-md">
            <h1 className="text-xl font-semibold tracking-tight">
              {currentPage.title}
            </h1>
            <p className="text-muted-foreground text-sm text-nowrap">
              {currentPage.description}
            </p>
          </div>
        </div>
      </div>

      {headerActions}
    </header>
  );
}
