import type { TimeRange, DateRange } from "./dashboard-stats.service";

export interface ChartDataPoint {
  day: string;
  gallons: number;
}

export interface WeeklyDeliveryTrendsData {
  data: ChartDataPoint[];
  dateRange: string;
}

export interface DashboardChartsParams {
  timeRange: TimeRange;
  dateRange?: DateRange;
}

/**
 * Mock data generator for weekly delivery trends
 */
class DashboardChartsService {
  /**
   * Generate mock chart data based on time range
   */
  private generateChartData(timeRange: TimeRange): ChartDataPoint[] {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Base values that vary by time range
    const baseValues: Record<TimeRange, { base: number; variation: number }> = {
      today: { base: 250, variation: 50 },
      yesterday: { base: 240, variation: 50 },
      week: { base: 2500, variation: 500 },
      month: { base: 2500, variation: 500 },
      year: { base: 25000, variation: 5000 },
      custom: { base: 2500, variation: 500 },
    };

    const config = baseValues[timeRange];
    const randomVariation = () =>
      Math.random() * config.variation * 2 - config.variation;

    return days.map((day) => ({
      day,
      gallons: Math.round(config.base + randomVariation()),
    }));
  }

  /**
   * Format date range string
   */
  private formatDateRange(dateRange?: DateRange): string {
    if (!dateRange) {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return `${weekAgo.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`;
    }

    return `${dateRange.startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${dateRange.endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  /**
   * Get weekly delivery trends data
   */
  async getWeeklyDeliveryTrends(
    params: DashboardChartsParams
  ): Promise<WeeklyDeliveryTrendsData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const data = this.generateChartData(params.timeRange);
    const dateRange = this.formatDateRange(params.dateRange);

    return {
      data,
      dateRange,
    };
  }

  /**
   * Get weekly delivery trends data (synchronous version)
   */
  getWeeklyDeliveryTrendsSync(
    params: DashboardChartsParams
  ): WeeklyDeliveryTrendsData {
    const data = this.generateChartData(params.timeRange);
    const dateRange = this.formatDateRange(params.dateRange);

    return {
      data,
      dateRange,
    };
  }
}

// Export singleton instance
export const dashboardChartsService = new DashboardChartsService();
