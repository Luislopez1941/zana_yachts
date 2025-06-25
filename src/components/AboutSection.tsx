import "./styles/AboutSection.css";

export const AboutSection = () => {
  const stats = [
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "50+", label: "Yates en Flota" },
  ];

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">
              Más de 10 años creando experiencias únicas
            </h2>
            <p className="about-text">
              En LuxYacht, nos especializamos en ofrecer experiencias de
              navegación de lujo que superan las expectativas. Nuestra pasión
              por el mar y el servicio excepcional nos ha convertido en la
              opción preferida para quienes buscan lo mejor.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat">
                  <div className="about-stat-number">
                    {stat.number}
                  </div>
                  <div className="about-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="about-button">
              Conoce Más
            </button>
          </div>

          <div className="about-image-container">
            <img
              src="https://images.unsplash.com/photo-1566024287286-457247b70310?w=600&h=400&fit=crop"
              alt="Luxury yacht experience"
              className="about-image"
            />
            <div className="about-rating-badge">
              <div className="about-rating-number">4.9★</div>
              <div className="about-rating-text">Calificación promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
