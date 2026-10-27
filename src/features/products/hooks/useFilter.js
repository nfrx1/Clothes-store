import { create } from "zustand";

export const useFilter = create((set) => ({
  selectedCategory: "all",
  searchQuery: "",

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () => set({ selectedCategory: "all", searchQuery: "" }),
}));