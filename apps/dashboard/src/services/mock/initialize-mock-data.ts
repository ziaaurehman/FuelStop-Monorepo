/**
 * Initialize Mock Data
 *
 * Utility to initialize mock data for the MockApiService
 */

import { MockApiService } from "./mock-api.service";
import { orders, invoices } from "@/data";

/**
 * Initialize all mock data
 */
export function initializeMockData(mockService: MockApiService): void {
  // Initialize orders
  if (orders && Array.isArray(orders)) {
    mockService.initializeMockData("orders", orders);
  }

  // Initialize invoices
  if (invoices && Array.isArray(invoices)) {
    mockService.initializeMockData("invoices", invoices);
  }

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

