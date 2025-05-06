import { useState, useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { appTheme } from '../../constant/theme';

interface Props {
    theme: "light" | "dark"
}

const SlideShowText = ({theme}: Props) => {
  const [visible, setVisible] = useState(true);
  const [activeText, setActiveText] = useState(0);
  
  const slides = [
    "Peer-to-peer learning connects knowledge seekers with passionate educators",
    "Learn practical skills directly from experienced peers in your community",
    "Share your expertise and earn while helping others grow",
    "Personalized learning experiences tailored to your needs"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-opacity-10 rounded-lg p-4 mb-8"
      style={{ backgroundColor: appTheme[theme].neutral[100] }}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center text-sm italic text-gray-600"
        >
          {slides[activeText]}
        </motion.div>
      </AnimatePresence>
      
      <button 
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 hover:opacity-70 transition-opacity"
      >
        <FiXCircle className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default SlideShowText