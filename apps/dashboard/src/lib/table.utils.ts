import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Export table data to CSV
export function exportToCSV<TData extends Record<string, unknown>>(
  data: TData[],
  filename: string = "export.csv"
) {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values that contain commas or quotes
          const stringValue = String(value ?? "");
          if (stringValue.includes(",") || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Format date
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return d.toLocaleDateString("en-US", options);
}

// Get status color
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    delivered: "text-green-700 bg-green-50 border-green-200",
    "in transit": "text-blue-700 bg-blue-50 border-blue-200",
    pending: "text-orange-700 bg-orange-50 border-orange-200",
    scheduled: "text-purple-700 bg-purple-50 border-purple-200",
    cancelled: "text-red-700 bg-red-50 border-red-200",
  };
  return (
    statusColors[status.toLowerCase()] ||
    "text-gray-700 bg-gray-50 border-gray-200"
  );
}

// Get priority color
export function getPriorityColor(priority: string): string {
  const priorityColors: Record<string, string> = {
    high: "text-red-700 bg-red-50 border-red-200",
    medium: "text-orange-700 bg-orange-50 border-orange-200",
    low: "text-gray-700 bg-gray-50 border-gray-200",
  };
  return (
    priorityColors[priority.toLowerCase()] ||
    "text-gray-700 bg-gray-50 border-gray-200"
  );
}
