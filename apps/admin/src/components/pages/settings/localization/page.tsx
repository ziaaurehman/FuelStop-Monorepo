"use client";
import { SettingItem } from "@/components";
import React from "react";

const page = () => {
  return (
    <div>
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
  );
};

export default page;
