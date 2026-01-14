import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaSave, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { useToast } from '../components/Toast';

const ManageContact = () => {
  const toast = useToast();
  const [contactData, setContactData] = useState({
    address: '',
    address2: '',
    city: '',
    phone: '',
    phone2: '',
    email: '',
    email2: '',
    hours: '',
    mapLat: '',
    mapLng: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchContactData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'single_pages', 'contact');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactData(prev => ({ ...prev, ...docSnap.data() }));
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'single_pages', 'contact');
      await setDoc(docRef, contactData);
      toast.success('Contact info saved successfully!');
    } catch (error) {
      toast.error(`Error saving contact info: ${error.message}`);
    }
    setIsSaving(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Manage Contact Info</h1>
          <p className="text-text-secondary mt-1">Update your business contact information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FaSave /> {isSaving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Address Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-soft w-10 h-10 flex items-center justify-center">
              <FaMapMarkerAlt className="text-accent" />
            </div>
            <h2 className="text-xl font-display font-semibold text-text-primary">Address</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Address Line 1</label>
              <input
                type="text"
                name="address"
                value={contactData.address}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="123 Main Street"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={contactData.address2}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="Suite 100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">City, State, ZIP</label>
              <input
                type="text"
                name="city"
                value={contactData.city}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="Mumbai, MH 400001, India"
              />
            </div>
          </div>
        </div>

        {/* Phone Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-soft w-10 h-10 flex items-center justify-center">
              <FaPhone className="text-accent" />
            </div>
            <h2 className="text-xl font-display font-semibold text-text-primary">Phone Numbers</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Primary Phone</label>
              <input
                type="text"
                name="phone"
                value={contactData.phone}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Secondary Phone</label>
              <input
                type="text"
                name="phone2"
                value={contactData.phone2}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="+91 12345 67890"
              />
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-soft w-10 h-10 flex items-center justify-center">
              <FaEnvelope className="text-accent" />
            </div>
            <h2 className="text-xl font-display font-semibold text-text-primary">Email Addresses</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Primary Email</label>
              <input
                type="email"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="contact@rrtechgeo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Support Email</label>
              <input
                type="email"
                name="email2"
                value={contactData.email2}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="support@rrtechgeo.com"
              />
            </div>
          </div>
        </div>

        {/* Hours & Map Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-soft w-10 h-10 flex items-center justify-center">
              <FaClock className="text-accent" />
            </div>
            <h2 className="text-xl font-display font-semibold text-text-primary">Hours & Map</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Business Hours</label>
              <input
                type="text"
                name="hours"
                value={contactData.hours}
                onChange={handleInputChange}
                className="input-glass"
                placeholder="Mon-Fri: 9AM-6PM"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Map Latitude</label>
                <input
                  type="text"
                  name="mapLat"
                  value={contactData.mapLat}
                  onChange={handleInputChange}
                  className="input-glass"
                  placeholder="19.0760"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Map Longitude</label>
                <input
                  type="text"
                  name="mapLng"
                  value={contactData.mapLng}
                  onChange={handleInputChange}
                  className="input-glass"
                  placeholder="72.8777"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContact;