import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedLetter({ 
  children, 
  className = '',
  highlightWords = []
}: { 
  children: string; 
  className?: string;
  highlightWords?: string[];
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Create an array of objects to track if a character is part of a highlighted word
  const chars = children.split('').map(char => ({ char, isHighlight: false }));
  
  // Find and mark highlighted words
  highlightWords.forEach(word => {
    let startIndex = 0;
    while ((startIndex = children.indexOf(word, startIndex)) > -1) {
      for (let i = startIndex; i < startIndex + word.length; i++) {
        chars[i].isHighlight = true;
      }
      startIndex += word.length;
    }
  });

  return (
    <p ref={containerRef} className={className}>
      {chars.map((item, index) => {
        const charProgress = index / chars.length;
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
          [0.2, 1]
        );

        return (
          <motion.span 
            key={index} 
            style={{ opacity }}
            className={item.isHighlight ? 'text-white font-bold' : ''}
          >
            {item.char}
          </motion.span>
        );
      })}
    </p>
  );
}
