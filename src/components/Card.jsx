import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'glass-card',
    elevated: 'card-elevated',
    gradient: 'card-gradient-border',
    solid: 'bg-white rounded-2xl shadow-card border border-glass-border',
  };

  const baseClasses = variants[variant] || variants.default;

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`${baseClasses} p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;