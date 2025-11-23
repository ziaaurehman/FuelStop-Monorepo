import { ScheduleDelivery } from "@/data";
import { MockApiService } from "./mock-api.service";

/**
 * Mock service for delivery schedule API calls.
 */
class ScheduleService extends MockApiService {
  private schedules: ScheduleDelivery[] = [];

  constructor() {
    super();
    this.initializeData();
  }

  /**
   * Initialize mock schedule data.
   */
  private initializeData() {
    const statuses = [
      "scheduled",
      "assigned",
      "in-progress",
      "completed",
      "blocked",
    ];
    const fuelTypes: ScheduleDelivery["fuelType"][] = [
      "Diesel",
      "Petrol",
      "Gasoline",
    ];
    const priorities: ScheduleDelivery["priority"][] = [
      "high",
      "medium",
      "low",
    ];
    const companies = [
      "Metro Gas Station",
      "City Fuel Center",
      "Highway Express",
      "Quick Stop Fuel",
      "Premium Gas Co",
    ];
    const drivers = [
      { name: "John Smith", avatar: undefined },
      { name: "Jane Doe", avatar: undefined },
      { name: "Bob Johnson", avatar: undefined },
    ];
    const locations = [
      "Downtown Street",
      "Uptown Avenue",
      "Main Street",
      "Highway 101",
      "Industrial Park",
    ];

    for (let i = 1; i <= 50; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const hasDriver = status !== "scheduled" && Math.random() > 0.3;

      this.schedules.push({
        id: `${status.toUpperCase().substring(0, 3)}-${String(i).padStart(3, "0")}`,
        orderId: `#ORD-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`,
        companyName: companies[Math.floor(Math.random() * companies.length)],
        gallons: Math.floor(Math.random() * 1000) + 100,
        fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
        time:
          status === "completed"
            ? undefined
            : `${Math.floor(Math.random() * 12) + 8} AM - ${Math.floor(Math.random() * 12) + 9} AM`,
        completedAt:
          status === "completed" ? new Date().toISOString() : undefined,
        location: locations[Math.floor(Math.random() * locations.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        driver: hasDriver
          ? drivers[Math.floor(Math.random() * drivers.length)]
          : undefined,
      });
    }
  }

  /**
   * Get schedules grouped by status with filtering.
   */
  async getSchedules(params: {
    search?: string;
    driver?: string;
    district?: string;
  }): Promise<Record<string, ScheduleDelivery[]>> {
    await this.simulateDelay();

    let filtered = [...this.schedules];

    // Search filter
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (schedule) =>
          schedule.orderId.toLowerCase().includes(searchLower) ||
          schedule.companyName.toLowerCase().includes(searchLower) ||
          schedule.location.toLowerCase().includes(searchLower)
      );
    }

    // Driver filter
    if (params.driver && params.driver !== "all") {
      filtered = filtered.filter(
        (schedule) => schedule.driver?.name === params.driver
      );
    }

    // District filter (using location as proxy)
    if (params.district && params.district !== "all") {
      filtered = filtered.filter((schedule) =>
        schedule.location.toLowerCase().includes(params.district!.toLowerCase())
      );
    }

    // Group by status
    const grouped: Record<string, ScheduleDelivery[]> = {
      scheduled: [],
      assigned: [],
      "in-progress": [],
      completed: [],
      blocked: [],
    };

    filtered.forEach((schedule) => {
      const status = schedule.id.split("-")[0].toLowerCase();
      if (status === "sch") {
        grouped.scheduled.push(schedule);
      } else if (status === "asn") {
        grouped.assigned.push(schedule);
      } else if (status === "inp" || status === "in-") {
        grouped["in-progress"].push(schedule);
      } else if (status === "com") {
        grouped.completed.push(schedule);
      } else if (status === "blo") {
        grouped.blocked.push(schedule);
      }
    });

    return grouped;
  }
}

export const scheduleService = new ScheduleService();
