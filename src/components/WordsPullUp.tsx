import { motion } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export default function WordsPullUp({ text, className = '', showAsterisk = false, style }: WordsPullUpProps) {
  const words = text.split(' ');

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
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={item}
          className="inline-block relative"
          style={{ marginRight: i === words.length - 1 ? '0' : '0.25em' }}
        >
          {word}
          {showAsterisk && i === words.length - 1 && word.includes('a') && (
            <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
              *
            </span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}
