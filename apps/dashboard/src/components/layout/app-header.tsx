"use client";

import { SidebarTrigger } from "@repo/components";
import Logo from "../misc/logo";
import { ReactNode } from "react";
import { PageMeta } from "./page-meta";

interface AppHeaderProps {
  headerActions?: ReactNode;
}

export function AppHeader({ headerActions }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between gap-4 bg-black text-white md:text-black md:bg-background px-2 md:p-6">
      <div className="flex md:gap-6 gap-2 items-center">
        <SidebarTrigger />
        <div className="flex items-center md:hidden">
          <Logo color="white" />
        </div>
        <PageMeta />
      </div>

      {headerActions}
    </header>
  );
}
