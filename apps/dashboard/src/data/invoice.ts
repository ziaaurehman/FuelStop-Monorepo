// Invoice data types
export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id: string;
  balanceDue: number;
  dueDate: string;
  status: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  terms: string;
  items: InvoiceItem[];
  subtotal: number;
  notes: {
    paymentTo: string;
    bank: string;
    accountNo: string;
    swift: string;
  };
}

// Sample invoice data
export const sampleInvoice: InvoiceData = {
  id: "INV-0029",
  balanceDue: 5920.0,
  dueDate: "28 Aug 2025",
  status: "Overdue",
  clientName: "Royal Parvej",
  clientAddress: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  clientEmail: "hi.rooyal@gmail.com",
  terms: "Due on Receipt",
  items: [
    {
      description: "Item name goes here",
      quantity: 1.0,
      rate: 5920,
      amount: 5920.0,
    },
  ],
  subtotal: 5920.0,
  notes: {
    paymentTo: "Please make payment to:",
    bank: "XYZ Bank",
    accountNo: "123456789",
    swift: "XYZBDDH",
  },
};

// Multiple invoice samples
export const invoicesPayment: InvoiceData[] = [
  sampleInvoice,
  {
    id: "INV-0030",
    balanceDue: 3450.0,
    dueDate: "15 Sep 2025",
    status: "Pending",
    clientName: "Sarah Johnson",
    clientAddress: "456 Oak Avenue, New York, NY 10001",
    clientEmail: "sarah.j@example.com",
    terms: "Net 30",
    items: [
      {
        description: "Professional Services",
        quantity: 1.0,
        rate: 3450,
        amount: 3450.0,
      },
    ],
    subtotal: 3450.0,
    notes: {
      paymentTo: "Please make payment to:",
      bank: "ABC Bank",
      accountNo: "987654321",
      swift: "ABCBDDH",
    },
  },
  {
    id: "INV-0031",
    balanceDue: 7200.0,
    dueDate: "30 Aug 2025",
    status: "Overdue",
    clientName: "Tech Solutions Inc",
    clientAddress: "789 Tech Park, San Francisco, CA 94105",
    clientEmail: "billing@techsolutions.com",
    terms: "Due on Receipt",
    items: [
      {
        description: "Software Development",
        quantity: 2.0,
        rate: 3600,
        amount: 7200.0,
      },
    ],
    subtotal: 7200.0,
    notes: {
      paymentTo: "Please make payment to:",
      bank: "Tech Bank",
      accountNo: "555666777",
      swift: "TECHDDH",
    },
  },
];
