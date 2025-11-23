import type { Order } from "@/data/orders";
import type { OrderStatusFilter } from "@/components/pages/orders/order-status-tabs";
import type {
  OrderPriorityFilter,
  OrderQuantityFilter,
  OrderLocationFilter,
} from "@/components/pages/orders/order-filters";

export interface OrdersParams {
  statusFilter: OrderStatusFilter;
  priorityFilter: OrderPriorityFilter;
  quantityFilter: OrderQuantityFilter;
  locationFilter: OrderLocationFilter;
  searchQuery?: string;
}

/**
 * Mock data generator for orders
 * In production, this would be replaced with actual API calls
 */
class OrdersService {
  /**
   * Generate mock orders data
   */
  private generateMockOrders(): Order[] {
    const clients = [
      "Metro Gas Station",
      "City Fuel Center",
      "Highway Express",
      "Downtown Fuel Depot",
      "Uptown Gas & Go",
      "Riverside Station",
      "Main Street Fuel",
      "Parkway Gas",
      "Central Station",
      "Northside Fuel",
    ];

    const drivers = [
      { name: "Jacob Jones", avatar: "" },
      { name: "Albert Flores", avatar: "" },
      { name: "Theresa Webb", avatar: "" },
      { name: "Robert Fox", avatar: "" },
      { name: "Jane Smith", avatar: "" },
      { name: "John Doe", avatar: "" },
      { name: "Dianne Russell", avatar: "" },
      { name: "Savannah Nguyen", avatar: "" },
    ];

    const statuses: Order["status"][] = [
      "delivered",
      "in transit",
      "pending",
      "scheduled",
    ];

    const priorities: Order["priority"][] = ["high", "medium", "low"];

    const locations = ["downtown", "uptown"];

    const orders: Order[] = [];

    // Generate 50 orders
    for (let i = 0; i < 50; i++) {
      const orderId = `#ORD-${String(98745 + i).padStart(5, "0")}`;
      const client = clients[Math.floor(Math.random() * clients.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const address = `${Math.floor(Math.random() * 9999) + 1} Main St, ${
        location === "downtown" ? "Downtown" : "Uptown"
      }`;
      const gallons = Math.floor(Math.random() * 600) + 50; // 50-650 gallons
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];
      const driver = drivers[Math.floor(Math.random() * drivers.length)];

      // Generate dates within the last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      date.setHours(hours, minutes, 0, 0);

      orders.push({
        id: orderId,
        client,
        address,
        gallons,
        status,
        driver,
        date: date.toISOString(),
        priority,
      });
    }

    return orders;
  }

  /**
   * Filter orders based on parameters
   */
  private filterOrders(orders: Order[], params: OrdersParams): Order[] {
    let filtered = [...orders];

    // Status filter
    if (params.statusFilter !== "all") {
      filtered = filtered.filter((order) => {
        if (params.statusFilter === "in transit") {
          return (
            order.status === "in transit" ||
            order.status === "pending" ||
            order.status === "scheduled"
          );
        }
        if (params.statusFilter === "delivered") {
          return order.status === "delivered";
        }
        return false;
      });
    }

    // Priority filter
    if (params.priorityFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.priority === params.priorityFilter
      );
    }

    // Quantity filter
    if (params.quantityFilter !== "all") {
      filtered = filtered.filter((order) => {
        const gallons = order.gallons;
        if (params.quantityFilter === "0-200") {
          return gallons >= 0 && gallons <= 200;
        }
        if (params.quantityFilter === "200-400") {
          return gallons > 200 && gallons <= 400;
        }
        if (params.quantityFilter === "400+") {
          return gallons > 400;
        }
        return true;
      });
    }

    // Location filter (extract from address)
    if (params.locationFilter !== "all") {
      filtered = filtered.filter((order) => {
        const addressLower = order.address.toLowerCase();
        if (params.locationFilter === "downtown") {
          return addressLower.includes("downtown");
        }
        if (params.locationFilter === "uptown") {
          return addressLower.includes("uptown");
        }
        return true;
      });
    }

    // Search query filter (search in client name and address)
    if (params.searchQuery && params.searchQuery.trim()) {
      const searchLower = params.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (order) =>
          order.client.toLowerCase().includes(searchLower) ||
          order.address.toLowerCase().includes(searchLower) ||
          order.id.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }

  /**
   * Get orders with filtering
   * This method simulates an API call and returns filtered orders
   */
  async getOrders(params: OrdersParams): Promise<{
    orders: Order[];
    totalCount: number;
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allOrders = this.generateMockOrders();
    const filtered = this.filterOrders(allOrders, params);

    // Sort by date (most recent first)
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    return {
      orders: sorted,
      totalCount: allOrders.length,
    };
  }
}

// Export singleton instance
export const ordersService = new OrdersService();

