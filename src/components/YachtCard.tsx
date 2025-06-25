import { Yacht } from "@/types/yacht";
import "./styles/YachtCard.css";

interface YachtCardProps {
  yacht: Yacht;
  onBookNow: (yacht: Yacht) => void;
}

export const YachtCard = ({ yacht, onBookNow }: YachtCardProps) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes("wifi"))
      return (
        <svg className="yacht-card-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 13a10 10 0 0 1 14 0"/>
          <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
          <path d="M12 20h.01"/>
        </svg>
      );
    if (
      feature.toLowerCase().includes("chef") ||
      feature.toLowerCase().includes("cocina")
    )
      return (
        <svg className="yacht-card-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6V13.87Z"/>
          <line x1="9" x2="9" y1="9" y2="21"/>
          <line x1="15" x2="15" y1="9" y2="21"/>
        </svg>
      );
    return (
      <svg className="yacht-card-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/>
        <path d="M2 14h6.5c1.2 0 2.3-.5 3-1.2L15 9"/>
        <path d="M22 14h-6.5c-1.2 0-2.3-.5-3-1.2L9 9"/>
      </svg>
    );
  };

  return (
    <div className="yacht-card">
      <div className="yacht-card-image-container">
        <img
          src={yacht.image}
          alt={yacht.name}
          className="yacht-card-image"
        />
        <div className="yacht-card-type-badge">
          {yacht.type}
        </div>
        <div className="yacht-card-rating-badge">
          <div className="yacht-card-rating">
            <svg className="yacht-card-rating-star" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="yacht-card-rating-text">{yacht.rating}</span>
            <span className="yacht-card-rating-count">({yacht.reviews})</span>
          </div>
        </div>
      </div>

      <div className="yacht-card-content">
        <div>
          <h3 className="yacht-card-title">
            {yacht.name}
          </h3>
          <div className="yacht-card-location">
            <svg className="yacht-card-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="yacht-card-location-text">{yacht.location}</span>
          </div>
        </div>

        <div className="yacht-card-specs">
          <div className="yacht-card-spec">
            <svg className="yacht-card-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Hasta {yacht.capacity} personas</span>
          </div>
          <div className="yacht-card-spec">
            <svg className="yacht-card-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
              <path d="M7.5 10.5L17 1"/>
              <path d="M10.5 7.5L23 20"/>
            </svg>
            <span>{yacht.length}m</span>
          </div>
        </div>

        <div className="yacht-card-features">
          <p className="yacht-card-features-title">
            Características:
          </p>
          <div className="yacht-card-features-list">
            {yacht.features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="yacht-card-feature"
              >
                {getFeatureIcon(feature)}
                <span>{feature}</span>
              </div>
            ))}
            {yacht.features.length > 3 && (
              <div className="yacht-card-feature-more">
                +{yacht.features.length - 3} más
              </div>
            )}
          </div>
        </div>

        <div className="yacht-card-pricing">
          <div>
            <span className="yacht-card-price">
              ${yacht.pricePerDay.toLocaleString()}
            </span>
            <span className="yacht-card-price-period">/ día</span>
          </div>
        </div>
      </div>

      <div className="yacht-card-footer">
        <button
          onClick={() => onBookNow(yacht)}
          className="yacht-card-book-button"
        >
          Reservar Ahora
        </button>
      </div>
    </div>
  );
};
