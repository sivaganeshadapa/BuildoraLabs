import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: 'var(--spacing-16) 0 var(--spacing-8)', backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-16)' }}>
          <div className="mb-lg" style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ marginBottom: 'var(--spacing-6)', color: 'var(--text-primary)' }}>Studio.</h3>
            <p className="text-body-sm" style={{ maxWidth: '400px' }}>
              We design and build practical digital products that help businesses launch, operate and grow.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }} className="text-body-sm">
              <li><Link to="#about">About</Link></li>
              <li><Link to="#services">Services</Link></li>
              <li><Link to="#work">Projects</Link></li>
              <li><Link to="#process">Process</Link></li>
              <li><Link to="#contact">Contact</Link></li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>Technologies</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }} className="text-body-sm">
              <li>React & Next.js</li>
              <li>Node.js</li>
              <li>PostgreSQL</li>
              <li>Supabase</li>
              <li>Gemini AI</li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>Connect</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }} className="text-body-sm">
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:hello@studio.com">Email</a></li>
              <li><a href="#">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: 'var(--spacing-6)', 
          borderTop: '1px solid var(--border-color)', 
          color: 'var(--text-secondary)' 
        }}>
          <p className="text-body-sm" style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Studio. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 'var(--spacing-6)' }} className="text-body-sm">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (min-width: 1024px) {
          .grid > div:first-child {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 640px) {
          .footer-bottom {
            flex-direction: column;
            gap: var(--spacing-4);
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
