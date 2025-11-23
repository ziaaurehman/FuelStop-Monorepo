import type { Client } from "@/data/clients";
import type { ClientStatusFilter } from "@/components/pages/clients/client-status-tabs";

export interface ClientsParams {
  statusFilter: ClientStatusFilter;
  searchQuery?: string;
}

/**
 * Mock data generator for clients
 * In production, this would be replaced with actual API calls
 */
class ClientsService {
  /**
   * Generate mock clients data
   */
  private generateMockClients(): Client[] {
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

    const companies = [
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

    const statuses: Client["status"][] = ["active", "offline", "on break"];

    const phoneNumbers = [
      "(207) 555-0119",
      "(270) 555-0117",
      "(303) 555-0105",
      "(302) 555-0107",
      "(702) 555-0122",
      "(316) 555-0116",
      "(201) 555-0124",
      "(671) 555-0110",
      "(225) 555-0118",
      "(684) 555-0102",
    ];

    const clients: Client[] = [];

    // Generate 50 clients
    for (let i = 0; i < 50; i++) {
      const clientId = `C-${String(1 + i).padStart(3, "0")}`;
      const name = names[Math.floor(Math.random() * names.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const email = `client${i + 1}@${company.toLowerCase().replace(/\s+/g, "")}.com`;
      const phone =
        phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // Generate random receivables and unused credits
      const receivables = `$${(Math.random() * 10000).toFixed(2)}`;
      const unusedCredits = `$${(Math.random() * 5000).toFixed(2)}`;

      clients.push({
        id: clientId,
        name,
        company,
        email,
        phone,
        receivables,
        unusedCredits,
        status,
        avatar: "",
      });
    }

    return clients;
  }

  /**
   * Filter clients based on parameters
   */
  private filterClients(clients: Client[], params: ClientsParams): Client[] {
    let filtered = [...clients];

    // Status filter
    if (params.statusFilter !== "all") {
      filtered = filtered.filter(
        (client) => client.status === params.statusFilter
      );
    }

    // Search query filter (search in name, company, email, phone, id)
    if (params.searchQuery && params.searchQuery.trim()) {
      const searchLower = params.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchLower) ||
          client.company.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower) ||
          client.phone.toLowerCase().includes(searchLower) ||
          client.id.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }

  /**
   * Get clients with filtering
   * This method simulates an API call and returns filtered clients
   */
  async getClients(params: ClientsParams): Promise<{
    clients: Client[];
    totalCount: number;
  }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allClients = this.generateMockClients();
    const filtered = this.filterClients(allClients, params);

    // Sort by name alphabetically
    return {
      clients: filtered.sort((a, b) => a.name.localeCompare(b.name)),
      totalCount: allClients.length,
    };
  }
}

// Export singleton instance
export const clientsService = new ClientsService();
