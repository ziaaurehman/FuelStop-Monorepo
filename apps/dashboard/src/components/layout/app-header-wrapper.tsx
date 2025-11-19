"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { AppHeader } from "./app-header";
import { HeaderActions } from "../pages/dashboard";

const AppHeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/settings")) {
    return children;
  }
  return (
    <div>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-6">{children}</div>
    </div>
  );
};

export default AppHeaderWrapper;
