import { HeroSearchFilters } from "./HeroSearchFilters";
import { SearchFilters as SearchFiltersType } from "@/types/yacht";
import "./styles/HeroSection.css";

interface HeroSectionProps {
  onSearch?: (filters: SearchFiltersType) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const scrollToResults = () => {
    const resultsSection = document.getElementById("yacht-results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (filters: SearchFiltersType) => {
    if (onSearch) {
      onSearch(filters);
      scrollToResults();
    }
  };

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Renta el Yate de tus{" "}
          <span className="hero-title-gradient">
            Sueños
          </span>
        </h1>
        <p className="hero-subtitle">
          Experimenta el lujo y la elegancia navegando en las aguas más hermosas
          del mundo
        </p>

        {/* Search Filters */}
        <HeroSearchFilters onSearch={handleSearch} />
      </div>

    
    </section>
  );
};
