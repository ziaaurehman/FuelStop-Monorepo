// app/settings/layout.tsx
import { ReactNode } from "react";
import { SettingsSidebar } from "@/components";
// import { MobileSettingsNav } from "@/components";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Dropdown */}
      {/* <div className="md:hidden px-4 pt-4">
        <MobileSettingsNav />
      </div> */}

      <div className="flex flex-1">
        {/* Sidebar for md+ */}
        <aside className="hidden md:block w-64 border-r">
          <SettingsSidebar />
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
