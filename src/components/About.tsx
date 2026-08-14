import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedLetter from './AnimatedLetter';

export default function About() {
  const headingSegments = [
    { text: "We are SILAVA,", className: "font-normal" },
    { text: "a digital product studio.", className: "font-serif italic" },
    { text: "We have skills in web development, system architecture, and UI/UX design.", className: "font-normal" },
  ];

  return (
    <section className="bg-black py-20 px-4 md:px-6">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center">
        
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8 md:mb-12 font-medium">
          Engineering
        </span>
        
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-primary mb-12 md:mb-16">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>
        
        <div className="max-w-xl mx-auto">
          <AnimatedLetter className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed text-justify sm:text-center">
            Over the last seven years, we have engineered digital products for startups, creators, and enterprise clients. We specialize in turning complex ideas into intuitive, robust, and beautiful web applications that perform at scale.
          </AnimatedLetter>
        </div>

      </div>
    </section>
  );
}
