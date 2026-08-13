import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stages = [
  { num: '01', title: 'Discover', desc: 'Understand the business, users and requirements.' },
  { num: '02', title: 'Plan', desc: 'Define architecture, features and roadmap.' },
  { num: '03', title: 'Design', desc: 'Build the interface and user experience.' },
  { num: '04', title: 'Develop', desc: 'Create the frontend, backend, APIs and database.' },
  { num: '05', title: 'Validate', desc: 'Test functionality, responsiveness, security and performance.' },
  { num: '06', title: 'Launch', desc: 'Deploy to production.' },
  { num: '07', title: 'Support', desc: 'Maintain, improve and scale.' }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-xl"
        >
          <h2 className="display">From idea to production.</h2>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Progress Line */}
          <div style={{ 
            position: 'absolute', top: 0, bottom: 0, left: '24px', 
            width: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 
          }}>
            <motion.div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', 
              backgroundColor: 'var(--accent-color)',
              scaleY: scrollYProgress,
              transformOrigin: 'top'
            }} />
          </div>

          {stages.map((stage, i) => {
            // Calculate when this item should light up based on scroll progress
            const start = i / stages.length;
            const isActive = useTransform(scrollYProgress, [start - 0.1, start], [0.3, 1]);
            const scale = useTransform(scrollYProgress, [start - 0.1, start], [0.8, 1]);

            return (
              <div key={stage.num} style={{ display: 'flex', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-10)', position: 'relative', zIndex: 1 }}>
                
                {/* Node indicator */}
                <motion.div style={{ 
                  width: '50px', height: '50px', borderRadius: '50%', 
                  backgroundColor: 'var(--bg-color)', border: '2px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 600, fontSize: '1.2rem',
                  color: 'var(--text-primary)',
                  opacity: isActive,
                  scale: scale,
                  borderColor: useTransform(scrollYProgress, [start - 0.1, start], ['var(--border-color)', 'var(--accent-color)']),
                  boxShadow: useTransform(scrollYProgress, [start - 0.1, start], ['none', '0 0 20px rgba(255,255,255,0.2)'])
                }}>
                  {stage.num}
                </motion.div>

                {/* Content */}
                <motion.div style={{ opacity: isActive, paddingTop: '8px' }}>
                  <h3 style={{ marginBottom: 'var(--spacing-2)' }}>{stage.title}</h3>
                  <p className="text-body-lg">{stage.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
