import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import WordsPullUp from '../components/WordsPullUp';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-2xl">
        <WordsPullUp 
          text="404" 
          className="text-[25vw] md:text-[20vw] font-medium leading-none tracking-tighter text-[#E1E0CC] mb-4"
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-400 text-lg md:text-2xl font-light mb-10"
        >
          The page you are looking for has been moved or no longer exists.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <a 
            href="/"
            className="group inline-flex items-center gap-2 hover:gap-3 bg-[#E1E0CC] rounded-full pl-6 pr-2 py-2 transition-all duration-300"
          >
            <span className="text-black font-medium text-sm sm:text-base pr-2 group-hover:pr-4 transition-all duration-300">Return Home</span>
            <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="text-[#E1E0CC] w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
