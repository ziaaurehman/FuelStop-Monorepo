import { AppHeader, HeaderActions, MobileSettingsNav } from "@/components";
import React from "react";

const page = () => {
  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="space-y-6 md:p-8 p-4">Notifications Setting Page</div>
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>
    </>
  );
};

export default page;
