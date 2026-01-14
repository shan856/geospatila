import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useToast } from '../components/Toast';

const ManageProjects = () => {
  const toast = useToast();
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
    if (!editingProject || !editingProject.title) return toast.warning("Project Title is required.");
    if (!editingProject.imageUrl || editingProject.imageUrl.trim() === '') {
      return toast.warning("An Image URL is required for all projects.");
    }

    setIsLoading(true);
    try {
      const docRef = doc(db, 'projects', String(editingProject.id));
      await setDoc(docRef, editingProject, { merge: true });
      toast.success('Project saved!');
      setEditingProject(null);
      await fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Error saving project. Please try again.');
    }
    setIsLoading(false);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      try {
        await deleteDoc(doc(db, 'projects', String(projectId)));
        toast.success('Project deleted!');
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Error deleting project. Please try again.');
      }
      setIsLoading(false);
    }
  };

  if (isLoading && projects.length === 0) {
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
          <h1 className="text-3xl font-display font-bold text-text-primary">Manage Projects</h1>
          <p className="text-text-secondary mt-1">Add, edit, or delete project case studies</p>
        </div>
        <button
          onClick={() => setEditingProject({ id: String(Date.now()), title: '', client: '', challenge: '', solution: '', impact: '', imageUrl: '' })}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FaPlus /> Add New Project
        </button>
      </div>

      {/* Edit Form Modal */}
      <AnimatePresence>
        {editingProject && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-display font-bold text-text-primary mb-6">
              {projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'Add New Project'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Project Title *</label>
                <input
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Project Title"
                  className="input-glass"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Client Name</label>
                <input
                  value={editingProject.client}
                  onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                  placeholder="Client Name"
                  className="input-glass"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Image URL *</label>
                <input
                  value={editingProject.imageUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="input-glass"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Impact Statement</label>
                <input
                  value={editingProject.impact}
                  onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                  placeholder="Impact Statement"
                  className="input-glass"
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-text-primary mb-2">Challenge</label>
                <div className="bg-white rounded-xl border border-glass-border">
                  <ReactQuill
                    theme="snow"
                    value={editingProject.challenge}
                    onChange={(val) => setEditingProject({ ...editingProject, challenge: val })}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-text-primary mb-2">Solution</label>
                <div className="bg-white rounded-xl border border-glass-border">
                  <ReactQuill
                    theme="snow"
                    value={editingProject.solution}
                    onChange={(val) => setEditingProject({ ...editingProject, solution: val })}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-glass-border">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FaSave /> Save Project
              </button>
              <button
                onClick={() => setEditingProject(null)}
                className="px-6 py-3 rounded-xl font-medium text-text-secondary bg-secondary-bg hover:bg-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div>
                <h3 className="font-semibold text-text-primary">{project.title}</h3>
                <p className="text-sm text-text-secondary">{project.client}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingProject({ ...project })}
                className="px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && !isLoading && (
        <div className="text-center py-12 glass-card">
          <p className="text-text-secondary">No projects found. Add your first project!</p>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;