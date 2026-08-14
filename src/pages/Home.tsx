import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Portfolio from '../components/Portfolio';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        className="custom-cursor-dot" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-[#E1E0CC]">
      <CustomCursor />
      <main>
        <Hero />
        <About />
        <Features />
        
        {/* We keep the dynamic Supabase components, wrapped to match theme if needed */}
        <div className="bg-black py-12 relative z-20">
          <Portfolio />
        </div>
        
        <div className="bg-[#101010] py-12 relative z-20 rounded-t-[2rem]">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
