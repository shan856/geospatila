import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../components/Card';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, 'single_pages', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setContactInfo(docSnap.data());
      } catch (error) { console.error("Error fetching contact info:", error); }
    };
    fetchContact();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! This is a demo form.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16"><h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Contact Us</h1><p className="text-lg md:text-xl text-gray-300 mt-4">We'd love to hear from you. Let's get in touch.</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 md:mb-20">
          <Card title="Phone" icon={<FaPhone />}><a href={`tel:${contactInfo.phone}`} className="hover:text-yellow-400">{contactInfo.phone}</a></Card>
          <Card title="Email" icon={<FaEnvelope />}><a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-400">{contactInfo.email}</a></Card>
          <Card title="Address" icon={<FaMapMarkerAlt />}>{contactInfo.address}</Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 bg-gray-800 p-6 md:p-8 rounded-lg">
          <div>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-400">Full Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400" required /></div>
              <div><label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-400">Email Address</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400" required /></div>
              <div><label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-400">Message</label><textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400" required></textarea></div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Location</h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.284481358153!2d-122.4013712846817!3d37.78369697975788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1e8f2231%3A0x2e6e51e1e9a26785!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647000000000" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" className="rounded-lg" title="Google Maps Location"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;