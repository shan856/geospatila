import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1 } }
};

const PrincipleCard = ({ icon, title, children }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center h-full hover:border-yellow-400/50 transition-colors duration-300"
    >
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="text-yellow-400 text-2xl">{icon}</div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">
        {children}
      </p>
    </motion.div>
  );
};

export default PrincipleCard;