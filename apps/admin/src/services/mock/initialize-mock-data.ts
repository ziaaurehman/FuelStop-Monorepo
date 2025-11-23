/**
 * Initialize Mock Data
 *
 * Utility to initialize mock data for the MockApiService
 */

import { MockApiService } from "./mock-api.service";
import {
  orders,
  clients,
  drivers,
  invoices,
  members,
  scheduleData,
  payments,
} from "@/data";

/**
 * Initialize all mock data
 */
export function initializeMockData(mockService: MockApiService): void {
  // Initialize orders
  if (orders && Array.isArray(orders)) {
    mockService.initializeMockData("orders", orders);
  }

  // Initialize clients
  if (clients && Array.isArray(clients)) {
    mockService.initializeMockData("clients", clients);
  }

  // Initialize drivers
  if (drivers && Array.isArray(drivers)) {
    mockService.initializeMockData("drivers", drivers);
  }

  // Initialize invoices
  if (invoices && Array.isArray(invoices)) {
    mockService.initializeMockData("invoices", invoices);
  }

  // Initialize members
  if (members && Array.isArray(members)) {
    mockService.initializeMockData("members", members);
  }

  // Initialize delivery schedules (flatten the scheduleData object)
  if (scheduleData) {
    const allSchedules = Object.values(scheduleData).flat();
    if (allSchedules.length > 0) {
      mockService.initializeMockData("schedules", allSchedules);
    }
  }

  // Initialize payments
  if (payments && Array.isArray(payments)) {
    mockService.initializeMockData("payments", payments);
  }

  // Initialize notifications
  // if (notifications && Array.isArray(notifications)) {
  //   mockService.initializeMockData("notifications", notifications);
  // }

  // Add more mock data initializations as needed
}

/**
 * Create and initialize a MockApiService instance
 */
export function createMockApiService(): MockApiService {
  const mockService = new MockApiService({
    delay: 300,
  });

  initializeMockData(mockService);

  return mockService;
}
