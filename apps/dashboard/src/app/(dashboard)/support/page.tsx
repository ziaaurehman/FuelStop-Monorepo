import { AppHeader, HeaderActions } from "@/components";
import React from "react";

const page = () => {
  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="space-y-6 md:p-8 p-4">Support Page</div>
    </>
  );
};

export default page;
