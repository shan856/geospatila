import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
};

const Card = ({ icon, title, children, imageUrl }) => {
  if (imageUrl) {
    // --- Image Card ---
    // The gradient has been updated to be more subtle and professional for the light theme.
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
        {/* Updated gradient from black to a softer gray for a less harsh look */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        
        <div className="relative z-10 p-6">
          {/* Icon is now passed as-is, assuming it contains its own styling */}
          <div className="mb-3">{icon}</div>
          <h3 className="text-xl font-bold">{title}</h3>
          {children && <p className="text-gray-200 mt-2 text-sm">{children}</p>}
        </div>
      </motion.div>
    );
  }

  // --- Default Card (No Image) for Light Theme ---
  // Background, text, border, and hover colors have all been updated.
  return (
    <motion.div 
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={cardVariants}
      className="bg-secondary-bg p-6 rounded-lg border border-border-color hover:border-accent transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="flex items-center mb-4">
        {/* Icon is now passed as-is, assuming it contains its own styling from the parent */}
        {icon && <div className="text-accent text-3xl mr-4">{icon}</div>}
        <h3 className="text-xl font-bold text-text-primary">{title}</h3>
      </div>
      {children && <p className="text-text-secondary">{children}</p>}
    </motion.div>
  );
};

export default Card;