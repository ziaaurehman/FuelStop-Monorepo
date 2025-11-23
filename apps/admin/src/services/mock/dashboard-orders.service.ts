import type { Order } from "@/data/orders";
import type { TimeRange, DateRange } from "./dashboard-stats.service";

export interface DashboardOrdersParams {
  timeRange: TimeRange;
  dateRange?: DateRange;
  limit?: number;
}

/**
 * Mock data generator for recent orders
 */
class DashboardOrdersService {
  /**
   * Generate mock orders based on time range
   */
  private generateMockOrders(timeRange: TimeRange, limit: number = 5): Order[] {
    const baseOrders: Order[] = [
      {
        id: "#ORD-98745",
        client: "Metro Gas Station",
        address: "123 Main St, Downtown",
        gallons: 500,
        status: "in transit",
        driver: { name: "Dianne Russell", avatar: "" },
        date: new Date().toISOString(),
        priority: "high",
      },
      {
        id: "#ORD-98746",
        client: "City Fuel Hub",
        address: "456 Oak Ave, Uptown",
        gallons: 400,
        status: "delivered",
        driver: { name: "Savannah Nguyen", avatar: "" },
        date: new Date(Date.now() - 3600000).toISOString(),
        priority: "medium",
      },
      {
        id: "#ORD-98747",
        client: "Express Gas",
        address: "789 Pine Rd, Suburbs",
        gallons: 500,
        status: "delivered",
        driver: { name: "Jacob Jones", avatar: "" },
        date: new Date(Date.now() - 7200000).toISOString(),
        priority: "low",
      },
      {
        id: "#ORD-98748",
        client: "Quick Stop Fuel",
        address: "321 Maple Dr, Downtown",
        gallons: 500,
        status: "delivered",
        driver: { name: "Albert Flores", avatar: "" },
        date: new Date(Date.now() - 10800000).toISOString(),
        priority: "medium",
      },
      {
        id: "#ORD-98749",
        client: "Highway Gas",
        address: "654 Elm St, Highway Exit",
        gallons: 500,
        status: "delivered",
        driver: { name: "Esther Howard", avatar: "" },
        date: new Date(Date.now() - 14400000).toISOString(),
        priority: "high",
      },
      {
        id: "#ORD-98750",
        client: "Corner Store Fuel",
        address: "987 Cedar Ln, City Center",
        gallons: 300,
        status: "pending",
        driver: { name: "Cody Fisher", avatar: "" },
        date: new Date(Date.now() - 18000000).toISOString(),
        priority: "medium",
      },
      {
        id: "#ORD-98751",
        client: "Premium Gas Station",
        address: "147 Birch Way, Industrial",
        gallons: 600,
        status: "scheduled",
        driver: { name: "Jenny Wilson", avatar: "" },
        date: new Date(Date.now() - 21600000).toISOString(),
        priority: "high",
      },
    ];

    // Adjust orders based on time range
    // For different time ranges, we might show different orders
    // For now, return recent orders limited by limit
    return baseOrders.slice(0, limit);
  }

  /**
   * Get recent orders
   */
  async getRecentOrders(params: DashboardOrdersParams): Promise<Order[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const limit = params.limit || 5;
    return this.generateMockOrders(params.timeRange, limit);
  }

  /**
   * Get recent orders (synchronous version)
   */
  getRecentOrdersSync(params: DashboardOrdersParams): Order[] {
    const limit = params.limit || 5;
    return this.generateMockOrders(params.timeRange, limit);
  }
}

// Export singleton instance
export const dashboardOrdersService = new DashboardOrdersService();
