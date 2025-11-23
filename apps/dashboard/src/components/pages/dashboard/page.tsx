import { MonthlyFuelChart } from "./monthly-fuel-chart";
import { ActiveDeliveriesTable } from "./active-deliveries-table";
import { SavingsComparisonChart } from "./saving-comparison-chart";
import type { DashboardData } from "@/services/mock/dashboard.service";

interface DashboardPageProps {
  dashboardData: DashboardData;
}

const DashboardPage = ({ dashboardData }: DashboardPageProps) => {
  return (
    <>
      {/* Top Grid - Charts and Table */}
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        {/* Monthly Fuel Consumption Chart */}
        <MonthlyFuelChart data={dashboardData.monthlyFuelData} />

        {/* Active Deliveries Table */}
        <ActiveDeliveriesTable orders={dashboardData.activeDeliveries} />
      </div>

      {/* Bottom Full Width - Savings Comparison Chart */}
      <SavingsComparisonChart data={dashboardData.savingsComparisonData} />
    </>
  );
};

export default DashboardPage;
