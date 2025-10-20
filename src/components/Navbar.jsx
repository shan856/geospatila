import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedHamburgerIcon = ({ isOpen, onClick }) => {
  return (
    <motion.button onClick={onClick} className="w-7 h-7 relative focus:outline-none focus:ring-2 focus:ring-accent rounded" animate={isOpen ? "open" : "closed"} aria-label="Toggle menu">
      <motion.span variants={{ closed: { y: 0, rotate: 0 }, open: { y: 8, rotate: 45 } }} className="block absolute h-0.5 w-full bg-text-primary" style={{ top: '25%' }}/>
      <motion.span variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }} className="block absolute h-0.5 w-full bg-text-primary" style={{ top: '50%' }}/>
      <motion.span variants={{ closed: { y: 0, rotate: 0 }, open: { y: -8, rotate: -45 } }} className="block absolute h-0.5 w-full bg-text-primary" style={{ top: '75%' }}/>
    </motion.button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const activeLinkClass = "text-accent"; 

  const menuVariants = { 
    hidden: { opacity: 0, y: -20 }, 
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }, 
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } } 
  };

  return (
    // --- UPDATED: Increased transparency and blur effect ---
    <header className="bg-secondary-bg/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/20 shadow-sm">
      <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-3">
          <img src="https://raw.githubusercontent.com/shan856/geospatila/main/uploads/logo.png" alt="RRtechGeo Logo" className="h-12 w-12" />
          <span className="font-bold text-xl text-yellow-500">RRtechGeo</span>
        </Link>
        
        <ul className="hidden md:flex space-x-8 text-lg items-center text-text-secondary">
          <li><NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : undefined} >Home</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => isActive ? activeLinkClass : undefined}>Services</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? activeLinkClass : undefined}>Projects</NavLink></li>
          <li><NavLink to="/gallery" className={({ isActive }) => isActive ? activeLinkClass : undefined}>Gallery</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLinkClass : undefined}>About Us</NavLink></li>
        </ul>

        <div className="hidden md:block">
            <Link to="/contact" className="font-semibold text-white bg-accent hover:bg-accent-dark px-6 py-3 rounded-lg transition-colors duration-300">
              Contact Us
            </Link>
        </div>

        <div className="md:hidden">
          <AnimatedHamburgerIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </nav>
      
      <AnimatePresence>
        {isMenuOpen && (
          // --- UPDATED: Also applied the effect to the mobile menu ---
          <motion.div initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="md:hidden bg-secondary-bg/70 backdrop-blur-md border-t border-border-color">
            <ul className="flex flex-col items-center space-y-6 py-8 text-text-primary">
              <li><NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : undefined}>Home</NavLink></li>
              <li><NavLink to="/services" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : undefined}>Services</NavLink></li>
              <li><NavLink to="/projects" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : undefined}>Projects</NavLink></li>
              <li><NavLink to="/gallery" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : undefined}>Gallery</NavLink></li>
              <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? activeLinkClass : undefined}>About Us</NavLink></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-semibold text-white bg-accent hover:bg-accent-dark px-5 py-2 rounded-lg">Contact Us</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;