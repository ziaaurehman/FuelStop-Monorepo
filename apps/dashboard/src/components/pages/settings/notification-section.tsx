"use client";

import { Switch ,Checkbox} from "@repo/components";

interface NotificationItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  type?: "switch" | "checkbox";
}

interface NotificationSectionProps {
  title: string;
  description: string;
  items: NotificationItem[];
}

export function NotificationSection({
  title,
  description,
  items,
}: NotificationSectionProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="pb-4 border-b">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Notification Items */}
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between py-2">
            <div className="flex-1 space-y-1">
              <h3 className="text-base font-medium">{item.label}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            <div className="ml-4">
              {item.type === "checkbox" ? (
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={item.onCheckedChange}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              ) : (
                <Switch
                  checked={item.checked}
                  onCheckedChange={item.onCheckedChange}
                  className="data-[state=checked]:bg-primary"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
