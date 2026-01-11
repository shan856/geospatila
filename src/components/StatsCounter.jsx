import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const StatsCounter = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.15 }
            }
          }}
          className="glass-card p-6 text-center group hover:shadow-card-hover transition-shadow duration-300"
        >
          <div className="icon-soft w-14 h-14 mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-geo-accent group-hover:text-white transition-all duration-300">
            {stat.icon}
          </div>
          <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-text-secondary">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCounter;