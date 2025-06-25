"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Next.js App Router
import { SearchFilters as SearchFiltersType } from "@/types/yacht";
import "./styles/HeroSearchFilters.css";

interface HeroSearchFiltersProps {
  onSearch?: (filters: SearchFiltersType) => void;
}

export const HeroSearchFilters = ({ onSearch }: HeroSearchFiltersProps) => {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFiltersType>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: "",
    yachtType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    if (filters.location) searchParams.set("location", filters.location);
    if (filters.checkIn) searchParams.set("checkIn", filters.checkIn);
    if (filters.checkOut) searchParams.set("checkOut", filters.checkOut);
    if (filters.guests > 1) searchParams.set("guests", filters.guests.toString());
    if (filters.priceRange) searchParams.set("priceRange", filters.priceRange);
    if (filters.yachtType) searchParams.set("yachtType", filters.yachtType);

    // Usar router.push para redirigir
    router.push(`/yacht-search?${searchParams.toString()}`);

    if (onSearch) onSearch(filters);
  };

  const updateFilter = (key: keyof SearchFiltersType, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="search-filters-container">
      <form onSubmit={handleSubmit} className="search-filters-form">
        <div className="search-filters-grid">
          {/* Tus inputs exactamente igual, no necesitas cambiar nada aquí */}
          {/* ... */}
        </div>

        <div className="search-submit-container">
          <button type="submit" className="search-submit-button">
            <svg
              className="search-submit-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Buscar Yates
          </button>
        </div>
      </form>
    </div>
  );
};
