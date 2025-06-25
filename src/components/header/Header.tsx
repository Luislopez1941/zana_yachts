'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Anchor } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/about-us', label: 'Nosotros' },
    { href: '/contact', label: 'Contacto' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="logo">
            <Anchor size={24} />
            <span className="logo-text">LuxYacht</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Buttons Container - Desktop */}
          <div className="buttons-container">
            <Link href="/reservations" className="login-btn-reservations">
              Mis Reservas
            </Link>
            <Link href="/login" className="login-btn-login">
              Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-item ${isActive(item.href) ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <div className="mobile-buttons-container">
            <Link
              href="/mis-reservas"
              className="mobile-reservations-btn"
              onClick={closeMenu}
            >
              Mis Reservas
            </Link>
            <Link
              href="/login"
              className="mobile-login-btn"
              onClick={closeMenu}
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
