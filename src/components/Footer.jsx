import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({});
  useEffect(() => {
    fetch('/data/contact.json')
      .then(res => res.json())
      .then(data => setContactInfo(data))
      .catch(err => console.error("Could not load contact info:", err));
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-yellow-500/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div><h3 className="text-xl font-bold text-white mb-4">GeoSpatial Innovations</h3><p className="pr-4">Innovating with GIS & Spatial Intelligence since 2010. We reveal the power of location to create a smarter, more connected world.</p></div>
          <div><h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3><ul><li className="mb-2"><Link to="/about" className="hover:text-yellow-400">About Us</Link></li><li className="mb-2"><Link to="/services" className="hover:text-yellow-400">Services</Link></li><li className="mb-2"><Link to="/projects" className="hover:text-yellow-400">Projects</Link></li><li className="mb-2"><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li></ul></div>
          <div><h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3><p className="mb-2">{contactInfo.address}</p><p className="mb-2">Email: <a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-400">{contactInfo.email}</a></p><p>Phone: <a href={`tel:${contactInfo.phone}`} className="hover:text-yellow-400">{contactInfo.phone}</a></p></div>
          <div><h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3><div className="flex space-x-4"><a href="/" className="text-2xl hover:text-yellow-400"><FaFacebook /></a><a href="/" className="text-2xl hover:text-yellow-400"><FaTwitter /></a><a href="/" className="text-2xl hover:text-yellow-400"><FaInstagram /></a><a href="/" className="text-2xl hover:text-yellow-400"><FaLinkedin /></a></div></div>
        </div>
        <div className="text-center mt-10 border-t border-gray-800 pt-6"><p>&copy; {new Date().getFullYear()} GeoSpatial Innovations. All Rights Reserved.</p></div>
      </div>
    </footer>
  );
};
export default Footer;