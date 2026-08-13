import { useEffect, useState } from 'react';
import { getFeaturedProjects } from '../lib/supabase/queries';
import type { Database } from '../lib/supabase/types';
import { ArrowRight, ExternalLink } from 'lucide-react';

type Project = Database['public']['Tables']['projects']['Row'];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getFeaturedProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="text-center mb-lg animate-fade-up">
          <h2>Built. Shipped. Working.</h2>
          <p style={{ margin: '0 auto' }}>A selection of real products and projects we've built.</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2">
            {[1, 2].map(i => (
              <div key={i} className="card skeleton skeleton-card" style={{ height: '500px' }}></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center" style={{ padding: 'var(--spacing-10) 0' }}>
            <h3>Portfolio is currently unavailable.</h3>
            <p>Please try again later.</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center" style={{ padding: 'var(--spacing-10) 0' }}>
            <h3>Projects are being updated.</h3>
            <p>New work will appear here soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            {projects.map((project, idx) => (
              <div key={project.id} className="card animate-fade-up" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', animationDelay: (idx * 0.1) + 's' }}>
                
                {/* Project Image Placeholder / Preview */}
                <div style={{ 
                  width: '100%', 
                  aspectRatio: '16/9', 
                  backgroundColor: 'var(--bg-tertiary)',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {project.image_url ? (
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                      {/* Generates a simple placeholder showing the domain if live_url exists */}
                      {project.live_url ? new URL(project.live_url).hostname : 'Project Preview'}
                    </div>
                  )}
                </div>

                <div style={{ padding: 'var(--spacing-6)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-4)' }}>
                    <h3 style={{ marginBottom: 0 }}>{project.title}</h3>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', padding: '4px' }} aria-label={'Visit ' + project.title + ' live site'}>
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 'var(--spacing-2)' }}>
                    {project.short_description}
                  </p>
                  <p className="text-body-sm" style={{ marginBottom: 'var(--spacing-6)' }}>
                    {project.description}
                  </p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div style={{ marginBottom: 'var(--spacing-6)' }}>
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tag">{tech}</span>
                      ))}
                    </div>
                  )}

                  {project.live_url && (
                    <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-4)', borderTop: '1px solid var(--border-color)' }}>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full">
                        View Live Project <ArrowRight size={16} style={{ marginLeft: 'var(--spacing-2)' }} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a href="#contact" className="btn btn-primary">
            Build Something Similar <ArrowRight size={16} style={{ marginLeft: 'var(--spacing-2)' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
