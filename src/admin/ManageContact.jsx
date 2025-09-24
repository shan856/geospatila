import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Import the Firebase database instance
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ManageContact = () => {
  const [contactData, setContactData] = useState({ address: '', phone: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch data from Firestore
  const fetchContactData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'single_pages', 'contact');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
      alert("Failed to fetch contact data.");
    }
    setIsLoading(false);
  };
  
  // Run the fetch function once on component mount
  useEffect(() => {
    fetchContactData();
  }, []);

  // Function to save data back to Firestore
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'single_pages', 'contact');
      await setDoc(docRef, contactData);
      alert('Contact info saved successfully!');
    } catch (error) {
      alert(`Error saving contact info: ${error.message}`);
    }
    setIsLoading(false);
  };

  // Standard input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <p className="text-white">Loading Contact Info...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Manage Contact Info</h1>
        <button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Address</label>
          <input type="text" name="address" value={contactData.address} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded text-white" />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Phone Number</label>
          <input type="text" name="phone" value={contactData.phone} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded text-white" />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Email Address</label>
          <input type="email" name="email" value={contactData.email} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded text-white" />
        </div>
      </div>
    </div>
  );
};

export default ManageContact;