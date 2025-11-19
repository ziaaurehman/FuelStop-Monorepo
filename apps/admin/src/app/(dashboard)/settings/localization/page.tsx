"use client";
import {
  AppHeader,
  HeaderActions,
  MobileSettingsNav,
  SettingItem,
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
        <SettingItem
          label="Language"
          description="Display the App in Your Language"
          value="English (ENG)"
          onEdit={() => console.log("Edit name")}
        />
        <SettingItem
          label="Currency"
          description="View Balances in Your Selected Currency"
          value="United States Dollar (USD)"
          onEdit={() => console.log("Edit name")}
        />
        <SettingItem
          label="Time Zone and Format"
          description="Choose Your Time Zone and preferred Format"
          value="24 Hrs"
          onEdit={() => console.log("Edit name")}
        />
        <SettingItem
          label="Date Format"
          description="Choose Your preferred Date Format"
          value="DD / MM / YYYY"
          onEdit={() => console.log("Edit name")}
        />
      </div>
    </div>
  );
};

export default page;
