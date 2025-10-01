import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    setProjects(projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setIsLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = async () => {
    if (!editingProject || !editingProject.title) return alert("Project Title is required.");
    if (!editingProject.imageUrl || editingProject.imageUrl === '/uploads/placeholder.jpg' || editingProject.imageUrl.trim() === '') {
      return alert("An Image URL is required for all projects.");
    }
    
    setIsLoading(true);
    const docRef = doc(db, 'projects', String(editingProject.id));
    await setDoc(docRef, editingProject, { merge: true });
    alert('Project saved!');
    setEditingProject(null);
    await fetchProjects();
    setIsLoading(false);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure?')) {
      setIsLoading(true);
      await deleteDoc(doc(db, 'projects', String(projectId)));
      alert('Project deleted!');
      await fetchProjects();
      setIsLoading(false);
    }
  };
  
  if (isLoading && projects.length === 0) return <p className="text-white">Loading Projects...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Manage Projects</h1>
      <div className="text-right mb-4"><button onClick={() => setEditingProject({ id: String(Date.now()), title: '', client: '', challenge: '', solution: '', impact: '', imageUrl: '' })} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">Add New Project</button></div>
      {editingProject && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'Add New Project'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={editingProject.title} onChange={(e) => setEditingProject({...editingProject, title: e.target.value})} placeholder="Project Title" className="col-span-1 p-2 bg-gray-700 rounded text-white" />
            <input value={editingProject.client} onChange={(e) => setEditingProject({...editingProject, client: e.target.value})} placeholder="Client Name" className="col-span-1 p-2 bg-gray-700 rounded text-white" />
            <input value={editingProject.imageUrl} onChange={(e) => setEditingProject({...editingProject, imageUrl: e.target.value})} placeholder="Image URL (Compulsory)" className="col-span-1 p-2 bg-gray-700 rounded text-white" />
            <input value={editingProject.impact} onChange={(e) => setEditingProject({...editingProject, impact: e.target.value})} placeholder="Impact Statement" className="col-span-1 p-2 bg-gray-700 rounded text-white" />
            <div className="col-span-2 text-gray-900"><p className="text-sm text-gray-300 mb-1">Challenge:</p><ReactQuill theme="snow" value={editingProject.challenge} onChange={(val) => setEditingProject({...editingProject, challenge: val})} /></div>
            <div className="col-span-2 text-gray-900"><p className="text-sm text-gray-300 mb-1">Solution:</p><ReactQuill theme="snow" value={editingProject.solution} onChange={(val) => setEditingProject({...editingProject, solution: val})} /></div>
          </div>
          <div className="mt-4"><button onClick={handleSave} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600" disabled={isLoading}>Save</button><button onClick={() => setEditingProject(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button></div>
        </div>
      )}
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center"><img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-md mr-4"/><div className='text-white'><h3 className="font-bold text-lg">{project.title}</h3><p className="text-sm text-gray-400">{project.client}</p></div></div>
            <div><button onClick={() => setEditingProject({...project})} className="text-blue-400 hover:underline mr-4">Edit</button><button onClick={() => handleDelete(project.id)} className="text-red-400 hover:underline">Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ManageProjects;