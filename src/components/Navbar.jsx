import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedHamburgerIcon = ({ isOpen, onClick }) => {
  return (
    <motion.button onClick={onClick} className="w-7 h-7 relative focus:outline-none" animate={isOpen ? "open" : "closed"} aria-label="Toggle menu">
      <motion.span variants={{ closed: { y: 0, rotate: 0 }, open: { y: 8, rotate: 45 } }} className="block absolute h-0.5 w-full bg-white" style={{ top: '25%' }}/>
      <motion.span variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }} className="block absolute h-0.5 w-full bg-white" style={{ top: '50%' }}/>
      <motion.span variants={{ closed: { y: 0, rotate: 0 }, open: { y: -8, rotate: -45 } }} className="block absolute h-0.5 w-full bg-white" style={{ top: '75%' }}/>
    </motion.button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLinkStyle = { color: '#FBBF24' };
  const menuVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }, exit: { opacity: 0, y: -20, transition: { duration: 0.2 } } };

  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-yellow-500/10">
      {/* --- PARENT CONTAINER IS NOW 'RELATIVE' --- */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        
        {/* --- LOGO POSITIONING APPLIED --- */}
        <NavLink 
          to="/" 
          onClick={() => setIsMenuOpen(false)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 transition-transform duration-300 hover:scale-105"
        >
          {/* --- LOGO SIZE INCREASED --- */}
          <img src="https://raw.githubusercontent.com/shan856/geospatila/main/uploads/logo.png" alt="RRtechGeo Logo" className="h-20 w-auto" />
        </NavLink>
        
        {/* This empty div ensures the nav links stay on the right */}
        <div />

        <ul className="hidden md:flex space-x-8 text-lg items-center">
          <li><NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-yellow-400 transition-colors duration-300">Home</NavLink></li>
          <li><NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-yellow-400 transition-colors duration-300">About Us</NavLink></li>
          <li><NavLink to="/services" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-yellow-400 transition-colors duration-300">Services</NavLink></li>
          <li><NavLink to="/projects" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-yellow-400 transition-colors duration-300">Projects</NavLink></li>
          <li><NavLink to="/gallery" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-yellow-400 transition-colors duration-300">Gallery</NavLink></li>
          <li><NavLink to="/contact" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="hover:text-yellow-400 transition-colors duration-300">Contact Us</NavLink></li>
        </ul>
        <div className="md:hidden"><AnimatedHamburgerIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} /></div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="md:hidden bg-gray-800">
            <ul className="flex flex-col items-center space-y-6 py-8">
              <li><NavLink to="/" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-xl">Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-xl">About Us</NavLink></li>
              <li><NavLink to="/services" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-xl">Services</NavLink></li>
              <li><NavLink to="/projects" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-xl">Projects</NavLink></li>
              <li><NavLink to="/gallery" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-xl">Gallery</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setIsMenuOpen(false)} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-xl">Contact Us</NavLink></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;