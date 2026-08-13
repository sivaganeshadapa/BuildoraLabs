export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-24)', paddingBottom: 'var(--spacing-10)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-10)' }}>
            
            {/* Brand */}
            <div style={{ gridColumn: '1 / -1', marginBottom: 'var(--spacing-6)' }}>
              <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: 'var(--spacing-2)' }}>BUILDORA LABS</h2>
              <p className="text-body-sm" style={{ maxWidth: '300px' }}>
                Transforming ideas into digital reality. A premium digital product engineering studio.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-4)' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <li><a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Services</a></li>
                <li><a href="#work" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Work</a></li>
                <li><a href="#process" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Process</a></li>
                <li><a href="#technology" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Technology</a></li>
                <li><a href="#about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>About</a></li>
                <li><a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Contact</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-4)' }}>Connect</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>LinkedIn</a></li>
                <li><a href="https://github.com/sivaganeshadapa" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>GitHub</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-4)' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Privacy Policy</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}>Terms of Service</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div style={{ 
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 'var(--spacing-6)', borderTop: '1px solid var(--border-color)',
            fontSize: '0.875rem', color: 'var(--text-tertiary)'
          }}>
            <p>&copy; {new Date().getFullYear()} Buildora Labs. All rights reserved.</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Engineered with <span style={{ color: 'var(--text-secondary)' }}>precision</span>
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
