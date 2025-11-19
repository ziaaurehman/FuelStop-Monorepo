"use client";

import React from "react";
import { AppHeader, HeaderActions, MobileSettingsNav } from "@/components";
import { Button, Badge, Input } from "@repo/components";
import Image from "next/image";

interface AppItemProps {
  logo: string;
  name: string;
  description: string;
  connected?: boolean;
  onManage: () => void;
}

const apps: AppItemProps[] = [
  {
    logo: "https://1000logos.net/wp-content/uploads/2023/04/Microsoft-Office-Logo-2012-1536x864.png",
    name: "Microsoft Office 365",
    description: "Seamless collaboration and document management.",
    onManage: () => console.log("Manage Office 365"),
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
    name: "Slack",
    description: "For team communication and real-time collaboration.",
    onManage: () => console.log("Manage Slack"),
  },
  {
    logo: "https://1000logos.net/wp-content/uploads/2021/05/Asana-logo.jpg",
    name: "Asana",
    description: "For project management and task tracking.",
    connected: true,
    onManage: () => console.log("Manage Asana"),
  },
  {
    logo: "https://1000logos.net/wp-content/uploads/2021/06/Zoom-Logo.png",
    name: "Zoom",
    description: "For conducting virtual meetings and interviews.",
    onManage: () => console.log("Manage Zoom"),
  },
  {
    logo: "https://1000logos.net/wp-content/uploads/2023/01/Dropbox-logo-1536x864.png",
    name: "Dropbox",
    description:
      "Cloud-based platform for storing, sharing, and synchronizing files.",
    onManage: () => console.log("Manage Dropbox"),
  },
  {
    logo: "https://1000logos.net/wp-content/uploads/2020/06/Zendesk-Logo.jpg",
    name: "Zendesk",
    description: "For customer support and ticket management.",
    connected: true,
    onManage: () => console.log("Manage Zendesk"),
  },
];

function AppItem({
  logo,
  name,
  description,
  connected,
  onManage,
}: AppItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-4 flex-wrap gap-3">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Image
          src={logo}
          alt={name}
          width={40}
          height={40}
          className="rounded-md object-contain"
        />
        <div>
          <h3 className="text-base font-medium flex items-center gap-2">
            {name}
            {connected && (
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                Connected
              </Badge>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full sm:w-auto flex justify-center items-center gap-1"
        onClick={onManage}
      >
        Manage
      </Button>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div>

      <div className="md:p-8 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold mb-1">All Apps</h1>
            <p className="text-sm text-muted-foreground">
              Access all the integrated tools and apps ready for your
              experience.
            </p>
          </div>
          <div className="w-full sm:w-64">
            <Input placeholder="Search integrations..." />
          </div>
        </div>

        <div className="border rounded-md divide-y bg-card shadow-sm">
          {apps.map((app) => (
            <AppItem key={app.name} {...app} />
          ))}
        </div>
      </div>
    </div>
  );
}
