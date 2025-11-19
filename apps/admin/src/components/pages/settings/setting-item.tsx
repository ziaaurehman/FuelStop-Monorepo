"use client";

import { Button } from "@repo/components";
import { ChevronRight, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SettingItemProps {
  icon?: LucideIcon;
  label: string;
  description: string;
  value: ReactNode;
  onEdit: () => void;
}

export function SettingItem({
  label,
  description,
  value,
  onEdit,
}: SettingItemProps) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between py-6 border-b">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col md:items-end items-start gap-4 text-right">
        <div className="text-base font-medium">{value}</div>
        <Button
          variant="link"
          size="sm"
          onClick={onEdit}
          className="text-primary p-0 h-auto"
        >
          Edit
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export function InfoCard({
  title,
  description,
  buttonText,
  onButtonClick,
}: InfoCardProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 p-4 rounded-md border bg-background shadow-sm">
      <div className="text-center sm:text-left">
        <h2 className="font-medium text-lg">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="flex justify-center sm:justify-end">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
