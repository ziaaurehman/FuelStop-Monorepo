import { DashboardPage } from "@/components";
import { getDashboardData } from "@/services/mock/dashboard.service";

/**
 * Server component that fetches dashboard data
 */
export default async function Dashboard() {
  // Fetch dashboard data with simulated API delay
  const dashboardData = await getDashboardData();

  return <DashboardPage dashboardData={dashboardData} />;
}
