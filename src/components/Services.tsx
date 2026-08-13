import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getServices } from '../lib/supabase/queries';
import type { Database } from '../lib/supabase/types';
import { Monitor, Code, Rocket, Database as DbIcon, Layout, Bot, ArrowRight, Shield, Cloud } from 'lucide-react';
import { fadeUp } from '../lib/animations';

type Service = Database['public']['Tables']['services']['Row'];

const iconMap: Record<string, any> = {
  Monitor, Code, Rocket, Database: DbIcon, Layout, Bot, Shield, Cloud
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Studio Intro */}
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="display" style={{ marginBottom: 'var(--spacing-8)' }}>We build more than websites.</h2>
            <p className="text-body-lg" style={{ margin: '0 auto var(--spacing-12)', maxWidth: '900px' }}>
              Buildora Labs helps startups, businesses, creators and ambitious founders turn ideas into functional digital products.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-6)' }}>
              {['WEB APPS', 'MVPs', 'AI', 'DATABASES', 'CLOUD', 'SECURITY', 'SUPPORT'].map((tag, i) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  style={{ 
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
                    fontWeight: 600, 
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services System */}
      <section id="services" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-8)', position: 'relative', zIndex: 10 }}>
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="card skeleton skeleton-card" style={{ height: '300px' }}></div>
              ))
            ) : (
              services.map((service, idx) => {
                const Icon = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Code;
                // Add staggered vertical parallax to cards
                const y = idx % 2 === 0 ? y1 : y2;
                
                return (
                  <motion.div 
                    key={service.id} 
                    className="card glass"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    custom={idx}
                    style={typeof window !== 'undefined' && window.innerWidth > 768 ? { y } : {}}
                  >
                    <div style={{ marginBottom: 'var(--spacing-6)', color: 'var(--text-primary)' }}>
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ marginBottom: 'var(--spacing-4)' }}>{service.title}</h3>
                    <p className="text-body-sm">{service.description}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <ul style={{ listStyle: 'none', padding: 0, marginTop: 'var(--spacing-6)' }}>
                        {service.features.map((feature, i) => (
                          <li key={i} style={{ 
                            fontSize: '0.875rem', 
                            color: 'var(--text-secondary)',
                            marginBottom: 'var(--spacing-2)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 'var(--spacing-3)'
                          }}>
                            <span style={{ color: 'var(--accent-color)', opacity: 0.5 }}>—</span> 
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-xl" 
            style={{ position: 'relative', zIndex: 10 }}
          >
            <a href="#contact" className="btn btn-secondary glass">
              Discuss Your Project <ArrowRight size={18} style={{ marginLeft: 'var(--spacing-2)' }} />
            </a>
          </motion.div>
        </div>
        
        {/* Background ambient glow */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          width: '80vw', height: '80vw', maxWidth: '800px', maxHeight: '800px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none'
        }} />
      </section>

      {/* Engineered Pipeline */}
      <section className="section bg-secondary" style={{ overflow: 'hidden' }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-xl"
          >
            <h2 className="display">Modern development.<br/>Real engineering.</h2>
            <p className="text-body-lg" style={{ margin: '0 auto', maxWidth: '800px' }}>
              We use modern AI-assisted workflows to prototype quickly. But architecture, validation, security, and production decisions remain strictly engineering responsibilities.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            {['IDEA', 'AI PROTOTYPE', 'ENGINEERING', 'TESTING', 'SECURITY', 'DEPLOYMENT', 'SUPPORT'].map((step, idx, arr) => (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}
              >
                <div style={{ 
                  padding: 'var(--spacing-3) var(--spacing-6)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-color)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em'
                }}>
                  {step}
                </div>
                {idx !== arr.length - 1 && (
                  <ArrowRight size={20} color="var(--text-tertiary)" className="hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
