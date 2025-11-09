// Invoice type
export type Invoice = {
  id: string;
  amount: number;
  status: "draft" | "paid" | "overdue" | "offline";
  issueDate: string;
  dueDate: string;
};

// Invoice status colors helper
export const getInvoiceStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "text-green-600 bg-green-50 border-green-200";
    case "draft":
      return "text-gray-600 bg-gray-50 border-gray-200";
    case "overdue":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "offline":
      return "text-slate-600 bg-slate-50 border-slate-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

// Dummy invoices data
export const invoices: Invoice[] = [
  {
    id: "INV-0029",
    amount: 2929.0,
    status: "draft",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0030",
    amount: 2929.0,
    status: "paid",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0031",
    amount: 2929.0,
    status: "paid",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0032",
    amount: 2929.0,
    status: "paid",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0033",
    amount: 2929.0,
    status: "paid",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0034",
    amount: 2929.0,
    status: "paid",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0035",
    amount: 2929.0,
    status: "overdue",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0036",
    amount: 2929.0,
    status: "overdue",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0037",
    amount: 2929.0,
    status: "overdue",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0038",
    amount: 2929.0,
    status: "offline",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0039",
    amount: 2929.0,
    status: "offline",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0040",
    amount: 2929.0,
    status: "offline",
    issueDate: "2025-01-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0041",
    amount: 3450.0,
    status: "paid",
    issueDate: "2025-01-20T00:00:00",
    dueDate: "2025-02-20T00:00:00",
  },
  {
    id: "INV-0042",
    amount: 1850.0,
    status: "draft",
    issueDate: "2025-01-22T00:00:00",
    dueDate: "2025-02-22T00:00:00",
  },
  {
    id: "INV-0043",
    amount: 4200.0,
    status: "overdue",
    issueDate: "2024-12-15T00:00:00",
    dueDate: "2025-01-15T00:00:00",
  },
  {
    id: "INV-0044",
    amount: 2100.0,
    status: "paid",
    issueDate: "2025-01-10T00:00:00",
    dueDate: "2025-02-10T00:00:00",
  },
  {
    id: "INV-0045",
    amount: 5600.0,
    status: "offline",
    issueDate: "2025-01-18T00:00:00",
    dueDate: "2025-02-18T00:00:00",
  },
  {
    id: "INV-0046",
    amount: 3200.0,
    status: "paid",
    issueDate: "2025-01-25T00:00:00",
    dueDate: "2025-02-25T00:00:00",
  },
];
