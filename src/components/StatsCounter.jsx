import React, { useState, useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import { FaRegSmileBeam, FaRegFileAlt, FaRegStar, FaUserTie } from 'react-icons/fa';

const icons = {
  FaRegSmileBeam: <FaRegSmileBeam />,
  FaRegFileAlt: <FaRegFileAlt />,
  FaRegStar: <FaRegStar />,
  FaUserTie: <FaUserTie />,
};

function Counter({ from, to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(0);
          }
        },
      });
    }
  }, [from, to, inView]);

  return <span ref={ref} />;
}

const StatsCounter = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('/data/stats.json')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Could not load stats data:", err));
  }, []);

  return (
    // Main container with the background image
    <div className="relative py-20 bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('/uploads/stats-background.png')" }}>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-80"></div>

      {/* Content Layer */}
      <div className="relative container mx-auto px-6">
        
        {/* --- UPDATED: Grid with 4 columns for individual cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {stats.map(stat => (
            
            // --- UPDATED: Styling is now applied to each individual card ---
            <div key={stat.id} className="bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 flex flex-col items-center justify-center shadow-lg">
              <div className="text-4xl text-accent-light mb-3">{icons[stat.icon]}</div>
              <div className="text-5xl font-bold">
                <Counter from={0} to={stat.end} />+
              </div>
              <p className="text-lg mt-2 text-slate-300">{stat.label}</p>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;