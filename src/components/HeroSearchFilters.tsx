"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchFilters as SearchFiltersType } from "@/types/yacht";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Anchor,
  Search,
} from "lucide-react";

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
    if (filters.guests > 1)
      searchParams.set("guests", filters.guests.toString());
    if (filters.priceRange) searchParams.set("priceRange", filters.priceRange);
    if (filters.yachtType) searchParams.set("yachtType", filters.yachtType);

    router.push(`/yacht-search?${searchParams.toString()}`);

    // if (onSearch) onSearch(filters);
  };

  const updateFilter = (
    key: keyof SearchFiltersType,
    value: string | number,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="search-filters-container">
      <form onSubmit={handleSubmit}>
        <div className="search-filters-grid">
          {/* Location */}
          <div className="search-field">
            <label className="search-field-label">
              <MapPin />
              Destino
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              placeholder="Cancún, Ibiza, Miami..."
              className="search-field-input"
            />
          </div>

          {/* Check In */}
          <div className="search-field">
            <label className="search-field-label">
              <Calendar />
              Fecha de inicio
            </label>
            <input
              type="date"
              value={filters.checkIn}
              onChange={(e) => updateFilter("checkIn", e.target.value)}
              className="search-field-input"
            />
          </div>

          {/* Check Out */}
          <div className="search-field">
            <label className="search-field-label">
              <Calendar />
              Fecha de fin
            </label>
            <input
              type="date"
              value={filters.checkOut}
              onChange={(e) => updateFilter("checkOut", e.target.value)}
              className="search-field-input"
            />
          </div>

          {/* Guests */}
          <div className="search-field">
            <label className="search-field-label">
              <Users />
              Huéspedes
            </label>
            <select
              value={filters.guests}
              onChange={(e) =>
                updateFilter("guests", parseInt(e.target.value))
              }
              className="search-field-select"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "huésped" : "huéspedes"}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="search-field">
            <label className="search-field-label">
              <DollarSign />
              Precio por día
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => updateFilter("priceRange", e.target.value)}
              className="search-field-select"
            >
              <option value="">Cualquier precio</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000+">$10,000+</option>
            </select>
          </div>

          {/* Yacht Type */}
          <div className="search-field">
            <label className="search-field-label">
              <Anchor />
              Tipo de yate
            </label>
            <select
              value={filters.yachtType}
              onChange={(e) => updateFilter("yachtType", e.target.value)}
              className="search-field-select"
            >
              <option value="">Todos los tipos</option>
              <option value="motor">Yate a Motor</option>
              <option value="sailing">Velero</option>
              <option value="catamaran">Catamarán</option>
              <option value="luxury">Yate de Lujo</option>
              <option value="sport">Yate Deportivo</option>
            </select>
          </div>
        </div>

        <div className="search-submit-container">
          <button type="submit" className="search-submit-button">
            <Search />
            Buscar Yates
          </button>
        </div>
      </form>
    </div>
  );
};
