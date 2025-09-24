import React, { useState, useEffect } from 'react';

const API_URL = '/api/data/services.json'; // Use relative URL

const ManageServices = () => {
  // ... (rest of the component logic)
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data => {
      setServices(data);
      setIsLoading(false);
    }).catch(() => {
      setError('Failed to fetch services.');
      setIsLoading(false);
    });
  }, []);

  const saveData = (updatedData) => {
    setIsLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
    .then(res => {
      if (!res.ok) throw new Error('Saving is disabled on the live server. Please run locally to make changes.');
      return res.json();
    })
    .then(() => {
        setServices(updatedData);
        setIsLoading(false);
        alert('Changes saved successfully!');
    })
    .catch((err) => {
        alert(err.message); // Show the specific error
        setError('Failed to save changes.');
        setIsLoading(false);
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingService(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setEditingService({ id: `service-${Date.now()}`, title: '', description: '' });
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedServices = services.filter(s => s.id !== serviceId);
      saveData(updatedServices);
    }
  };

  const handleSaveForm = () => {
    let updatedServices;
    if (services.find(s => s.id === editingService.id)) {
      updatedServices = services.map(s => s.id === editingService.id ? editingService : s);
    } else {
      updatedServices = [...services, editingService];
    }
    saveData(updatedServices);
    setEditingService(null);
  };

  if (isLoading && !services.length) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Manage Services</h1>
      <div className="text-right mb-4"><button onClick={handleAddNew} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">Add New Service</button></div>

      {editingService && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}</h2>
          <div className="space-y-4">
            <input type="text" name="title" value={editingService.title} onChange={handleInputChange} placeholder="Service Title" className="w-full p-2 bg-gray-700 rounded"/>
            <textarea name="description" value={editingService.description} onChange={handleInputChange} placeholder="Service Description" rows="4" className="w-full p-2 bg-gray-700 rounded"></textarea>
          </div>
          <div className="mt-4">
            <button onClick={handleSaveForm} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600">Save Changes</button>
            <button onClick={() => setEditingService(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <table className="w-full bg-gray-800 rounded-lg">
        <thead>
          <tr className="border-b border-gray-700"><th className="text-left p-4">Title</th><th className="text-left p-4">Description</th><th className="text-left p-4">Actions</th></tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id} className="border-b border-gray-700">
              <td className="p-4 align-top">{service.title}</td><td className="p-4 align-top">{service.description}</td>
              <td className="p-4 align-top"><button onClick={() => setEditingService({...service})} className="text-blue-400 hover:underline mr-4">Edit</button><button onClick={() => handleDelete(service.id)} className="text-red-400 hover:underline">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageServices;