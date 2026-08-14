import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

export default function Features() {
  const cards = [
    {
      id: 1,
      title: 'Web Applications.',
      number: '01',
      icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      items: [
        'Scalable architecture',
        'React & Next.js mastery',
        'Secure database design',
        'High-performance delivery'
      ]
    },
    {
      id: 2,
      title: 'MVP Development.',
      number: '02',
      icon: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2487&auto=format&fit=crop',
      items: [
        'Rapid prototyping',
        'Startup-ready code',
        'Market testing analytics'
      ]
    },
    {
      id: 3,
      title: 'AI Integration.',
      number: '03',
      icon: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
      items: [
        'Smart automation workflows',
        'Custom LLM integration',
        'Intelligent data processing'
      ]
    }
  ];

  const headerSegments = [
    { text: "Studio-grade workflows for visionary creators.", className: "text-primary" },
    { text: "Built for pure vision. Powered by code.", className: "text-gray-500 block mt-1 sm:mt-2" }
  ];

  return (
    <section className="min-h-screen bg-black relative py-20 md:py-32 px-4 md:px-6">
      <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="mb-12 md:mb-20 max-w-4xl">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle segments={headerSegments} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          
          {/* Card 1: Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#101010] h-[320px] md:h-[400px] lg:h-auto"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://cdn.pixabay.com/video/2022/11/01/137458-766787652_large.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#E1E0CC] text-lg sm:text-xl font-medium tracking-tight">Your digital vision, engineered.</p>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {cards.map((card, idx) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 * (idx + 1), ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#212121] rounded-2xl md:rounded-[2rem] p-6 sm:p-8 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-12 sm:mb-16">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={card.icon} alt={card.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <span className="text-gray-500 text-xs sm:text-sm font-medium">{card.number}</span>
              </div>

              <div className="mt-auto">
                <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium mb-6 sm:mb-8 tracking-tight">{card.title}</h3>
                
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-400 text-xs sm:text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-xs sm:text-sm font-medium group cursor-pointer">
                  Learn more
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
