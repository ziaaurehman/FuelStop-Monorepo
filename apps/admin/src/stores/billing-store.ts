import { create } from "zustand";

type BillingTab = "invoices" | "payments" | "reports";

interface BillingStore {
  activeTab: BillingTab;
  setActiveTab: (tab: BillingTab) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  // Invoice filters
  invoiceStatusFilter: string;
  setInvoiceStatusFilter: (status: string) => void;
  invoiceSearchQuery: string;
  setInvoiceSearchQuery: (query: string) => void;
  invoicePage: number;
  invoicePageSize: number;
  setInvoicePagination: (page: number, pageSize: number) => void;
  // Payment filters
  paymentStatusFilter: string;
  setPaymentStatusFilter: (status: string) => void;
  paymentSearchQuery: string;
  setPaymentSearchQuery: (query: string) => void;
  paymentPage: number;
  paymentPageSize: number;
  setPaymentPagination: (page: number, pageSize: number) => void;
}

export const useBillingStore = create<BillingStore>((set) => ({
  activeTab: "invoices",
  setActiveTab: (tab) => set({ activeTab: tab }),
  timeRange: "12",
  setTimeRange: (range) => set({ timeRange: range }),
  // Invoice filters
  invoiceStatusFilter: "all",
  setInvoiceStatusFilter: (status) => set({ invoiceStatusFilter: status }),
  invoiceSearchQuery: "",
  setInvoiceSearchQuery: (query) => set({ invoiceSearchQuery: query }),
  invoicePage: 1,
  invoicePageSize: 10,
  setInvoicePagination: (page, pageSize) =>
    set({ invoicePage: page, invoicePageSize: pageSize }),
  // Payment filters
  paymentStatusFilter: "all",
  setPaymentStatusFilter: (status) => set({ paymentStatusFilter: status }),
  paymentSearchQuery: "",
  setPaymentSearchQuery: (query) => set({ paymentSearchQuery: query }),
  paymentPage: 1,
  paymentPageSize: 10,
  setPaymentPagination: (page, pageSize) =>
    set({ paymentPage: page, paymentPageSize: pageSize }),
}));
