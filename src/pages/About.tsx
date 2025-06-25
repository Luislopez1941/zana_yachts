import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-page">
      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__background"></div>
        <div className="about-hero__overlay"></div>
        <div className="about-hero__content">
          <h1 className="about-hero__title">
            Navegando hacia la
            <span className="about-hero__title-accent"> Excelencia</span>
          </h1>
          <p className="about-hero__subtitle">
            Más de una década creando experiencias náuticas inolvidables en las
            aguas más hermosas del mundo
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title">Nuestra Historia</h2>
              <div className="story-text">
                <p>
                  LuxYacht nació en 2013 con un sueño simple pero ambicioso:
                  democratizar el acceso a experiencias náuticas de lujo. Desde
                  nuestros humildes comienzos con una pequeña flota de 3 yates
                  en Cancún, hemos crecido hasta convertirnos en la empresa
                  líder en renta de yates de lujo en México.
                </p>
                <p>
                  Nuestra pasión por el mar y el compromiso inquebrantable con
                  la excelencia en el servicio nos han permitido expandir
                  nuestra presencia a los destinos más exclusivos del Caribe
                  mexicano y el Pacífico.
                </p>
                <p>
                  Cada yate en nuestra flota es cuidadosamente seleccionado y
                  mantenido con los más altos estándares de calidad, seguridad y
                  lujo. Creemos que cada travesía debe ser una experiencia
                  transformadora que cree recuerdos para toda la vida.
                </p>
              </div>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
                alt="Luxury yacht at sunset"
                className="story-image__img"
              />
              <div className="story-image__badge">
                <div className="story-image__badge-year">2013</div>
                <div className="story-image__badge-text">Año de fundación</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="values-header">
            <h2 className="section-title">Nuestros Valores</h2>
            <p className="section-subtitle">
              Los principios que guían cada decisión y cada experiencia que
              creamos
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-card__icon">🛡️</div>
              <h3 className="value-card__title">Seguridad Primero</h3>
              <p className="value-card__description">
                La seguridad de nuestros huéspedes es nuestra prioridad
                absoluta. Todos nuestros yates cumplen y superan los estándares
                internacionales de seguridad marítima.
              </p>
            </div>

            <div className="value-card">
              <div className="value-card__icon">⭐</div>
              <h3 className="value-card__title">Excelencia en Servicio</h3>
              <p className="value-card__description">
                Cada detalle importa. Nuestro equipo está entrenado para
                anticipar y superar las expectativas, creando experiencias
                verdaderamente excepcionales.
              </p>
            </div>

            <div className="value-card">
              <div className="value-card__icon">🌊</div>
              <h3 className="value-card__title">Respeto al Océano</h3>
              <p className="value-card__description">
                Somos guardianes del mar. Operamos con prácticas sostenibles y
                educamos sobre la importancia de conservar nuestros ecosistemas
                marinos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <h2 className="section-title">Nuestro Equipo</h2>
            <p className="section-subtitle">
              Profesionales apasionados dedicados a hacer realidad tus sueños
              náuticos
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="team-member__image">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Carlos Hernández"
                  className="team-member__img"
                />
                <div className="team-member__badge">⚓</div>
              </div>
              <h3 className="team-member__name">Carlos Hernández</h3>
              <p className="team-member__role">Fundador & CEO</p>
              <p className="team-member__bio">
                Capitán certificado con más de 20 años de experiencia náutica.
                Visionario detrás de LuxYacht y apasionado del mar.
              </p>
            </div>

            <div className="team-member">
              <div className="team-member__image">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face"
                  alt="María González"
                  className="team-member__img"
                />
                <div className="team-member__badge">🎯</div>
              </div>
              <h3 className="team-member__name">María González</h3>
              <p className="team-member__role">Directora de Operaciones</p>
              <p className="team-member__bio">
                Especialista en hospitalidad de lujo. Garantiza que cada
                experiencia supere las expectativas más altas.
              </p>
            </div>

            <div className="team-member">
              <div className="team-member__image">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
                  alt="Roberto Silva"
                  className="team-member__img"
                />
                <div className="team-member__badge">🔧</div>
              </div>
              <h3 className="team-member__name">Roberto Silva</h3>
              <p className="team-member__role">Jefe de Mantenimiento</p>
              <p className="team-member__bio">
                Ingeniero naval responsable de mantener nuestra flota en
                perfectas condiciones de operación y seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-header">
            <h2 className="section-title text-white">LuxYacht en Números</h2>
            <p className="section-subtitle stats-subtitle">
              Una década de excelencia respaldada por resultados
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card__number">500+</div>
              <div className="stat-card__label">Clientes Felices</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">50+</div>
              <div className="stat-card__label">Yates en Flota</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">15+</div>
              <div className="stat-card__label">Destinos</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">4.9★</div>
              <div className="stat-card__label">Calificación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-content">
          <h2 className="section-title">Nuestra Misión</h2>
          <p className="mission-text">
            "Crear experiencias náuticas extraordinarias que conecten a las
            personas con la majestuosidad del océano, mientras preservamos y
            respetamos el ambiente marino para las futuras generaciones."
          </p>
          <div className="mission-divider"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
