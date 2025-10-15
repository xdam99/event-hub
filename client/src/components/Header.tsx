import React, { useState, useEffect } from 'react';

import "./Header.css";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Événements', href: '/events' },
    { label: 'Mes billets', href: '/tickets' },
    { label: 'Organisateur', href: '/organizer' },
    { label: 'Support', href: '/support' }
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${className}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="/" className="logo">
            <div className="logo-icon">
              
            </div>
            <span className="logo-text">EventHub</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav">
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
            <a href="/create-event" className="cta-button">
              <span>Créer un événement</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="/create-event" 
              className="mobile-cta-button"
              onClick={closeMobileMenu}
            >
              Créer un événement
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;