/**
 * Mock service for invoices and payments data
 * Provides mock data with simulated API delay
 */

export type InvoiceStatus = "draft" | "paid" | "overdue" | "offline";
export type PaymentStatus = "completed" | "pending" | "failed";

/**
 * Invoice data
 */
export interface Invoice {
  id: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

/**
 * Payment data
 */
export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  status: PaymentStatus;
  paymentDate: string;
  paymentMethod: string;
}

/**
 * Invoices response
 */
export interface InvoicesResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Payments response
 */
export interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Simulate API delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate mock invoices
 */
function generateInvoices(count: number = 50): Invoice[] {
  const statuses: InvoiceStatus[] = ["draft", "paid", "overdue", "offline"];
  const invoices: Invoice[] = [];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 5000) + 1000;
    const issueDate = new Date();
    issueDate.setDate(issueDate.getDate() - Math.floor(Math.random() * 60));
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30);

    invoices.push({
      id: `INV-${String(i + 29).padStart(4, "0")}`,
      amount,
      status,
      issueDate: issueDate.toISOString(),
      dueDate: dueDate.toISOString(),
    });
  }

  return invoices;
}

/**
 * Generate mock payments
 */
function generatePayments(invoices: Invoice[]): Payment[] {
  const statuses: PaymentStatus[] = ["completed", "pending", "failed"];
  const paymentMethods = ["Credit Card", "Bank Transfer", "Check", "Cash"];
  const payments: Payment[] = [];

  // Generate payments for paid invoices
  invoices
    .filter((inv) => inv.status === "paid")
    .forEach((invoice) => {
      const paymentDate = new Date(invoice.dueDate);
      paymentDate.setDate(paymentDate.getDate() - Math.floor(Math.random() * 10));

      payments.push({
        id: `PAY-${String(payments.length + 1).padStart(4, "0")}`,
        invoiceId: invoice.id,
        amount: invoice.amount,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        paymentDate: paymentDate.toISOString(),
        paymentMethod:
          paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      });
    });

  return payments;
}

/**
 * Filter invoices by status and search query
 */
function filterInvoices(
  invoices: Invoice[],
  statusFilter: "all" | InvoiceStatus,
  searchQuery: string
): Invoice[] {
  let filtered = invoices;

  // Filter by status
  if (statusFilter !== "all") {
    filtered = filtered.filter((invoice) => invoice.status === statusFilter);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((invoice) =>
      invoice.id.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Filter payments by status and search query
 */
function filterPayments(
  payments: Payment[],
  statusFilter: "all" | PaymentStatus,
  searchQuery: string
): Payment[] {
  let filtered = payments;

  // Filter by status
  if (statusFilter !== "all") {
    filtered = filtered.filter((payment) => payment.status === statusFilter);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (payment) =>
        payment.id.toLowerCase().includes(query) ||
        payment.invoiceId.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Fetch invoices with simulated API delay
 */
export async function getInvoices(
  statusFilter: "all" | InvoiceStatus = "all",
  searchQuery: string = "",
  page: number = 1,
  pageSize: number = 9
): Promise<InvoicesResponse> {
  // Simulate API delay (500-1000ms)
  const delayMs = Math.floor(Math.random() * 500) + 500;
  await delay(delayMs);

  // Generate mock invoices
  const allInvoices = generateInvoices(50);

  // Filter invoices
  const filteredInvoices = filterInvoices(allInvoices, statusFilter, searchQuery);

  // Paginate
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInvoices.length / pageSize);

  return {
    invoices: paginatedInvoices,
    total: filteredInvoices.length,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Fetch payments with simulated API delay
 */
export async function getPayments(
  statusFilter: "all" | PaymentStatus = "all",
  searchQuery: string = "",
  page: number = 1,
  pageSize: number = 9
): Promise<PaymentsResponse> {
  // Simulate API delay (500-1000ms)
  const delayMs = Math.floor(Math.random() * 500) + 500;
  await delay(delayMs);

  // Generate mock invoices first (to create payments from)
  const allInvoices = generateInvoices(50);

  // Generate payments
  const allPayments = generatePayments(allInvoices);

  // Filter payments
  const filteredPayments = filterPayments(
    allPayments,
    statusFilter,
    searchQuery
  );

  // Paginate
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPayments.length / pageSize);

  return {
    payments: paginatedPayments,
    total: filteredPayments.length,
    page,
    pageSize,
    totalPages,
  };
}

