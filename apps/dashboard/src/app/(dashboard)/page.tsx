import { AppHeader, HeaderActions } from "@/components";

export default function DashboardPage() {
  return (
    <div className="">
      <AppHeader headerActions={<HeaderActions />} />
      <div className="grid gap-6 md:grid-cols-2 space-y-6">
        {/* Add your dashboard content here */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Monthly Fuel Consumption</h3>
          <p className="text-sm text-muted-foreground">Chart will go here</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Active Deliveries</h3>
          <p className="text-sm text-muted-foreground">Table will go here</p>
        </div>
      </div>
    </div>
  );
}
