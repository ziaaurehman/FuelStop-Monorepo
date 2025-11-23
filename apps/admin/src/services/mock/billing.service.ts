import { Invoice, Payment } from "@/data";
import { MockApiService } from "./mock-api.service";

/**
 * Mock service for billing-related API calls.
 * Provides mock data for invoices and payments with filtering and pagination.
 */
class BillingService extends MockApiService {
  private invoices: Invoice[] = [];
  private payments: Payment[] = [];

  constructor() {
    super();
    this.initializeData();
  }

  /**
   * Initialize mock data for invoices and payments.
   */
  private initializeData() {
    // Generate mock invoices
    const invoiceStatuses: Invoice["status"][] = [
      "draft",
      "paid",
      "overdue",
      "offline",
    ];
    const clients = [
      "Metro Gas Station",
      "City Fuel Center",
      "Highway Express",
      "Quick Stop Fuel",
      "Premium Gas Co",
    ];

    for (let i = 1; i <= 50; i++) {
      const issueDate = new Date();
      issueDate.setDate(issueDate.getDate() - Math.floor(Math.random() * 90));
      const dueDate = new Date(issueDate);
      dueDate.setDate(dueDate.getDate() + 30);

      this.invoices.push({
        id: `INV-${String(i).padStart(4, "0")}`,
        amount: Math.floor(Math.random() * 5000) + 1000,
        status: invoiceStatuses[
          Math.floor(Math.random() * invoiceStatuses.length)
        ] as Invoice["status"],
        client: clients[Math.floor(Math.random() * clients.length)],
        issueDate: issueDate.toISOString(),
        dueDate: dueDate.toISOString(),
      });
    }

    // Generate mock payments
    const paymentStatuses: Payment["status"][] = ["draft", "paid", "overdue"];
    const methods = ["Bank Transfer", "Credit Card", "Cash", "Check"];

    for (let i = 1; i <= 50; i++) {
      const invoice =
        this.invoices[Math.floor(Math.random() * this.invoices.length)];
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() - Math.floor(Math.random() * 90));

      this.payments.push({
        id: `P-${String(i).padStart(4, "0")}`,
        invoiceId: invoice.id,
        client: invoice.client,
        amount: invoice.amount,
        method: methods[Math.floor(Math.random() * methods.length)],
        dueDate: dueDate.toISOString(),
        status: paymentStatuses[
          Math.floor(Math.random() * paymentStatuses.length)
        ] as Payment["status"],
      });
    }
  }

  /**
   * Get invoices with filtering, search, and pagination.
   */
  async getInvoices(params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ invoices: Invoice[]; totalCount: number }> {
    await this.simulateDelay();

    let filtered = [...this.invoices];

    // Filter by status
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((invoice) => invoice.status === params.status);
    }

    // Search
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (invoice) =>
          invoice.id.toLowerCase().includes(searchLower) ||
          invoice.client.toLowerCase().includes(searchLower) ||
          invoice.amount.toString().includes(searchLower)
      );
    }

    const totalCount = filtered.length;

    // Pagination
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    filtered = filtered.slice(start, end);

    return {
      invoices: filtered,
      totalCount,
    };
  }

  /**
   * Get payments with filtering, search, and pagination.
   */
  async getPayments(params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ payments: Payment[]; totalCount: number }> {
    await this.simulateDelay();

    let filtered = [...this.payments];

    // Filter by status
    if (params.status && params.status !== "all") {
      filtered = filtered.filter((payment) => payment.status === params.status);
    }

    // Search
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (payment) =>
          payment.id.toLowerCase().includes(searchLower) ||
          payment.invoiceId.toLowerCase().includes(searchLower) ||
          payment.client.toLowerCase().includes(searchLower) ||
          payment.amount.toString().includes(searchLower)
      );
    }

    const totalCount = filtered.length;

    // Pagination
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    filtered = filtered.slice(start, end);

    return {
      payments: filtered,
      totalCount,
    };
  }
}

export const billingService = new BillingService();
