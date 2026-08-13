import { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import ContactForm from '../components/ContactForm';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  // Simple intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      // Remove class initially if we want to trigger it on scroll
      el.classList.remove('animate-fade-up');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Hero />
      <Services />
      
      <section className="section text-center bg-color">
        <div className="container scroll-animate" style={{ opacity: 0 }}>
          <h2 style={{ marginBottom: 'var(--spacing-6)' }}>Modern Development. Real Engineering.</h2>
          <p className="text-body-lg" style={{ margin: '0 auto var(--spacing-12)', maxWidth: '800px' }}>
            We combine modern AI-assisted development tools with human engineering, architecture, testing and validation to create products that are not merely demos — they are built to work in the real world.
          </p>
          
          <div className="process-flow card" style={{ padding: 'var(--spacing-10) var(--spacing-6)' }}>
            <span style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <span>IDEA</span> 
              <ArrowRight size={20} color="var(--text-tertiary)" className="flow-arrow" /> 
              <span>PROTOTYPE</span> 
              <ArrowRight size={20} color="var(--text-tertiary)" className="flow-arrow" /> 
              <span>ARCHITECTURE</span> 
              <ArrowRight size={20} color="var(--text-tertiary)" className="flow-arrow" /> 
              <span>DEVELOPMENT</span> 
              <ArrowRight size={20} color="var(--text-tertiary)" className="flow-arrow" /> 
              <span>PRODUCTION</span>
            </span>
          </div>
        </div>
      </section>

      <Portfolio />
      <ContactForm />

      <style>{`
        @media (max-width: 768px) {
          .process-flow span {
            flex-direction: column;
            gap: var(--spacing-4) !important;
          }
          .flow-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}
