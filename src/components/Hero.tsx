import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import HeroScene from './HeroScene';
import { staggerContainer, fadeUp } from '../lib/animations';

export default function Hero() {
  const [loading, setLoading] = useState(true);

  // Initial load sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'var(--bg-color)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ color: 'var(--text-primary)', letterSpacing: '0.1em', fontSize: '1.5rem', fontWeight: 600 }}
          >
            BUILDORA LABS
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ height: '2px', backgroundColor: 'var(--text-primary)', marginTop: '2rem' }}
          />
        </motion.div>
      )}

      <section style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'var(--spacing-16)'
      }}>
        
        {/* 3D Canvas Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"}
          >
            <motion.h1 className="display" variants={fadeUp} style={{ marginBottom: 'var(--spacing-6)', maxWidth: '1000px', margin: '0 auto var(--spacing-6)' }}>
              You bring the idea.<br />
              <span style={{ color: 'var(--text-secondary)' }}>We build the technology behind it.</span>
            </motion.h1>
            
            <motion.p className="text-body-lg" variants={fadeUp} custom={1} style={{ margin: '0 auto var(--spacing-10)', maxWidth: '800px', pointerEvents: 'auto' }}>
              We design and build premium websites, web applications, MVPs, AI-powered products and custom business platforms — from the first idea to production and beyond.
            </motion.p>
            
            <motion.div variants={fadeUp} custom={2} className="hero-buttons" style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'center', pointerEvents: 'auto' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: 'var(--spacing-5) var(--spacing-10)' }}>
                Start a Project
              </a>
              <a href="#work" className="btn btn-secondary" style={{ padding: 'var(--spacing-5) var(--spacing-10)' }}>
                Explore Our Work
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: !loading ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: 'absolute', bottom: 'var(--spacing-10)', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
        >
          <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--border-color)', position: 'relative', overflow: 'hidden' }}>
            <motion.div 
              animate={{ y: [0, 60] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{ width: '1px', height: '30px', backgroundColor: 'var(--accent-color)', position: 'absolute', top: 0 }}
            />
          </div>
        </motion.div>

        <style>{`
          .hero-buttons {
            flex-direction: column;
          }
          .hero-buttons .btn {
            width: 100%;
          }
          @media (min-width: 640px) {
            .hero-buttons {
              flex-direction: row;
            }
            .hero-buttons .btn {
              width: auto;
              min-width: 200px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
