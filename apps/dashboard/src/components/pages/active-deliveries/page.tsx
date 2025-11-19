import {
  DeliveryList,
  FuelSavingsCalculator,
  PredictiveInsights,
  StatsCards,
} from "@/components";

const ActiveDeliveriesPage = () => {
  return (
    <>
      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        {/* Active Deliveries List */}
        <DeliveryList />

        {/* Right Column */}
        <div className="space-y-6">
          {/* Predictive Insights */}
          <PredictiveInsights />

          {/* Fuel Savings Calculator */}
          <FuelSavingsCalculator />
        </div>
      </div>
    </>
  );
};
export default ActiveDeliveriesPage;
