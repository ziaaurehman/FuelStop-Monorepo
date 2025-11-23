"use client";
import React from "react";
import { AppHeader } from "./app-header";
import { HeaderActions } from "../pages/dashboard";
import { MobileSettingsNav } from "../pages/settings";

const SettingsHeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader headerActions={<HeaderActions customModal={<></>} />} />
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>
      <div className="md:p-8 p-4 space-y-6">{children}</div>
    </div>
  );
};

export default SettingsHeaderWrapper;
