"use client";
import {
  ProfilePhotoUpload,
  SettingItem,
} from "@/components";

import { User, Mail, Phone, MapPin } from "lucide-react";

const page = () => {
  return (
    <>
      {/* Profile Photo Section */}
      <ProfilePhotoUpload />

      {/* Full Name */}
      <SettingItem
        icon={User}
        label="Full Name"
        description="Your name will be visible to your contacts."
        value="Royal Parvej"
        onEdit={() => console.log("Edit name")}
      />

      {/* Email Address */}
      <SettingItem
        icon={Mail}
        label="Email Address"
        description="Business email address recommended."
        value="royalparvej@fuelstop.com"
        onEdit={() => console.log("Edit email")}
      />

      {/* Phone Number */}
      <SettingItem
        icon={Phone}
        label="Phone Number"
        description="Business phone number recommended."
        value="+1 (012) 345-6789"
        onEdit={() => console.log("Edit phone")}
      />

      {/* Legal Address */}
      <SettingItem
        icon={MapPin}
        label="Legal Address"
        description="Legal residential address for billing details."
        value={
          <>
            12 Rue Principale
            <br />
            Ville de Québec,
            <br />
            Québec, Canada
          </>
        }
        onEdit={() => console.log("Edit address")}
      />
    </>
  );
};

export default page;
