import "./styles/FeaturesSection.css";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Seguridad Garantizada",
      description:
        "Todos nuestros yates cumplen con los más altos estándares de seguridad marítima internacional",
      emoji: "🛡️",
    },
    {
      title: "Servicio Premium",
      description:
        "Equipo profesional disponible 24/7 para garantizar que tu experiencia sea perfecta",
      emoji: "⭐",
    },
    {
      title: "Flota Exclusiva",
      description:
        "Colección curada de los yates más lujosos y modernos del mercado",
      emoji: "🛥️",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">¿Por qué elegir LuxYacht?</h2>
          <p className="features-subtitle">
            Somos líderes en el sector de renta de yates de lujo, ofreciendo
            experiencias inolvidables
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">{feature.emoji}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
