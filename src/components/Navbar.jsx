import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? 'py-3 glass-navbar'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-geo-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300 p-2 overflow-hidden">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {/* The Letters RR - Centered and Bolder */}
                  <path d="M8 12h5a4 4 0 0 1 0 8H8v-8zm0 8h4l3 7" strokeOpacity="0.95" />
                  <path d="M23 12h5a4 4 0 0 1 0 8h-5v-8zm0 8h4l3 7" strokeOpacity="0.95" />
                  
                  {/* LiDAR Scan Beam - Animated */}
                  <path d="M4 8 h32" strokeWidth="1.5" stroke="#a5f3fc" strokeOpacity="0.8" className="animate-lidar drop-shadow-md" />
                  
                  {/* Static Scan artifacts */}
                  <circle cx="35" cy="12" r="1.5" fill="white" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx="5" cy="28" r="1" fill="white" fillOpacity="0.6" />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-accent to-geo-accent opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-text-primary flex items-center gap-0.5">
                RRtech
                <div className="h-8 w-auto flex items-center text-accent ml-0.5">
                  <svg viewBox="0 0 70 30" className="h-full w-auto" overflow="visible">
                    <defs>
                      <linearGradient id="geoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2DD4BF" />
                        <stop offset="100%" stopColor="#0F766E" />
                      </linearGradient>
                    </defs>
                    
                    {/* Letters 'g' and 'e' */}
                    <text x="0" y="24" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="28" fill="url(#geoGradient)">ge</text>
                    
                    {/* Compass 'o' - Corrected Vertical Alignment to y=19 */}
                    <g transform="translate(46, 19)">
                      {/* Circle with gap at Top-Right (45 degrees) */}
                      <path d="M 2.5 -7.0 A 7.5 7.5 0 1 1 7.0 -2.5" fill="none" stroke="url(#geoGradient)" strokeWidth="3" strokeLinecap="round" />
                      
                      {/* Needle - Centered and pointing to gap */}
                      <g transform="rotate(45)">
                        <path d="M0 -3 L3 0 L0 3 L-3 0 Z" fill="#2DD4BF" className="origin-center" />
                        <path d="M0 -10 L0 -5" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                      <circle cx="0" cy="0" r="1.5" fill="white" />
                      
                      {/* Particles - Emitting from gap */}
                      <g transform="translate(6, -6)">
                        <circle cx="0" cy="0" r="0.9" fill="#2DD4BF" opacity="0.9" />
                        <circle cx="2.5" cy="-2.5" r="0.7" fill="#2DD4BF" opacity="0.7" />
                        <circle cx="5" cy="-5" r="0.5" fill="#2DD4BF" opacity="0.5" />
                      </g>
                    </g>
                  </svg>
                </div>
              </span>
              <span className="text-xs text-text-muted font-medium tracking-wider uppercase">
                Geospatial Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${isActive(link.path)
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-accent'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent/10 rounded-xl border border-accent/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 rounded-xl bg-secondary-bg flex items-center justify-center hover:bg-accent/10 transition-colors"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                className="w-6 h-0.5 bg-text-primary rounded-full block origin-center"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-text-primary rounded-full block"
              />
              <motion.span
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                className="w-6 h-0.5 bg-text-primary rounded-full block origin-center"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4"
            >
              <div className="bg-white rounded-2xl shadow-card p-4 space-y-2 border border-glass-border">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive(link.path)
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-secondary hover:bg-secondary-bg hover:text-accent'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;