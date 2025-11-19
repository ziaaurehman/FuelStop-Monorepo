import { SidebarProvider } from "@repo/components";
import { AppSidebar, UserProfile } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full overflow-hidden">
        <AppSidebar userProfile={<UserProfile />} />
        <div className="w-full h-full md:p-2 overflow-hidden">
          {/* <AppHeader /> */}
          <main className="bg-white rounded-xl h-full overflow-y-scroll overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
