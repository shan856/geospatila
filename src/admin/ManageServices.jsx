import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, orderBy, query } from 'firebase/firestore';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    setIsLoading(true);
    const servicesQuery = query(collection(db, 'services'), orderBy('title'));
    const servicesSnapshot = await getDocs(servicesQuery);
    setServices(servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setIsLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSave = async () => {
    if (!editingService || !editingService.title) return alert("Title is required.");
    
    setIsLoading(true);
    const serviceToSave = { 
      ...editingService,
      imageUrl: editingService.imageUrl || '' // Ensure imageUrl is saved
    };
    const docRef = doc(db, 'services', serviceToSave.id);
    await setDoc(docRef, serviceToSave, { merge: true });
    alert('Service saved!');
    setEditingService(null);
    await fetchServices();
    setIsLoading(false);
  };
  
  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure?')) {
      setIsLoading(true);
      await deleteDoc(doc(db, 'services', serviceId));
      alert('Service deleted!');
      await fetchServices();
      setIsLoading(false);
    }
  };

  if (isLoading && services.length === 0) return <p className="text-white">Loading Services...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Manage Services</h1>
      <div className="text-right mb-4"><button onClick={() => setEditingService({ id: `service-${Date.now()}`, title: '', description: '', imageUrl: '' })} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">Add New Service</button></div>
      
      {editingService && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{services.find(s => s.id === editingService.id) ? 'Edit Service' : 'Add New Service'}</h2>
          <div className="space-y-4">
            <input type="text" value={editingService.title} onChange={(e) => setEditingService({...editingService, title: e.target.value})} placeholder="Service Title" className="w-full p-2 bg-gray-700 rounded text-white"/>
            <textarea value={editingService.description} onChange={(e) => setEditingService({...editingService, description: e.target.value})} placeholder="Service Description" rows="4" className="w-full p-2 bg-gray-700 rounded text-white"></textarea>
            <input type="text" value={editingService.imageUrl || ''} onChange={(e) => setEditingService({...editingService, imageUrl: e.target.value})} placeholder="Image URL (Optional)" className="w-full p-2 bg-gray-700 rounded text-white"/>
          </div>
          <div className="mt-4"><button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600" disabled={isLoading}>Save</button><button onClick={() => setEditingService(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button></div>
        </div>
      )}

      <div className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              <img src={service.imageUrl || '/uploads/placeholder.jpg'} alt={service.title} className="w-16 h-16 object-cover rounded-md mr-4"/>
              <div className='text-white'><h3 className="font-bold text-lg">{service.title}</h3></div>
            </div>
            <div><button onClick={() => setEditingService({...service})} className="text-blue-400 hover:underline mr-4">Edit</button><button onClick={() => handleDelete(service.id)} className="text-red-400 hover:underline">Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ManageServices;