export type Payment = {
  id: string;
  invoiceId: string;
  client: string;
  amount: number;
  method: string;
  dueDate: string;
  status: "draft" | "paid" | "overdue";
};

// ---------- STATUS COLORS ----------
export const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "text-green-600 bg-green-50 border-green-200";
    case "draft":
      return "text-gray-600 bg-gray-50 border-gray-200";
    case "overdue":
      return "text-orange-600 bg-orange-50 border-orange-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

// ---------- DUMMY DATA ----------
export const payments: Payment[] = [
  {
    id: "P-0029",
    invoiceId: "INV-0029",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "draft",
  },
  {
    id: "P-0030",
    invoiceId: "INV-0030",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "paid",
  },
  {
    id: "P-0031",
    invoiceId: "INV-0031",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "paid",
  },
  {
    id: "P-0032",
    invoiceId: "INV-0032",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "paid",
  },
  {
    id: "P-0033",
    invoiceId: "INV-0033",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "paid",
  },
  {
    id: "P-0034",
    invoiceId: "INV-0034",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "paid",
  },
  {
    id: "P-0035",
    invoiceId: "INV-0035",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "overdue",
  },
  {
    id: "P-0036",
    invoiceId: "INV-0036",
    client: "Metro Gas Station",
    amount: 2929.0,
    method: "Bank Transfer",
    dueDate: "2025-01-15T00:00:00",
    status: "overdue",
  },
];
