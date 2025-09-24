import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = '/api/data/projects.json'; // Use relative URL
const UPLOAD_URL = '/api/upload'; // Use relative URL

const ManageProjects = () => {
  // ... (rest of the component logic)
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data => {
      setProjects(data);
      setIsLoading(false);
    }).catch(err => {
      setError('Failed to fetch projects.');
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
        setProjects(updatedData);
        setIsLoading(false);
        alert('Changes saved successfully!');
    })
    .catch(err => {
        alert(err.message);
        setError('Failed to save changes.');
        setIsLoading(false);
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProject(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const handleQuillChange = (value, name) => {
    setEditingProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setEditingProject({ 
        id: `project-${Date.now()}`, 
        title: '', client: '', challenge: '', solution: '', impact: '',
        imageUrl: '/uploads/placeholder.jpg'
    });
    setSelectedFile(null);
  };
  
  const handleEdit = (project) => {
    setEditingProject({ ...project });
    setSelectedFile(null);
  };
  
  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      saveData(updatedProjects);
    }
  };

  const handleSaveForm = async () => {
    setIsLoading(true);
    let projectToSave = { ...editingProject };

    if (selectedFile) {
      const formData = new FormData();
      formData.append('projectImage', selectedFile);

      try {
        const uploadRes = await fetch(UPLOAD_URL, { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('Image upload failed on server.');
        
        const uploadData = await uploadRes.json();
        projectToSave.imageUrl = uploadData.filePath;
      } catch (err) {
        alert(`Error uploading image: ${err.message}`);
        setIsLoading(false);
        return;
      }
    }

    let updatedProjects;
    if (projects.find(p => p.id === projectToSave.id)) {
        updatedProjects = projects.map(p => p.id === projectToSave.id ? projectToSave : p);
    } else {
        updatedProjects = [...projects, projectToSave];
    }
    
    saveData(updatedProjects);
    setEditingProject(null);
    setSelectedFile(null);
  };
  
  if (isLoading && !projects.length) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Manage Projects</h1>
      <div className="text-right mb-4"><button onClick={handleAddNew} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">Add New Project</button></div>

      {editingProject && (
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">{editingProject.id.startsWith('new') ? 'Add New Project' : 'Edit Project'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" value={editingProject.title} onChange={handleInputChange} placeholder="Project Title" className="col-span-1 p-2 bg-gray-700 rounded" />
            <input name="client" value={editingProject.client} onChange={handleInputChange} placeholder="Client Name" className="col-span-1 p-2 bg-gray-700 rounded" />
            <div className="col-span-1">
                <label className="text-sm text-gray-400 mb-1 block">Project Image</label>
                <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"/>
                <p className="text-xs text-gray-500 mt-1">Current: {editingProject.imageUrl}</p>
            </div>
            <input name="impact" value={editingProject.impact} onChange={handleInputChange} placeholder="Impact Statement" className="col-span-1 p-2 bg-gray-700 rounded" />
            <div className="col-span-2 text-gray-900"><p className="text-sm text-gray-300 mb-1">Challenge:</p><ReactQuill theme="snow" value={editingProject.challenge} onChange={(val) => handleQuillChange(val, 'challenge')} /></div>
            <div className="col-span-2 text-gray-900"><p className="text-sm text-gray-300 mb-1">Solution:</p><ReactQuill theme="snow" value={editingProject.solution} onChange={(val) => handleQuillChange(val, 'solution')} /></div>
          </div>
          <div className="mt-4">
            <button onClick={handleSaveForm} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-2 hover:bg-green-600" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</button>
            <button onClick={() => setEditingProject(null)} className="bg-gray-600 text-white py-2 px-4 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
      {projects.map(project => (
        <div key={project.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center"><img src={project.imageUrl} alt={project.title} className="w-16 h-16 object-cover rounded-md mr-4"/>
                <div><h3 className="font-bold text-lg">{project.title}</h3><p className="text-sm text-gray-400">{project.client}</p></div>
            </div>
            <div>
                <button onClick={() => handleEdit(project)} className="text-blue-400 hover:underline mr-4">Edit</button>
                <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:underline">Delete</button>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ManageProjects;