import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Services', path: '#services' },
    { name: 'Work', path: '#work' },
    { name: 'Process', path: '#process' },
    { name: 'Technology', path: '#technology' },
    { name: 'About', path: '#about' },
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--spacing-4) 0',
      borderBottom: '1px solid var(--border-color)',
      marginBottom: 'var(--spacing-10)',
      position: 'relative',
      zIndex: 50,
      backgroundColor: 'var(--bg-color)'
    }} className="container">
      
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', zIndex: 51 }}>
        Studio.
      </Link>
      
      {/* Desktop Navigation */}
      <div style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map((link) => (
          <a key={link.name} href={link.path} style={{ fontWeight: 500, fontSize: '0.95rem' }}>
            {link.name}
          </a>
        ))}
      </div>

      <div style={{ display: 'none', alignItems: 'center' }} className="desktop-nav">
        <a href="#contact" className="btn btn-primary">
          Start a Project
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          zIndex: 51,
          padding: 'var(--spacing-2)'
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--spacing-8)',
          zIndex: 50,
          padding: 'var(--spacing-6)'
        }}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path} 
              style={{ fontSize: '1.5rem', fontWeight: 600 }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn btn-primary w-full" 
            style={{ maxWidth: '300px', marginTop: 'var(--spacing-4)' }}
            onClick={() => setIsOpen(false)}
          >
            Start a Project
          </a>
        </div>
      )}

      {/* Embedded CSS for desktop/mobile toggling to avoid polluting global css */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
