import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

export default function Features() {
  const cards = [
    {
      id: 1,
      title: 'Web Applications.',
      number: '01',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
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
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
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
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
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
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
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
