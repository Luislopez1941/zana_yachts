'use client'

import { useState, useEffect } from "react";
import "./styles/SearchFilters.css";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  isCollapsed?: boolean;
  initialFilters?: SearchFilters;
}

interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: string;
  yachtType: string;
}

const SearchFilters = ({
  onSearch,
  isCollapsed = false,
  initialFilters,
}: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: "",
    yachtType: "",
  });

  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleInputChange = (
    field: keyof SearchFilters,
    value: string | number,
  ) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
    // Scroll to results on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const resultsSection = document.getElementById("yacht-results");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      priceRange: "",
      yachtType: "",
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.location ||
      filters.checkIn ||
      filters.checkOut ||
      filters.guests > 1 ||
      filters.priceRange ||
      filters.yachtType
    );
  };

  return (
    <div className="search-filters">
      {/* Mobile toggle header for collapsed state */}
      {isCollapsed && (
        <div className="search-filters__mobile-header">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="search-filters__toggle"
          >
            <div className="search-filters__toggle-content">
              <div className="search-filters__toggle-icon">
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 18a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="search-filters__toggle-label">
                Filtros de Búsqueda
              </span>
              {hasActiveFilters() && (
                <span className="badge badge-gold">Activos</span>
              )}
            </div>
            <svg
              className={`search-filters__chevron ${isExpanded ? "search-filters__chevron--expanded" : ""}`}
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Desktop header for collapsed state */}
      {isCollapsed && (
        <div className="search-filters__desktop-header">
          <div className="search-filters__header-content">
            <div className="search-filters__toggle-icon">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM3 18a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="search-filters__header-label">Editar Filtros</span>
            {hasActiveFilters() && (
              <span className="badge badge-gold">Filtros Activos</span>
            )}
          </div>
        </div>
      )}

      {/* Filters content */}
      <div
        className={`search-filters__content ${isCollapsed && !isExpanded ? "search-filters__content--collapsed" : ""}`}
      >
        <div className="search-filters__grid">
          {/* Location */}
          <div className="search-filters__field search-filters__field--location">
            <label className="form-label">Destino</label>
            <div className="search-filters__input-wrapper">
              <svg
                className="search-filters__input-icon"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="Cancún, Puerto Vallarta..."
                value={filters.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="form-input search-filters__input--with-icon"
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="search-filters__field">
            <label className="form-label">Fecha de Inicio</label>
            <input
              type="date"
              value={filters.checkIn}
              onChange={(e) => handleInputChange("checkIn", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="form-input"
            />
          </div>

          {/* Check-out */}
          <div className="search-filters__field">
            <label className="form-label">Fecha de Fin</label>
            <input
              type="date"
              value={filters.checkOut}
              onChange={(e) => handleInputChange("checkOut", e.target.value)}
              min={filters.checkIn || new Date().toISOString().split("T")[0]}
              className="form-input"
            />
          </div>

          {/* Guests */}
          <div className="search-filters__field">
            <label className="form-label">Huéspedes</label>
            <select
              value={filters.guests}
              onChange={(e) =>
                handleInputChange("guests", parseInt(e.target.value))
              }
              className="form-select"
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "persona" : "personas"}
                </option>
              ))}
            </select>
          </div>

          {/* Yacht Type */}
          <div className="search-filters__field">
            <label className="form-label">Tipo de Yate</label>
            <select
              value={filters.yachtType}
              onChange={(e) => handleInputChange("yachtType", e.target.value)}
              className="form-select"
            >
              <option value="">Todos</option>
              <option value="motor">Motor</option>
              <option value="sailing">Velero</option>
              <option value="catamaran">Catamarán</option>
              <option value="mega">Mega Yate</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="search-filters__field">
            <label className="form-label">Precio por Día</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
              className="form-select"
            >
              <option value="">Cualquier precio</option>
              <option value="0-5000">$0 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-20000">$10,000 - $20,000</option>
              <option value="20000+">$20,000+</option>
            </select>
          </div>
        </div>

        <div className="search-filters__actions">
          <button onClick={handleSearch} className="btn btn-primary">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>Buscar Yates</span>
          </button>

          {hasActiveFilters() && (
            <button onClick={clearFilters} className="btn btn-secondary">
              Limpiar Filtros
            </button>
          )}
        </div>

        {/* Active filters display */}
        {hasActiveFilters() && (
          <div className="search-filters__active">
            <span className="search-filters__active-label">
              Filtros activos:
            </span>
            <div className="search-filters__active-list">
              {filters.location && (
                <span className="badge badge-primary search-filters__active-badge">
                  📍 {filters.location}
                  <button
                    onClick={() => handleInputChange("location", "")}
                    className="search-filters__remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.checkIn && (
                <span className="badge badge-primary search-filters__active-badge">
                  📅 {new Date(filters.checkIn).toLocaleDateString("es-ES")}
                  <button
                    onClick={() => handleInputChange("checkIn", "")}
                    className="search-filters__remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.checkOut && (
                <span className="badge badge-primary search-filters__active-badge">
                  📆 {new Date(filters.checkOut).toLocaleDateString("es-ES")}
                  <button
                    onClick={() => handleInputChange("checkOut", "")}
                    className="search-filters__remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.guests > 1 && (
                <span className="badge badge-primary search-filters__active-badge">
                  👥 {filters.guests} personas
                  <button
                    onClick={() => handleInputChange("guests", 1)}
                    className="search-filters__remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.yachtType && (
                <span className="badge badge-primary search-filters__active-badge">
                  🛥️ {filters.yachtType}
                  <button
                    onClick={() => handleInputChange("yachtType", "")}
                    className="search-filters__remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.priceRange && (
                <span className="badge badge-primary search-filters__active-badge">
                  💰 ${filters.priceRange}
                  <button
                    onClick={() => handleInputChange("priceRange", "")}
                    className="search-filters__remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
