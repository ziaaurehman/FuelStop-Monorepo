"use client";

import {
  AppHeader,
  HeaderActions,
  RecentOrders,
  StatsGrid,
  SystemAlerts,
  TimeRangeTabs,
  WeeklyDeliveryTrends,
} from "@/components";

export default function DashboardPage() {
  return (
    <div className="">
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-6">
        {/* Time Range Tabs */}
        <TimeRangeTabs />

        {/* Stats Grid */}
        <StatsGrid />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3 grid-cols-1">
          {/* Weekly Delivery Trends - 2 columns */}
          <div className="lg:col-span-2">
            <WeeklyDeliveryTrends />
            <RecentOrders />
          </div>

          {/* System Alerts - 1 column */}
          <div className="lg:col-span-1">
            <SystemAlerts />
          </div>
        </div>

        {/* Recent Orders - Full Width */}
      </div>
    </div>
  );
}
