import { motion } from 'framer-motion';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedLetter from './AnimatedLetter';

export default function About() {
  const headingSegments = [
    { text: "Led by Siva Ganesh Adapa,", className: "font-normal" },
    { text: "we engineer systems,", className: "font-serif italic" },
    { text: "bridging digital and physical infrastructure.", className: "font-normal" },
  ];

  return (
    <section id="about" className="bg-black py-20 px-4 md:px-6">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center">
        
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8 md:mb-12 font-medium">
          Who We Are
        </span>
        
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] text-primary mb-12 md:mb-16">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatedLetter className="text-[#DEDBC8] text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-center">
            SILAVA is a premium digital product engineering studio founded by Siva Ganesh Adapa. With a deep foundation in full-stack development, AI, and embedded systems, we specialize in building complex, hyper-local solutions that scale.
          </AnimatedLetter>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed text-justify sm:text-center"
          >
            From architecting the open OOH advertising network <strong className="text-gray-300">FlexConnect</strong>, to building the AI-powered electrical design platform <strong className="text-gray-300">SmartWiring AI</strong>, we don't just build websites—we engineer complete end-to-end ecosystems that drive real-world impact.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
