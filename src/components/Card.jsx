import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const Card = ({ icon, title, children, imageUrl }) => {
  // If an imageUrl is provided, render the image card variant
  if (imageUrl) {
    return (
      <motion.div 
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
        className="relative p-6 rounded-lg overflow-hidden min-h-[220px] flex flex-col justify-end text-white transform hover:-translate-y-2 transition-transform duration-300 shadow-lg"
      >
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="relative z-10">
          {icon && <div className="text-yellow-400 text-3xl mb-2">{icon}</div>}
          <h3 className="text-xl font-bold">{title}</h3>
          {children && <p className="text-gray-300 mt-2 text-sm">{children}</p>}
        </div>
      </motion.div>
    );
  }

  // Default card with no image
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