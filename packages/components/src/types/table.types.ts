import { LucideIcon } from "lucide-react";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface TableConfig<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchKey?: string;
  onRowClick?: (row: TData) => void;
}

export interface ColumnMetadata {
  icon?: LucideIcon;
  iconColor?: string;
  badge?: boolean;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  format?: (value: unknown) => string;
  colorMap?: Record<string, string>;
  priority?: boolean;
  hidden?: boolean;
  sortable?: boolean;
  filterable?: boolean;
}

export interface ActionItem<TData = unknown> {
  label: string;
  icon?: LucideIcon;
  onClick: (row: TData) => void;
  variant?: "default" | "edit" | "delete" | "view" | "download" | "assign";
  separator?: boolean;
  mobileNode?: ReactNode;
  renderAsButton?: (row: TData) => ReactNode;
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showExport?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: TData) => void;
  loading?: boolean;
  emptyMessage?: string;
  expandableContent?: (row: TData) => React.ReactNode;
  mobileColumns?: string[];
  mobileVisibleColumns?: string[];
  initialColumnFilters?: Array<{ id: string; value: unknown }>;
  onSearchChange?: (value: string) => void;
  onExport?: (table: Table<TData>) => void;
  initialPagination?: { pageIndex?: number; pageSize?: number };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
}
