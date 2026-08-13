import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getFeaturedProjects } from '../lib/supabase/queries';
import type { Database } from '../lib/supabase/types';
import { ExternalLink, Code } from 'lucide-react';
import { fadeUp } from '../lib/animations';

type Project = Database['public']['Tables']['projects']['Row'];

function BrowserFrame({ url, children }: { url: string, children: React.ReactNode }) {
  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-secondary)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Chrome Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '12px 16px',
        borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)', gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <div style={{
          flex: 1, backgroundColor: 'var(--bg-secondary)', padding: '4px 12px',
          borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center'
        }}>
          {url}
        </div>
      </div>
      {/* Content area (Usually an iframe or image, but we'll use a placeholder for now since we don't have the screenshots) */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate horizontal scroll for desktop
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getFeaturedProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="work" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Header */}
      <div className="container" style={{ paddingTop: 'var(--spacing-24)', paddingBottom: 'var(--spacing-16)' }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="display" style={{ marginBottom: 'var(--spacing-4)' }}>Work that actually works.</h2>
          <p className="text-body-lg">Real products we've designed and built.</p>
        </motion.div>
      </div>

      {loading ? (
        <div className="container pb-24">
          <div className="grid grid-cols-2">
            {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: '500px' }} />)}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Horizontal Scroll */}
          <div className="hidden md:block" ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <motion.div style={{ x, display: 'flex', gap: 'var(--spacing-10)', padding: '0 var(--spacing-6)' }}>
                {projects.map((project, idx) => (
                  <div key={project.id} style={{ width: '80vw', maxWidth: '1000px', height: '70vh', flexShrink: 0 }}>
                    <div className="grid grid-cols-2" style={{ height: '100%', gap: 'var(--spacing-10)' }}>
                      
                      {/* Project Details */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 'var(--spacing-4)' }}>
                          {String(idx + 1).padStart(2, '0')} — {project.category}
                        </div>
                        <h3 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{project.title}</h3>
                        <p className="text-body-lg" style={{ marginTop: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
                          {project.description}
                        </p>
                        
                        {project.technologies && (
                          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', marginBottom: 'var(--spacing-8)' }}>
                            {project.technologies.map(tech => (
                              <span key={tech} style={{ border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.875rem' }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
                            View Live Product <ExternalLink size={18} style={{ marginLeft: '8px' }} />
                          </a>
                        )}
                      </div>

                      {/* Browser Mockup */}
                      <div style={{ height: '100%', padding: 'var(--spacing-4) 0' }}>
                        <BrowserFrame url={project.live_url || 'https://buildoralabs.com'}>
                          <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: 'var(--spacing-6)' }}>
                            <Code size={48} style={{ margin: '0 auto var(--spacing-4)', opacity: 0.2 }} />
                            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{project.title}</p>
                            <p style={{ fontSize: '0.875rem' }}>Live Interface Preview</p>
                          </div>
                        </BrowserFrame>
                      </div>

                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile Vertical Stack */}
          <div className="md:hidden container pb-24" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 'var(--spacing-2)' }}>
                  {String(idx + 1).padStart(2, '0')} — {project.category}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-4)' }}>{project.title}</h3>
                
                <div style={{ height: '300px', marginBottom: 'var(--spacing-6)' }}>
                  <BrowserFrame url={project.live_url || 'https://buildoralabs.com'}>
                     <div style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: 'var(--spacing-6)' }}>
                        <Code size={40} style={{ margin: '0 auto var(--spacing-4)', opacity: 0.2 }} />
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>{project.title}</p>
                      </div>
                  </BrowserFrame>
                </div>

                <p className="text-body-sm" style={{ marginBottom: 'var(--spacing-4)' }}>{project.description}</p>
                
                {project.technologies && (
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', marginBottom: 'var(--spacing-6)' }}>
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} style={{ border: '1px solid var(--border-color)', padding: '2px 10px', borderRadius: '99px', fontSize: '0.75rem' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
                    View Live <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}

      <style>{`
        .md\\:hidden { display: none; }
        .hidden { display: none; }
        @media (min-width: 768px) {
          .md\\:hidden { display: none !important; }
          .hidden.md\\:block { display: block !important; }
        }
        @media (max-width: 767px) {
          .md\\:hidden { display: flex !important; }
          .hidden.md\\:block { display: none !important; }
        }
      `}</style>
    </section>
  );
}
