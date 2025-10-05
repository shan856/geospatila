import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import the new X icon from a different part of the library
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({});
  // TODO: Replace with your actual WhatsApp number
  const phoneNumber = '1234567890'; 
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  
  useEffect(() => {
    const fetchContact = async () => {
      const docSnap = await getDoc(doc(db, 'single_pages', 'contact'));
      if (docSnap.exists()) setContactInfo(docSnap.data());
    };
    fetchContact();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-yellow-500/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><h3 className="text-xl font-bold text-white mb-4">GeoSpatial Innovations</h3><p className="pr-4">Innovating with GIS & Spatial Intelligence since 2010.</p></div>
          <div><h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3><ul><li className="mb-2"><Link to="/about" className="hover:text-yellow-400">About Us</Link></li><li className="mb-2"><Link to="/services" className="hover:text-yellow-400">Services</Link></li><li className="mb-2"><Link to="/projects" className="hover:text-yellow-400">Projects</Link></li><li className="mb-2"><Link to="/gallery" className="hover:text-yellow-400">Gallery</Link></li><li className="mb-2"><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li></ul></div>
          <div><h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3><p className="mb-2">{contactInfo.address}</p><p className="mb-2">Email: <a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-400">{contactInfo.email}</a></p><p>Phone: <a href={`tel:${contactInfo.phone}`} className="hover:text-yellow-400">{contactInfo.phone}</a></p></div>
          
          {/* --- THIS IS THE CORRECTED SOCIAL MEDIA SECTION --- */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="/" aria-label="Facebook" className="text-2xl hover:text-blue-600 transition-colors duration-300"><FaFacebook /></a>
              <a href="/" aria-label="X/Twitter" className="text-2xl hover:text-gray-300 transition-colors duration-300"><FaXTwitter /></a>
              <a href="/" aria-label="Instagram" className="text-2xl hover:text-pink-500 transition-colors duration-300"><FaInstagram /></a>
              <a href="/" aria-label="LinkedIn" className="text-2xl hover:text-blue-500 transition-colors duration-300"><FaLinkedin /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-2xl hover:text-green-500 transition-colors duration-300"><FaWhatsapp /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 border-t border-gray-800 pt-6"><p>&copy; {new Date().getFullYear()} GeoSpatial Innovations. All Rights Reserved.</p></div>
      </div>
    </footer>
  );
};
export default Footer;