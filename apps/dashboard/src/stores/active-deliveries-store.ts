import { create } from "zustand";

export type RegionFilter = "all" | "downtown" | "uptown";
export type DriverFilter = "all" | string;
export type FuelTypeFilter = "all" | "Diesel" | "Gasoline";
export type DateFilter = "all" | "today" | "week";

interface ActiveDeliveriesState {
  regionFilter: RegionFilter;
  driverFilter: DriverFilter;
  fuelTypeFilter: FuelTypeFilter;
  dateFilter: DateFilter;
  searchQuery: string;
  setRegionFilter: (region: RegionFilter) => void;
  setDriverFilter: (driver: DriverFilter) => void;
  setFuelTypeFilter: (fuelType: FuelTypeFilter) => void;
  setDateFilter: (date: DateFilter) => void;
  setSearchQuery: (query: string) => void;
}

export const useActiveDeliveriesStore = create<ActiveDeliveriesState>((set) => ({
  regionFilter: "all",
  driverFilter: "all",
  fuelTypeFilter: "all",
  dateFilter: "all",
  searchQuery: "",
  setRegionFilter: (regionFilter) => set({ regionFilter }),
  setDriverFilter: (driverFilter) => set({ driverFilter }),
  setFuelTypeFilter: (fuelTypeFilter) => set({ fuelTypeFilter }),
  setDateFilter: (dateFilter) => set({ dateFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

