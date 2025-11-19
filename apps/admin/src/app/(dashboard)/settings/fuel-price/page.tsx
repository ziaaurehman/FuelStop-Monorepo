import {
  AppHeader,
  HeaderActions,
  InfoCard,
  MobileSettingsNav,
} from "@/components";
import React from "react";

const page = () => {
  return (
    <div>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>
      <div className="md:p-8 p-4 space-y-4 ">
        <InfoCard
          title="Fuel Price"
          description="Current: $3.5 / L"
          buttonText="Update Price"
        />

        <InfoCard
          title="Petrol Price"
          description="Current: $4.5 / L"
          buttonText="Update Price"
        />
      </div>
    </div>
  );
};

export default page;
