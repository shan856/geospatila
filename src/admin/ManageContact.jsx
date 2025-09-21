import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api/data/contact.json';

const ManageContact = () => {
  const [contactData, setContactData] = useState({ address: '', phone: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setContactData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch contact data.');
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    })
      .then(res => res.json())
      .then(() => {
        setIsLoading(false);
        alert('Contact info saved successfully!');
      })
      .catch(err => {
        setError('Failed to save contact info.');
        setIsLoading(false);
      });
  };

  if (isLoading) return <p>Loading contact info...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Manage Contact Info</h1>
        <button onClick={handleSaveChanges} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-500" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Address</label>
          <input type="text" name="address" value={contactData.address} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Phone Number</label>
          <input type="text" name="phone" value={contactData.phone} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Email Address</label>
          <input type="email" name="email" value={contactData.email} onChange={handleInputChange} className="w-full p-2 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ManageContact;