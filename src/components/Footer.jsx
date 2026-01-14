import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Footer = () => {
  const [settings, setSettings] = useState({
    companyName: 'RRtechGeo',
    tagline: 'Geospatial Solutions',
    footerDescription: 'Transforming geospatial data into actionable insights. Expert GIS solutions, drone mapping, and remote sensing services for modern businesses.',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
      github: '#',
      email: 'contact@rrtechgeo.com',
    },
    footerLinks: {
      privacyPolicy: '#',
      termsOfService: '#',
      cookiePolicy: '#',
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'single_pages', 'settings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.log('Using default settings');
      }
    };

    fetchSettings();
  }, []);

  const footerLinks = {
    services: [
      { name: 'GIS Mapping', path: '/services#gis' },
      { name: 'Drone Surveys', path: '/services#drone' },
      { name: 'Remote Sensing', path: '/services#remote' },
      { name: 'Spatial Analytics', path: '/services#analytics' },
      { name: 'Consulting', path: '/services#consulting' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Projects', path: '/projects' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Careers', path: '/about#careers' },
      { name: 'Contact', path: '/contact' },
    ],
    resources: [
      { name: 'Case Studies', path: '/projects' },
      { name: 'Documentation', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Support', path: '/contact' },
    ],
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: settings.socialLinks?.linkedin || '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: settings.socialLinks?.twitter || '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: settings.socialLinks?.github || '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: `mailto:${settings.socialLinks?.email || 'contact@rrtechgeo.com'}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative mt-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Top gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-accent via-geo-accent to-accent" />

      {/* Spacer after line */}
      <div className="h-16" />

      {/* Decorative blur orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-geo-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-geo-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
                <span className="text-white font-display font-bold text-xl">RR</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-text-primary">
                  {settings.companyName?.replace('Geo', '')}<span className="text-gradient">Geo</span>
                </span>
                <span className="text-xs text-text-muted uppercase tracking-widest">{settings.tagline}</span>
              </div>
            </Link>
            <p className="text-text-secondary mb-8 leading-relaxed max-w-sm">
              {settings.footerDescription}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-white border border-glass-border shadow-sm flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent hover:border-accent hover:shadow-md transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-accent hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-geo-accent" />
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-accent hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary hover:text-accent hover:pl-1 transition-all duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to={settings.footerLinks?.privacyPolicy || '#'} className="text-text-muted hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to={settings.footerLinks?.termsOfService || '#'} className="text-text-muted hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to={settings.footerLinks?.cookiePolicy || '#'} className="text-text-muted hover:text-accent text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;