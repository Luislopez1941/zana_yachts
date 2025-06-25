import Link from 'next/link';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Company Info */}
          <div className="footer__section footer__section--main">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v4l6 2v11h6V9l6-2V3h-6v4l-6 2V3z" />
                </svg>
              </div>
              <span className="footer__brand">LuxYacht</span>
            </div>
            <p className="footer__description">
              Ofrecemos la experiencia más exclusiva en renta de yates de lujo.
              Navega con estilo y elegancia en las aguas más hermosas del mundo.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link">
                {/* Twitter */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775...Z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link">
                {/* Facebook */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69...Z" />
                </svg>
              </a>
              <a href="#" className="footer__social-link">
                {/* LinkedIn */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367...Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h3 className="footer__title">Enlaces Rápidos</h3>
            <div className="footer__links">
              <Link href="/" className="footer__link">Inicio</Link>
              <Link href="/reservations" className="footer__link">Mis Reservas</Link>
              <Link href="/about" className="footer__link">Nosotros</Link>
              <a href="#fleet" className="footer__link">Nuestra Flota</a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer__section">
            <h3 className="footer__title">Contacto</h3>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998..." />
                </svg>
                <span>info@luxyacht.com</span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0..." clipRule="evenodd" />
                </svg>
                <span>+52 (998) 123-4567</span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.54 22.351l..." clipRule="evenodd" />
                </svg>
                <span>Puerto Vallarta, México</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 LuxYacht. Todos los derechos reservados.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Términos de Servicio</a>
            <a href="#" className="footer__legal-link">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
