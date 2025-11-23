import {
  RecentOrders,
  StatsGrid,
  SystemAlerts,
  TimeRangeTabs,
  WeeklyDeliveryTrends,
} from "@/components";

export default function DashboardPage() {
  return (
    <div>
      <TimeRangeTabs />
      <StatsGrid />
      <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
        <div className="lg:col-span-2 gap-2 grid">
          <WeeklyDeliveryTrends />
          <RecentOrders />
        </div>
        <div className="lg:col-span-1">
          <SystemAlerts />
        </div>
      </div>
    </div>
  );
}
