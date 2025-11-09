import { SidebarProvider } from "@repo/components";
import { AppSidebar } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="w-full h-full md:p-2 overflow-y-scroll overflow-x-hidden">
          {/* <AppHeader /> */}
          <main className="bg-white rounded-xl h-full overflow-y-scroll overflow-x-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
