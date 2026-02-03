"use client";

import { useState, useEffect, useMemo } from "react";
import { PartsFilters } from "./parts-filters";
import { PartCard } from "./part-card";
import { PartTable } from "./part-table";
import { PartGrid } from "./part-grid";
import { Pagination } from "./pagination";
import type { Part, ViewMode, ComputedPrice } from "@/lib/types";
import { calculatePrice } from "@/lib/price-calculator";

interface PartsCatalogProps {
  parts: Part[];
  categories: string[];
}

const ITEMS_PER_PAGE = 12;

export function PartsCatalog({ parts, categories }: PartsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("none");
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [currentPage, setCurrentPage] = useState(1);

  // Load preferences from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem("fleetparts-viewmode");
    const savedState = localStorage.getItem("fleetparts-state");
    if (savedViewMode) setViewMode(savedViewMode as ViewMode);
    if (savedState) setSelectedState(savedState);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("fleetparts-viewmode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("fleetparts-state", selectedState);
  }, [selectedState]);

  // Get all available states from parts
  const availableStates = useMemo(() => {
    const states = new Set<string>();
    parts.forEach((part) => {
      part.statePricing?.forEach((sp) => states.add(sp.stateCode));
    });
    return Array.from(states).sort();
  }, [parts]);

  // Filter parts
  const filteredParts = useMemo(() => {
    let result = parts;

    if (selectedCategory !== "all") {
      result = result.filter((part) => part.category === selectedCategory);
    }

    return result;
  }, [parts, selectedCategory]);

  // Paginate
  const totalPages = Math.ceil(filteredParts.length / ITEMS_PER_PAGE);
  const paginatedParts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredParts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredParts, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedState]);

  // Price calculation helper
  const getPriceForPart = (part: Part): ComputedPrice | null => {
    if (selectedState === "none") return null;
    return calculatePrice(part, selectedState);
  };

  return (
    <div className="space-y-6">
      <PartsFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        availableStates={availableStates}
      />

      {filteredParts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-muted-foreground">No parts found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <>
          {viewMode === "cards" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedParts.map((part) => (
                <PartCard
                  key={part._id}
                  part={part}
                  price={getPriceForPart(part)}
                />
              ))}
            </div>
          )}

          {viewMode === "table" && (
            <PartTable parts={paginatedParts} getPriceForPart={getPriceForPart} />
          )}

          {viewMode === "grid" && (
            <PartGrid parts={paginatedParts} getPriceForPart={getPriceForPart} />
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
