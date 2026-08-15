import { motion } from 'framer-motion';

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export default function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {segments.map((segment, segmentIndex) => {
        const words = segment.text.split(' ');
        return words.map((word, wordIndex) => {
          const isLastSegment = segmentIndex === segments.length - 1;
          const isLastWord = wordIndex === words.length - 1;
          const showMargin = !(isLastSegment && isLastWord);
          
          return (
            <motion.span
              key={`${segmentIndex}-${wordIndex}`}
              variants={item}
              className={`inline-block ${segment.className || ''}`}
              style={{ marginRight: showMargin ? '0.25em' : '0' }}
            >
              {word}
            </motion.span>
          );
        });
      })}
    </motion.div>
  );
}
