import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getFeaturedProjects } from '../lib/supabase/queries';
import type { Database } from '../lib/supabase/types';
import { ExternalLink, Code, ChevronLeft, ChevronRight } from 'lucide-react';

type Project = Database['public']['Tables']['projects']['Row'];

function BrowserFrame({ url, children }: { url: string, children: React.ReactNode }) {
  return (
    <div className="border border-[#333] rounded-xl overflow-hidden bg-[#101010] h-full flex flex-col relative z-0">
      {/* Chrome Top Bar */}
      <div className="flex items-center px-4 py-3 border-b border-[#333] bg-[#0a0a0a] gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 bg-[#1a1a1a] px-3 py-1 rounded text-xs text-gray-500 text-center truncate">
          {url}
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden group">
        {/* Invisible overlay to prevent iframe scroll intercepting unless clicked */}
        <div className="absolute inset-0 z-10 bg-transparent group-hover:pointer-events-none transition-all"></div>
        {children}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -window.innerWidth * 0.7, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: window.innerWidth * 0.7, behavior: 'smooth' });
    }
  };

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
    <section id="work" className="bg-black text-[#E1E0CC]">
      <div className="max-w-[1600px] mx-auto px-6 pt-24 pb-8 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-4 text-[#E1E0CC]">Work that actually works.</h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light">Real products we've engineered.</p>
        </motion.div>
        
        {/* Desktop Carousel Controls */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:flex gap-4 pb-2"
          >
            <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#111] hover:border-gray-400 transition-all text-[#E1E0CC]">
              <ChevronLeft size={24} />
            </button>
            <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-[#333] flex items-center justify-center hover:bg-[#111] hover:border-gray-400 transition-all text-[#E1E0CC]">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="max-w-[1600px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(i => <div key={i} className="bg-[#101010] animate-pulse rounded-2xl h-[500px]" />)}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Horizontal Scroll */}
          <div className="hidden md:block w-full overflow-hidden mb-32">
            <div 
              ref={carouselRef}
              className="flex gap-16 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory pb-12"
              style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {/* This style block completely hides the scrollbar across browsers while keeping functionality */}
              <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>
              
              {projects.map((project, idx) => (
                <div key={project.id} className="w-[85vw] max-w-[1100px] h-[65vh] shrink-0 snap-start">
                  <div className="grid grid-cols-2 h-full gap-16">
                    
                    {/* Project Details */}
                    <div className="flex flex-col justify-center">
                      <div className="text-primary tracking-widest text-sm font-medium uppercase mb-6">
                        {String(idx + 1).padStart(2, '0')} — {project.category}
                      </div>
                      <h3 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-[#E1E0CC] mb-6">{project.title}</h3>
                      <p className="text-lg lg:text-xl text-gray-400 font-light mb-8 leading-relaxed max-w-md">
                        {project.description}
                      </p>
                      
                      {project.technologies && (
                        <div className="flex gap-3 flex-wrap mb-10">
                          {project.technologies.map(tech => (
                            <span key={tech} className="border border-[#333] text-gray-300 px-4 py-1.5 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center self-start gap-2 border border-[#333] hover:border-[#666] hover:bg-[#111] px-6 py-3 rounded-full transition-all text-sm font-medium">
                          View Live Product <ExternalLink size={16} />
                        </a>
                      )}
                    </div>

                    {/* Browser Mockup */}
                    <div className="h-full py-4 relative z-0">
                      <BrowserFrame url={project.live_url || 'https://silava.com'}>
                        {project.live_url ? (
                          <iframe 
                            src={project.live_url} 
                            className="w-full h-full border-none bg-white relative z-0"
                            title={project.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-gray-600 text-center p-8">
                            <Code size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-xl font-medium mb-1 text-gray-400">{project.title}</p>
                            <p className="text-sm">Live Interface Preview</p>
                          </div>
                        )}
                      </BrowserFrame>
                    </div>

                  </div>
                </div>
              ))}
              
              {/* Padding block at end to allow the last item to scroll fully left */}
              <div className="w-[10vw] shrink-0" />
            </div>
          </div>

          {/* Mobile Vertical Stack */}
          <div className="md:hidden max-w-[1600px] mx-auto px-6 pb-24 flex flex-col gap-20">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-primary tracking-widest text-xs font-medium uppercase mb-4">
                  {String(idx + 1).padStart(2, '0')} — {project.category}
                </div>
                <h3 className="text-3xl font-medium text-[#E1E0CC] mb-6">{project.title}</h3>
                
                <div className="h-[300px] mb-8">
                  <BrowserFrame url={project.live_url || 'https://silava.com'}>
                     {project.live_url ? (
                        <iframe 
                          src={project.live_url} 
                          className="w-full h-full border-none bg-white"
                          title={project.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-gray-600 text-center p-6">
                          <Code size={40} className="mx-auto mb-4 opacity-20" />
                          <p className="text-lg font-medium text-gray-400">{project.title}</p>
                        </div>
                      )}
                  </BrowserFrame>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.description}</p>
                
                {project.technologies && (
                  <div className="flex gap-2 flex-wrap mb-8">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="border border-[#333] text-gray-300 px-3 py-1 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 border border-[#333] bg-[#111] px-6 py-3 rounded-full text-sm font-medium">
                    View Live <ExternalLink size={16} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
