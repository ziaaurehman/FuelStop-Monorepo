// app/settings/layout.tsx
import { ReactNode } from "react";
import { SettingsHeaderWrapper, SettingsSidebar } from "@/components";
// import { MobileSettingsNav } from "@/components";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <aside className="hidden md:block w-64 h-screen border-r">
        <SettingsSidebar />
      </aside>
      <div className="w-full h-full md:p-2 overflow-y-scroll overflow-x-hidden ">
        {/* Sidebar for md+ */}

        <main className=" h-full overflow-y-scroll overflow-x-hidden">
          <SettingsHeaderWrapper>{children}</SettingsHeaderWrapper>
        </main>
      </div>
    </div>
  );
}
