import { AppHeader, HeaderActions, MobileSettingsNav } from "@/components";
import React from "react";

const page = () => {
  return (
    <div>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>
      <div className="md:p-8 p-4 space-y-4 ">Page</div>
    </div>
  );
};

export default page;
