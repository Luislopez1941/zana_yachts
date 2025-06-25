'use client'

import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Mensaje enviado! Te contactaremos pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="contact-page">
      <Header />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Contáctanos</h1>
          <p className="contact-hero__subtitle">
            Estamos aquí para hacer realidad tus sueños náuticos. Ponte en
            contacto con nosotros.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="contact-form-card">
                <h2 className="contact-form__title">Envíanos un Mensaje</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="form-input"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="form-input"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="form-input"
                        placeholder="+52 (999) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Asunto</label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        className="form-select"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="reserva">Consulta de Reserva</option>
                        <option value="informacion">Información General</option>
                        <option value="evento">Eventos Especiales</option>
                        <option value="corporativo">
                          Servicios Corporativos
                        </option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mensaje *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="form-textarea"
                      placeholder="Cuéntanos sobre tu evento ideal, fechas preferidas, número de huéspedes..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-full contact-form__submit"
                  >
                    {isSubmitting ? (
                      <span className="submit-loading">
                        <div className="spinner"></div>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar Mensaje"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              {/* Office Locations */}
              <div className="contact-info-card">
                <h3 className="contact-info__title">Nuestras Oficinas</h3>
                <div className="contact-offices">
                  <div className="contact-office">
                    <h4 className="contact-office__name">
                      🏢 Oficina Principal - Cancún
                    </h4>
                    <p className="contact-office__address">
                      Marina Puerto Cancún
                      <br />
                      Boulevard Kukulcán Km 1.5
                      <br />
                      Zona Hotelera, Cancún, Q.R. 77500
                    </p>
                  </div>
                  <div className="contact-office">
                    <h4 className="contact-office__name">
                      🏢 Sucursal - Puerto Vallarta
                    </h4>
                    <p className="contact-office__address">
                      Marina Vallarta
                      <br />
                      Paseo de la Marina Sur 214
                      <br />
                      Marina Vallarta, Puerto Vallarta, Jal. 48354
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="contact-info-card">
                <h3 className="contact-info__title">Información de Contacto</h3>
                <div className="contact-details">
                  <div className="contact-detail">
                    <div className="contact-detail__icon">📞</div>
                    <div className="contact-detail__content">
                      <p className="contact-detail__label">Teléfonos</p>
                      <p className="contact-detail__text">
                        Cancún: +52 (998) 123-4567
                        <br />
                        Puerto Vallarta: +52 (322) 765-4321
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail__icon">📧</div>
                    <div className="contact-detail__content">
                      <p className="contact-detail__label">Email</p>
                      <p className="contact-detail__text">
                        reservas@luxyacht.com
                        <br />
                        info@luxyacht.com
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail__icon">🕒</div>
                    <div className="contact-detail__content">
                      <p className="contact-detail__label">Horarios</p>
                      <p className="contact-detail__text">
                        Lun - Vie: 8:00 AM - 8:00 PM
                        <br />
                        Sáb - Dom: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail__icon">📱</div>
                    <div className="contact-detail__content">
                      <p className="contact-detail__label">WhatsApp</p>
                      <p className="contact-detail__text">+52 (998) 765-4321</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="emergency-contact">
                <h3 className="emergency-contact__title">
                  🚨 Contacto de Emergencia 24/7
                </h3>
                <p className="emergency-contact__description">
                  Para emergencias durante su travesía:
                </p>
                <p className="emergency-contact__phone">
                  +52 (998) 911-YACHT (92248)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-subtitle">
              Encuentra respuestas a las consultas más comunes
            </p>
          </div>

          <div className="faq-list">
            <details className="faq-item">
              <summary className="faq-question">
                ¿Con cuánta anticipación debo reservar?
              </summary>
              <p className="faq-answer">
                Recomendamos reservar con al menos 2-3 semanas de anticipación,
                especialmente durante temporada alta (diciembre-abril). Para
                eventos especiales o grupos grandes, sugerimos 1-2 meses.
              </p>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                ¿Qué incluye el precio de renta?
              </summary>
              <p className="faq-answer">
                El precio incluye el yate completamente equipado, tripulación
                profesional, combustible para uso normal, equipo de seguridad,
                sistema de sonido, y limpieza final. No incluye comida, bebidas,
                ni actividades adicionales.
              </p>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                ¿Puedo cancelar mi reserva?
              </summary>
              <p className="faq-answer">
                Sí, ofrecemos cancelación gratuita hasta 48 horas antes de la
                fecha programada. Para cancelaciones dentro de las 48 horas, se
                aplica un cargo del 50% del total.
              </p>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                ¿Qué pasa si hay mal tiempo?
              </summary>
              <p className="faq-answer">
                La seguridad es nuestra prioridad. Si las condiciones climáticas
                no son seguras, ofrecemos reprogramar sin costo adicional o
                reembolso completo.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-header">
            <h2 className="section-title">Ubicaciones</h2>
            <p className="section-subtitle">
              Encuéntranos en los destinos más exclusivos
            </p>
          </div>

          <div className="map-placeholder">
            <div className="map-placeholder__content">
              <div className="map-placeholder__icon">🗺️</div>
              <h3 className="map-placeholder__title">Mapa Interactivo</h3>
              <p className="map-placeholder__description">
                Aquí se integraría un mapa de Google Maps mostrando nuestras
                ubicaciones
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
