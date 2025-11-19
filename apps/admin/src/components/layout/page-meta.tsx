"use client";

import { navigationConfig } from "@/config";
import { usePathname } from "next/navigation";

interface PageMeta {
  title: string;
  description?: string;
  icon?: React.ElementType | null;
}

function findPageMeta(pathname: string): PageMeta {
  for (const group of navigationConfig) {
    for (const item of group.items) {
      // 1. Exact match
      if (item.href === pathname) return item;

      // 2. Match all nested routes like /notification-center/*
      if (
        pathname.startsWith(item.href + "/") &&
        item.href !== "/" // prevent matching everything
      ) {
        return item;
      }

      // 3. Match children as usual
      if (item.children) {
        const child = item.children.find((c) => {
          if (c.href === pathname) return true;
          return pathname.startsWith(c.href + "/");
        });
        if (child) return child;
      }
    }
  }

  return { title: "", description: "", icon: null };
}

export function PageMeta() {
  const pathname = usePathname();
  const currentPage = findPageMeta(pathname);
  const Icon = currentPage.icon;

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {Icon && <Icon className="h-5 w-5 hidden md:flex" />}
      <div className="hidden md:flex flex-col">
        <h1 className="text-xl font-semibold tracking-tight">
          {currentPage.title}
        </h1>
        {currentPage.description && (
          <p className="text-muted-foreground text-sm text-nowrap">
            {currentPage.description}
          </p>
        )}
      </div>
    </div>
  );
}
