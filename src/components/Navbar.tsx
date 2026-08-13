import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Technology', href: '#technology' },
    { name: 'Process', href: '#process' }
  ];

  return (
    <>
      <header 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled ? 'var(--spacing-3) 0' : 'var(--spacing-6) 0',
          backgroundColor: isScrolled ? 'rgba(3, 3, 3, 0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <a href="#" style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-primary)', textDecoration: 'none' }}>
            BUILDORA
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex" style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                style={{ 
                  color: 'var(--text-secondary)', 
                  textDecoration: 'none', 
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" style={{ padding: '8px 24px', minHeight: '40px', fontSize: '0.875rem' }}>
              Start a Project
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: 'none', border: 'none', color: 'var(--text-primary)',
              padding: '8px', zIndex: 1001, cursor: 'pointer' 
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'var(--bg-color)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'var(--spacing-6)'
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', alignItems: 'center' }}>
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none', 
                    fontSize: '2rem',
                    fontWeight: 500,
                  }}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: 'var(--spacing-8)' }}
              >
                Start a Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
