import { Truck, AlertCircle, UserPlus, AlertTriangle } from "lucide-react";

export type AlertTab = "today" | "yesterday" | "thisWeek";

export type AlertVariant = "default" | "destructive" | "success" | "warning";

export interface SystemAlert {
  id: string;
  type: "delay" | "failed" | "success" | "warning";
  icon: React.ElementType;
  title: string;
  description: string;
  detail: string;
  time: string;
  variant: AlertVariant;
}

export interface DashboardAlertsParams {
  tab: AlertTab;
  searchQuery?: string;
}

/**
 * Mock data generator for system alerts
 */
class DashboardAlertsService {
  /**
   * Generate mock alerts based on tab
   */
  private generateMockAlerts(tab: AlertTab): SystemAlert[] {
    const baseAlerts: SystemAlert[] = [
      {
        id: "1",
        type: "delay",
        icon: Truck,
        title: "Driver Delayed",
        description: "ETA 45 mins late",
        detail: "John Smith (#FS-001)",
        time: "11:30 AM",
        variant: "default",
      },
      {
        id: "2",
        type: "failed",
        icon: AlertCircle,
        title: "Delivery Failed",
        description: "Customer unavailable — Metro Gas Station",
        detail: "Assigned driver: John Smith",
        time: "11:30 AM",
        variant: "destructive",
      },
      {
        id: "3",
        type: "failed",
        icon: AlertCircle,
        title: "Delivery Failed",
        description: "Customer unavailable — Metro Gas Station",
        detail: "Assigned driver: John Smith",
        time: "10:15 AM",
        variant: "destructive",
      },
      {
        id: "4",
        type: "success",
        icon: UserPlus,
        title: "New Driver Added",
        description: "Successfully onboarded to fleet",
        detail: "Michael Carter",
        time: "09:45 AM",
        variant: "success",
      },
      {
        id: "5",
        type: "warning",
        icon: AlertTriangle,
        title: "Driver Warning",
        description: "Speeding detected",
        detail: "Mike Wilson (#FS-003)",
        time: "08:20 AM",
        variant: "warning",
      },
    ];

    // Filter by tab (for now, return all for simplicity)
    // In a real app, this would filter by date
    switch (tab) {
      case "today":
        return baseAlerts;
      case "yesterday":
        return baseAlerts.slice(0, 3).map((alert) => ({
          ...alert,
          time: "Yesterday " + alert.time,
        }));
      case "thisWeek":
        return [
          ...baseAlerts,
          ...baseAlerts.slice(0, 2).map((alert, idx) => ({
            ...alert,
            id: String(6 + idx),
            time: "2 days ago " + alert.time,
          })),
        ];
      default:
        return baseAlerts;
    }
  }

  /**
   * Filter alerts by search query
   */
  private filterAlerts(
    alerts: SystemAlert[],
    searchQuery?: string
  ): SystemAlert[] {
    if (!searchQuery) return alerts;

    const query = searchQuery.toLowerCase();
    return alerts.filter(
      (alert) =>
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        alert.detail.toLowerCase().includes(query)
    );
  }

  /**
   * Get system alerts
   */
  async getSystemAlerts(params: DashboardAlertsParams): Promise<SystemAlert[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const alerts = this.generateMockAlerts(params.tab);
    return this.filterAlerts(alerts, params.searchQuery);
  }

  /**
   * Get system alerts (synchronous version)
   */
  getSystemAlertsSync(params: DashboardAlertsParams): SystemAlert[] {
    const alerts = this.generateMockAlerts(params.tab);
    return this.filterAlerts(alerts, params.searchQuery);
  }

  /**
   * Get alert count for a tab
   */
  getAlertCount(tab: AlertTab): number {
    const alerts = this.generateMockAlerts(tab);
    return alerts.length;
  }
}

// Export singleton instance
export const dashboardAlertsService = new DashboardAlertsService();
