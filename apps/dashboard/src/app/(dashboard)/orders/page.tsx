import { AppHeader, HeaderActions } from "@/components";
import TestModalPage from "@/components/misc/modal-test";
import React from "react";

const page = () => {
  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="space-y-6 md:p-8 p-4">Order Page</div>
      <TestModalPage />
    </>
  );
};

export default page;
