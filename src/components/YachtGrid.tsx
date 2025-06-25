import { YachtCard } from "./YachtCard";
import { Yacht } from "@/types/yacht";
import "./styles/YachtGrid.css";

interface YachtGridProps {
  yachts: Yacht[];
  hasSearched: boolean;
  onBookNow: (yacht: Yacht) => void;
  onClearSearch: () => void;
  onShowAllYachts: () => void;
}

export const YachtGrid = ({
  yachts,
  hasSearched,
  onBookNow,
  onClearSearch,
  onShowAllYachts,
}: YachtGridProps) => {
  return (
    <section id="yacht-results" className="yacht-grid-section">
      <div className="yacht-grid-container">
        <div className="yacht-grid-header">
          <div className="yacht-grid-header-content">
            <h2 className="yacht-grid-title">
              {hasSearched
                ? "Resultados de Búsqueda"
                : "Nuestra Flota Exclusiva"}
            </h2>
            <p className="yacht-grid-subtitle">
              {hasSearched
                ? `${yachts.length} yates encontrados`
                : "Descubre nuestra colección de yates de lujo"}
            </p>
          </div>

          {hasSearched && (
            <button
              onClick={onClearSearch}
              className="yacht-grid-clear-button"
            >
              <svg className="yacht-grid-clear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
              Limpiar búsqueda
            </button>
          )}
        </div>

        {yachts.length > 0 ? (
          <div className="yacht-grid">
            {yachts.map((yacht) => (
              <YachtCard key={yacht.id} yacht={yacht} onBookNow={onBookNow} />
            ))}
          </div>
        ) : (
          <div className="yacht-grid-no-results">
            <div className="yacht-grid-no-results-icon-container">
              <svg className="yacht-grid-no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16v6"/>
                <circle cx="12" cy="10" r="8"/>
                <path d="M8 12h8"/>
              </svg>
            </div>
            <h3 className="yacht-grid-no-results-title">
              No se encontraron yates
            </h3>
            <p className="yacht-grid-no-results-subtitle">
              Intenta ajustar tus filtros de búsqueda para encontrar más
              opciones
            </p>
            <button
              onClick={onShowAllYachts}
              className="yacht-grid-show-all-button"
            >
              Ver Todos los Yates
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
