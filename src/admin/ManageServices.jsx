import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const servicesCollection = collection(db, 'services');
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesList.sort((a, b) => a.title.localeCompare(b.title)));
    } catch (error) {
      alert("Failed to fetch services.");
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSave = async () => {
    if (!editingService || !editingService.title) {
      alert("Title is required.");
      return;
    }
    setIsLoading(true);
    const serviceToSave = { ...editingService };
    const docRef = doc(db, 'services', serviceToSave.id);
    try {
      await setDoc(docRef, serviceToSave, { merge: true });
      alert('Service saved successfully!');
      setEditingService(null);
      await fetchServices(); // Refresh the list
    } catch (error) {
      alert(`Error saving service: ${error.message}`);
    }
    setIsLoading(false);
  };
  
  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setIsLoading(true);
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        alert('Service deleted!');
        await fetchServices(); // Refresh the list
      } catch (error) {
        alert(`Error deleting service: ${error.message}`);
      }
      setIsLoading(false);
    }
  };

  if (isLoading && !services.length) return <p className="text-white">Loading Services...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Manage Services</h1>
      <div className="text-right mb-4"><button onClick={() => setEditingService({ id: `service-${Date.now()}`, title: '', description: '' })} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">Add New Service</button></div>
      {editingService && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}</h2>
          <div className="space-y-4">
            <input type="text" value={editingService.title} onChange={(e) => setEditingService({...editingService, title: e.target.value})} placeholder="Service Title" className="w-full p-2 bg-gray-700 rounded text-white"/>
            <textarea value={editingService.description} onChange={(e) => setEditingService({...editingService, description: e.target.value})} placeholder="Service Description" rows="4" className="w-full p-2 bg-gray-700 rounded text-white"></textarea>
          </div>
          <div className="mt-4"><button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600">Save</button><button onClick={() => setEditingService(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button></div>
        </div>
      )}
      <table className="w-full bg-gray-800 rounded-lg">
        <thead><tr className="border-b border-gray-700"><th className="text-left p-4">Title</th><th className="text-left p-4">Description</th><th className="text-left p-4">Actions</th></tr></thead>
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