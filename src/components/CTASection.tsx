import "./styles/CTASection.css";

export const CTASection = () => {
  const handleViewAvailability = () => {
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactNow = () => {
    // This would typically open a contact modal or navigate to contact page
    alert("¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.");
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="cta-subtitle">
            Reserva ahora y vive una experiencia inolvidable en el mar
          </p>

          <div className="cta-actions">
            <button
              onClick={handleViewAvailability}
              className="cta-button-primary"
            >
              Ver Disponibilidad
            </button>
            <button
              onClick={handleContactNow}
              className="cta-button-secondary"
            >
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
