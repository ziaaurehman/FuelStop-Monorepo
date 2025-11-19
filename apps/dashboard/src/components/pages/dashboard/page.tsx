import { MonthlyFuelChart } from "./monthly-fuel-chart";
import { ActiveDeliveriesTable } from "./active-deliveries-table";
import { SavingsComparisonChart } from "./saving-comparison-chart";

const DashboardPage = () => {
  return (
    <>
      {/* Top Grid - Charts and Table */}
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        {/* Monthly Fuel Consumption Chart */}
        <MonthlyFuelChart />

        {/* Active Deliveries Table */}
        <ActiveDeliveriesTable />
      </div>

      {/* Bottom Full Width - Savings Comparison Chart */}
      <SavingsComparisonChart />
    </>
  );
};

export default DashboardPage;
