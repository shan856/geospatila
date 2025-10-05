import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const Card = ({ icon, title, children, imageUrl }) => {
  if (imageUrl) {
    // --- THIS IS THE NEW, REDESIGNED IMAGE CARD ---
    return (
      <motion.div 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
        className="group relative rounded-lg overflow-hidden min-h-[250px] flex flex-col justify-end text-white shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110" 
          style={{ backgroundImage: `url(${imageUrl})` }} 
        />
        {/* A much stronger gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="relative z-10 p-6">
          <div className="mb-3">{icon}</div>
          <h3 className="text-xl font-bold">{title}</h3>
          {children && <p className="text-gray-300 mt-2 text-sm">{children}</p>}
        </div>
      </motion.div>
    );
  }

  // Default card with no image (this remains the same)
  return (
    <motion.div 
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/20"
    >
      <div className="flex items-center mb-4">
        {icon && <div className="text-yellow-400 text-3xl mr-4">{icon}</div>}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      {children && <p className="text-gray-400">{children}</p>}
    </motion.div>
  );
};

export default Card;