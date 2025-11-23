import { create } from "zustand";

export type InvoiceStatusFilter = "all" | "draft" | "paid" | "overdue" | "offline";
export type TabType = "invoices" | "payments";

interface InvoicesState {
  activeTab: TabType;
  statusFilter: InvoiceStatusFilter;
  searchQuery: string;
  page: number;
  pageSize: number;
  setActiveTab: (tab: TabType) => void;
  setStatusFilter: (status: InvoiceStatusFilter) => void;
  setSearchQuery: (query: string) => void;
  setPagination: (page: number, pageSize: number) => void;
}

export const useInvoicesStore = create<InvoicesState>((set) => ({
  activeTab: "invoices",
  statusFilter: "all",
  searchQuery: "",
  page: 1,
  pageSize: 9,
  setActiveTab: (activeTab) => set({ activeTab }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setPagination: (page, pageSize) => set({ page, pageSize }),
}));

