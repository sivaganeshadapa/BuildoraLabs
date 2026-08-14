import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedLetter({ children, className = '' }: { children: string, className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = children.split('');

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, index) => {
        const charProgress = index / chars.length;
        const opacity = useTransform(
          scrollYProgress,
          [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
          [0.2, 1]
        );

        return (
          <motion.span key={index} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}
