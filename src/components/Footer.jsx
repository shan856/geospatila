import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({});
  const phoneNumber = '8553433450';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  
  useEffect(() => {
    const fetchContact = async () => {
      const docSnap = await getDoc(doc(db, 'single_pages', 'contact'));
      if (docSnap.exists()) setContactInfo(docSnap.data());
    };
    fetchContact();
  }, []);

  return (
    // --- UPDATED: Switched to a light slate background for a fully light theme ---
    <footer className="bg-slate-100 text-text-secondary py-12 border-t border-border-color">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Link to="/">
              <img src="/assets/logo.png" alt="RRtechGeo Logo" className="h-10 w-auto" />
            </Link>
            <p className="pr-4">Innovating with GIS & Spatial Intelligence since 2010.</p>
          </div>

          <div>
            {/* --- UPDATED: Headings and links for light background --- */}
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li className="mb-2"><Link to="/services" className="hover:text-accent">Services</Link></li>
              <li className="mb-2"><Link to="/projects" className="hover:text-accent">Projects</Link></li>
              <li className="mb-2"><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
              <li className="mb-2"><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Us</h3>
            <p className="mb-2">{contactInfo.address}</p>
            <p className="mb-2">Email: <a href={`mailto:${contactInfo.email}`} className="hover:text-accent">{contactInfo.email}</a></p>
            <p>Phone: <a href={`tel:${contactInfo.phone}`} className="hover:text-accent">{contactInfo.phone}</a></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="/" aria-label="Facebook" className="hover:text-blue-600 transition-colors"><FaFacebook /></a>
              <a href="/" aria-label="X/Twitter" className="hover:text-black transition-colors"><FaXTwitter /></a>
              <a href="/" aria-label="Instagram" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
              <a href="/" aria-label="LinkedIn" className="hover:text-blue-500 transition-colors"><FaLinkedin /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-500 transition-colors"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 border-t border-slate-300 pt-6">
          <p>&copy; {new Date().getFullYear()} RRtechGeo. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;