import type { Driver } from "@/data/drivers";
import type { DriverStatusFilter } from "@/components/pages/drivers/driver-status-tabs";

export interface DriversParams {
  statusFilter: DriverStatusFilter;
  searchQuery?: string;
}

/**
 * Mock data generator for drivers
 * In production, this would be replaced with actual API calls
 */
class DriversService {
  /**
   * Generate mock drivers data
   */
  private generateMockDrivers(): Driver[] {
    const names = [
      "Dianne Russell",
      "Savannah Nguyen",
      "Jacob Jones",
      "Albert Flores",
      "Esther Howard",
      "Cody Fisher",
      "Marvin McKinney",
      "Floyd Miles",
      "Darlene Robertson",
      "Robert Fox",
      "Guy Hawkins",
      "Darrell Steward",
      "Jane Smith",
      "John Doe",
      "Emily Johnson",
      "Michael Brown",
      "Sarah Williams",
      "David Miller",
      "Lisa Davis",
      "James Wilson",
    ];

    const vehicles = [
      "Truck #1",
      "Truck #2",
      "Truck #3",
      "Truck #4",
      "Truck #5",
      "Van #1",
      "Van #2",
      "Van #3",
    ];

    const locations = [
      "123 Main St, Downtown",
      "456 Oak Ave, Uptown",
      "789 Pine Rd, Downtown",
      "321 Elm St, Uptown",
      "654 Maple Dr, Downtown",
      "987 Cedar Ln, Uptown",
    ];

    const statuses: Driver["status"][] = ["active", "offline", "on break"];

    const numbers = [
      "+1 (555) 567-8901",
      "+1 (555) 567-8902",
      "+1 (555) 567-8903",
      "+1 (555) 567-8904",
      "+1 (555) 567-8905",
    ];

    const drivers: Driver[] = [];

    // Generate 50 drivers
    for (let i = 0; i < 50; i++) {
      const driverId = `6TRJ${String(244 + i).padStart(3, "0")}`;
      const name = names[Math.floor(Math.random() * names.length)];
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const number = numbers[Math.floor(Math.random() * numbers.length)];

      drivers.push({
        id: driverId,
        name,
        avatar: "",
        vehicle,
        location,
        status,
        number,
      });
    }

    return drivers;
  }

  /**
   * Filter drivers based on parameters
   */
  private filterDrivers(drivers: Driver[], params: DriversParams): Driver[] {
    let filtered = [...drivers];

    // Status filter
    if (params.statusFilter !== "all") {
      filtered = filtered.filter(
        (driver) => driver.status === params.statusFilter
      );
    }

    // Search query filter (search in name, vehicle, location, id, number)
    if (params.searchQuery && params.searchQuery.trim()) {
      const searchLower = params.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchLower) ||
          driver.vehicle.toLowerCase().includes(searchLower) ||
          driver.location.toLowerCase().includes(searchLower) ||
          driver.id.toLowerCase().includes(searchLower) ||
          driver.number.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }

  /**
   * Get drivers with filtering
   * This method simulates an API call and returns filtered drivers
   */
  async getDrivers(params: DriversParams): Promise<{
    drivers: Driver[];
    totalCount: number;
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allDrivers = this.generateMockDrivers();
    const filtered = this.filterDrivers(allDrivers, params);

    // Sort by name alphabetically
    return {
      drivers: filtered.sort((a, b) => a.name.localeCompare(b.name)),
      totalCount: allDrivers.length,
    };
  }
}

// Export singleton instance
export const driversService = new DriversService();

