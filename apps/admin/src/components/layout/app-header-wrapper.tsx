"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { AppHeader } from "./app-header";
import { HeaderActions } from "../pages/dashboard";
import { headerModals } from "@/config";

const AppHeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Find the first matching modal rule (exact match or parent match)
  const matchedRoute = Object.keys(headerModals).find((route) =>
    pathname.startsWith(route)
  );

  const customModal = matchedRoute ? headerModals[matchedRoute] : undefined;

  // Settings → no header at all
  if (pathname.startsWith("/settings")) {
    return children;
  }

  return (
    <div>
      <AppHeader headerActions={<HeaderActions customModal={customModal} />} />
      <div className="md:p-8 p-4 space-y-6">{children}</div>
    </div>
  );
};

export default AppHeaderWrapper;
