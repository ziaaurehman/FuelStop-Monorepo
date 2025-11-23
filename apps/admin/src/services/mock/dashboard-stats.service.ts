import type { StatItem } from "@/components/misc/stats-card";
import { DollarSign, Leaf, ShoppingCart } from "lucide-react";

export type TimeRange =
  | "today"
  | "yesterday"
  | "week"
  | "month"
  | "year"
  | "custom";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DashboardStatsParams {
  timeRange: TimeRange;
  dateRange?: DateRange; // Required when timeRange is "custom"
}

/**
 * Mock data generator for dashboard stats
 * In production, this would be replaced with actual API calls
 */
class DashboardStatsService {
  /**
   * Generate mock stats based on time range
   */
  private generateMockStats(timeRange: TimeRange): {
    activeOrders: { value: string; change: number };
    totalGallons: { value: string; change: number };
    liveDrivers: { value: string; change: number };
    revenue: { value: string; change: number };
  } {
    // Base values that vary by time range
    const baseValues: Record<
      TimeRange,
      {
        activeOrders: { base: number; multiplier: number };
        totalGallons: { base: number; multiplier: number };
        liveDrivers: { base: number; multiplier: number };
        revenue: { base: number; multiplier: number };
      }
    > = {
      today: {
        activeOrders: { base: 120, multiplier: 1 },
        totalGallons: { base: 15, multiplier: 1 },
        liveDrivers: { base: 8, multiplier: 1 },
        revenue: { base: 150, multiplier: 1 },
      },
      yesterday: {
        activeOrders: { base: 115, multiplier: 1 },
        totalGallons: { base: 14, multiplier: 1 },
        liveDrivers: { base: 7, multiplier: 1 },
        revenue: { base: 145, multiplier: 1 },
      },
      week: {
        activeOrders: { base: 850, multiplier: 1 },
        totalGallons: { base: 105, multiplier: 1 },
        liveDrivers: { base: 45, multiplier: 1 },
        revenue: { base: 1050, multiplier: 1 },
      },
      month: {
        activeOrders: { base: 3484, multiplier: 1 },
        totalGallons: { base: 486, multiplier: 1 },
        liveDrivers: { base: 230, multiplier: 1 },
        revenue: { base: 4532, multiplier: 1 },
      },
      year: {
        activeOrders: { base: 41808, multiplier: 1 },
        totalGallons: { base: 5832, multiplier: 1 },
        liveDrivers: { base: 2760, multiplier: 1 },
        revenue: { base: 54384, multiplier: 1 },
      },
      custom: {
        activeOrders: { base: 3484, multiplier: 1 },
        totalGallons: { base: 486, multiplier: 1 },
        liveDrivers: { base: 230, multiplier: 1 },
        revenue: { base: 4532, multiplier: 1 },
      },
    };

    const config = baseValues[timeRange];
    const randomVariation = () => Math.random() * 0.1 - 0.05; // ±5% variation

    return {
      activeOrders: {
        value: Math.round(
          config.activeOrders.base * (1 + randomVariation())
        ).toLocaleString(),
        change:
          timeRange === "today" ? 2.2 : timeRange === "yesterday" ? -1.5 : 2.2,
      },
      totalGallons: {
        value: `${Math.round(
          config.totalGallons.base * (1 + randomVariation())
        ).toLocaleString()} gal`,
        change:
          timeRange === "today"
            ? 3.22
            : timeRange === "yesterday"
              ? -2.1
              : 3.22,
      },
      liveDrivers: {
        value: Math.round(
          config.liveDrivers.base * (1 + randomVariation())
        ).toLocaleString(),
        change:
          timeRange === "today" ? -2.1 : timeRange === "yesterday" ? 1.2 : -2.1,
      },
      revenue: {
        value: `$${Math.round(
          config.revenue.base * (1 + randomVariation())
        ).toLocaleString()}`,
        change:
          timeRange === "today"
            ? 1.22
            : timeRange === "yesterday"
              ? -0.8
              : 1.22,
      },
    };
  }

  /**
   * Format change percentage for badge
   */
  private formatChange(change: number): {
    text: string;
    variant: "success" | "destructive" | "default";
  } {
    const sign = change >= 0 ? "+" : "";
    return {
      text: `${sign}${change.toFixed(2)}%`,
      variant: change >= 0 ? "success" : "destructive",
    };
  }

  /**
   * Get dashboard stats
   * This method simulates an API call and returns formatted stats
   */
  async getDashboardStats(params: DashboardStatsParams): Promise<StatItem[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const stats = this.generateMockStats(params.timeRange);

    return [
      {
        icon: ShoppingCart,
        label: "Active Orders",
        value: stats.activeOrders.value,
        badge: this.formatChange(stats.activeOrders.change),
      },
      {
        icon: DollarSign,
        label: "Total Gallons Delivered",
        value: stats.totalGallons.value,
        badge: this.formatChange(stats.totalGallons.change),
      },
      {
        icon: Leaf,
        label: "Live Drivers",
        value: stats.liveDrivers.value,
        badge: this.formatChange(stats.liveDrivers.change),
      },
      {
        icon: Leaf,
        label: "Revenue",
        value: stats.revenue.value,
        badge: this.formatChange(stats.revenue.change),
      },
    ];
  }

  /**
   * Get dashboard stats (synchronous version for immediate use)
   */
  getDashboardStatsSync(params: DashboardStatsParams): StatItem[] {
    const stats = this.generateMockStats(params.timeRange);

    return [
      {
        icon: ShoppingCart,
        label: "Active Orders",
        value: stats.activeOrders.value,
        badge: this.formatChange(stats.activeOrders.change),
      },
      {
        icon: DollarSign,
        label: "Total Gallons Delivered",
        value: stats.totalGallons.value,
        badge: this.formatChange(stats.totalGallons.change),
      },
      {
        icon: Leaf,
        label: "Live Drivers",
        value: stats.liveDrivers.value,
        badge: this.formatChange(stats.liveDrivers.change),
      },
      {
        icon: Leaf,
        label: "Revenue",
        value: stats.revenue.value,
        badge: this.formatChange(stats.revenue.change),
      },
    ];
  }
}

// Export singleton instance
export const dashboardStatsService = new DashboardStatsService();
