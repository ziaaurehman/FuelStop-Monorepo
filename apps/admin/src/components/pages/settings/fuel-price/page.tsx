"use client";
import {
  InfoCard,
} from "@/components";
import React from "react";

const page = () => {
  return (
    <div>
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
  );
};

export default page;
