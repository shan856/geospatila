import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = 'http://localhost:3001/api/data/about.json';

const ManageAbout = () => {
  const [aboutData, setAboutData] = useState({ history: '', mission: '', vision: '', values: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setAboutData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch about data.');
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'values') {
        setAboutData(prev => ({ ...prev, [name]: value.split(',').map(item => item.trim()) }));
    } else {
        setAboutData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleQuillChange = (value) => {
    setAboutData(prev => ({ ...prev, history: value }));
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aboutData),
    })
      .then(res => res.json())
      .then(() => {
        setIsLoading(false);
        alert('About Us content saved successfully!');
      })
      .catch(err => {
        setError('Failed to save content.');
        setIsLoading(false);
      });
  };
  
  if (isLoading) return <p>Loading content...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Manage About Us Page</h1>
        <button onClick={handleSaveChanges} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-500" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div className="text-gray-900">
          <label className="block text-lg font-bold text-gray-300 mb-2">Company History</label>
          <ReactQuill theme="snow" value={aboutData.history} onChange={handleQuillChange} />
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Mission</label>
          <textarea name="mission" value={aboutData.mission} onChange={handleInputChange} rows="4" className="w-full p-2 bg-gray-700 text-white rounded"></textarea>
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Vision</label>
          <textarea name="vision" value={aboutData.vision} onChange={handleInputChange} rows="4" className="w-full p-2 bg-gray-700 text-white rounded"></textarea>
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-300 mb-2">Values (comma-separated)</label>
          <input type="text" name="values" value={aboutData.values?.join(', ')} onChange={handleInputChange} className="w-full p-2 bg-gray-700 text-white rounded" />
        </div>
      </div>
    </div>
  );
};

export default ManageAbout;