import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';

const technologies = [
  { group: 'Frontend', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'Framer Motion', 'Three.js'] },
  { group: 'Backend & Data', items: ['Node.js', 'REST APIs', 'Supabase', 'PostgreSQL'] },
  { group: 'AI & Engineering', items: ['Google Gemini', 'LLM Workflows', 'AI Integration', 'GitHub', 'Figma'] }
];

export default function Technology() {
  return (
    <section className="section bg-secondary" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-xl"
        >
          <h2 className="display">The technology behind the products.</h2>
        </motion.div>

        <div className="grid grid-cols-3">
          {technologies.map((tech, idx) => (
            <motion.div 
              key={tech.group}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="card glass"
            >
              <h3 style={{ marginBottom: 'var(--spacing-6)', color: 'var(--text-secondary)' }}>{tech.group}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
                {tech.items.map(item => (
                  <span 
                    key={item}
                    style={{
                      padding: 'var(--spacing-2) var(--spacing-4)',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Network Grid */}
      <div style={{ 
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center',
        maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
        opacity: 0.5,
        zIndex: 0
      }} />
    </section>
  );
}
