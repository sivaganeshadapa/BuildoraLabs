import { useEffect, useState } from 'react';
import { getServices } from '../lib/supabase/queries';
import type { Database } from '../lib/supabase/types';
import { Monitor, Code, Rocket, Database as DbIcon, Layout, Bot, ArrowRight } from 'lucide-react';

type Service = Database['public']['Tables']['services']['Row'];

const iconMap: Record<string, any> = {
  Monitor, Code, Rocket, Database: DbIcon, Layout, Bot
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="section bg-secondary">
      <div className="container">
        <div className="text-center mb-lg animate-fade-up">
          <h2>More Than Just a Website</h2>
          <p style={{ margin: '0 auto' }}>
            We provide full-lifecycle digital product development from strategy to deployment and scaling.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card skeleton skeleton-card"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center" style={{ padding: 'var(--spacing-10) 0' }}>
            <h3>Services are currently unavailable.</h3>
            <p>Please try again later.</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center" style={{ padding: 'var(--spacing-10) 0' }}>
            <h3>Services are being updated.</h3>
            <p>New capabilities will appear here soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3">
            {services.map((service, idx) => {
              const Icon = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Code;
              return (
                <div key={service.id} className="card animate-fade-up" style={{ animationDelay: (idx * 0.1) + 's' }}>
                  <div style={{ marginBottom: 'var(--spacing-4)', color: 'var(--text-primary)' }}>
                    <Icon size={32} />
                  </div>
                  <h3>{service.title}</h3>
                  <p className="text-body-sm">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 'auto', paddingTop: 'var(--spacing-4)' }}>
                      {service.features.map((feature, i) => (
                        <li key={i} style={{ 
                          fontSize: '0.875rem', 
                          color: 'var(--text-secondary)',
                          marginBottom: 'var(--spacing-2)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--spacing-2)'
                        }}>
                          <span style={{ color: 'var(--accent-color)', lineHeight: 1.5 }}>•</span> 
                          <span style={{ lineHeight: 1.5 }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-xl animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <a href="#contact" className="btn btn-secondary">
            Discuss Your Project <ArrowRight size={16} style={{ marginLeft: 'var(--spacing-2)' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
