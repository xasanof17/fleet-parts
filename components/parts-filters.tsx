"use client";

import { LayoutGrid, LayoutList, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ViewMode } from "@/lib/types";
import { CATEGORY_LABELS, STATE_NAMES } from "@/lib/types";

interface PartsFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  availableStates: string[];
}

export function PartsFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedState,
  onStateChange,
  viewMode,
  onViewModeChange,
  availableStates,
}: PartsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {CATEGORY_LABELS[category] || category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedState} onValueChange={onStateChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No State Selected</SelectItem>
            {availableStates.map((state) => (
              <SelectItem key={state} value={state}>
                {STATE_NAMES[state] || state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-border p-1">
        <Button
          variant={viewMode === "cards" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("cards")}
          className="h-8 w-8 p-0"
        >
          <LayoutList className="h-4 w-4" />
          <span className="sr-only">Card view</span>
        </Button>
        <Button
          variant={viewMode === "table" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("table")}
          className="h-8 w-8 p-0"
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="sr-only">Table view</span>
        </Button>
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className="h-8 w-8 p-0"
        >
          <Grid3X3 className="h-4 w-4" />
          <span className="sr-only">Grid view</span>
        </Button>
      </div>
    </div>
  );
}
