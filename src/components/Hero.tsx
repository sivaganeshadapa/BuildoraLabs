import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import WordsPullUp from './WordsPullUp';

export default function Hero() {
  const navItems = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black relative">
      <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden relative">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-[2]"></div>
        
        {/* Side Letterbox Fade */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(to right, #000000 0%, transparent 15%, transparent 85%, #000000 100%)`
          }}
        ></div>

        {/* Bottom Cinematic Fade */}
        <div 
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(0,0,0,0) 60%, 
              rgba(0,0,0,.23) 79.6%, 
              rgba(0,0,0,.45) 81.4%,
              rgba(0,0,0,.75) 83.3%, 
              rgba(0,0,0,.84) 85.2%, 
              rgba(0,0,0,.888) 88%,
              rgba(0,0,0,.905) 91%, 
              rgba(0,0,0,.96) 95%, 
              #000000 100%)`
          }}
        ></div>

        {/* Navbar Pill */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E1E0CC'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 pb-6 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-end">
            
            {/* Giant Heading */}
            <div className="md:col-span-8">
              <WordsPullUp 
                text="SILAVA" 
                showAsterisk={true}
                className="text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw] 2xl:text-[16vw] font-medium leading-[0.85] tracking-[-0.07em]" 
                style={{ color: '#E1E0CC' }}
              />
            </div>
            
            {/* Right side text and button */}
            <div className="md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right gap-6 md:gap-8 pb-2 md:pb-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base max-w-sm leading-[1.2]"
              >
                SILAVA is a premium digital product engineering studio bound not by templates or shortcuts, but by a passion to build scalable, high-performance technology for visionary creators and startups.
              </motion.p>
              
              <motion.a 
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-6 pr-2 py-2 transition-all duration-300"
              >
                <span className="text-black font-medium text-sm sm:text-base pr-2 group-hover:pr-4 transition-all duration-300">Start a Project</span>
                <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </motion.a>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
