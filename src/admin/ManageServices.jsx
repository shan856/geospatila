import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaGripVertical } from 'react-icons/fa';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useToast } from '../components/Toast';

const ManageServices = () => {
    const toast = useToast();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'map',
        features: [''],
        order: 0,
    });

    const iconOptions = [
        { value: 'map', label: 'Map/GIS', svg: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
        { value: 'drone', label: 'Drone/Aerial', svg: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
        { value: 'globe', label: 'Globe/Remote Sensing', svg: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { value: 'chart', label: 'Chart/Analytics', svg: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { value: 'image', label: 'Image/LiDAR', svg: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { value: 'lightbulb', label: 'Lightbulb/Consulting', svg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    ];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, 'services'), orderBy('order', 'asc'));
            const snapshot = await getDocs(q);
            const servicesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(servicesData);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures.length ? newFeatures : [''] }));
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', icon: 'map', features: [''], order: services.length });
        setEditingId(null);
        setShowAddForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanedFeatures = formData.features.filter(f => f.trim() !== '');

        try {
            if (editingId) {
                await updateDoc(doc(db, 'services', editingId), {
                    ...formData,
                    features: cleanedFeatures,
                });
                toast.success('Service updated successfully!');
            } else {
                await addDoc(collection(db, 'services'), {
                    ...formData,
                    features: cleanedFeatures,
                    order: services.length,
                });
                toast.success('Service added successfully!');
            }
            fetchServices();
            resetForm();
        } catch (error) {
            console.error('Error saving service:', error);
            toast.error('Error saving service. Please try again.');
        }
    };

    const handleEdit = (service) => {
        setFormData({
            title: service.title || '',
            description: service.description || '',
            icon: service.icon || 'map',
            features: service.features?.length ? service.features : [''],
            order: service.order || 0,
        });
        setEditingId(service.id);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteDoc(doc(db, 'services', id));
                toast.success('Service deleted successfully!');
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
                toast.error('Error deleting service. Please try again.');
            }
        }
    };

    const getIconSvg = (iconValue) => {
        const icon = iconOptions.find(i => i.value === iconValue);
        return icon?.svg || iconOptions[0].svg;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-primary">
                        Manage <span className="text-gradient">Services</span>
                    </h1>
                    <p className="text-text-secondary mt-1">Add, edit, or remove services displayed on your website.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { resetForm(); setShowAddForm(true); }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add Service
                </motion.button>
            </div>

            {/* Add/Edit Form */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-card p-6"
                    >
                        <h2 className="text-xl font-semibold text-text-primary mb-6">
                            {editingId ? 'Edit Service' : 'Add New Service'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Service Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="input-glass"
                                        placeholder="e.g., GIS Mapping & Analysis"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Icon
                                    </label>
                                    <select
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleInputChange}
                                        className="input-glass"
                                    >
                                        {iconOptions.map(icon => (
                                            <option key={icon.value} value={icon.value}>{icon.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="input-glass resize-none"
                                    rows={3}
                                    placeholder="Brief description of the service..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">
                                    Features
                                </label>
                                <div className="space-y-3">
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                className="input-glass flex-1"
                                                placeholder="e.g., Custom map creation"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1"
                                    >
                                        <FaPlus className="text-xs" /> Add Feature
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-primary flex items-center gap-2"
                                >
                                    <FaSave /> {editingId ? 'Update' : 'Save'} Service
                                </motion.button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Services List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
                    <p className="text-text-secondary mt-4">Loading services...</p>
                </div>
            ) : services.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <p className="text-text-secondary mb-4">No services added yet.</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="text-accent hover:underline"
                    >
                        Add your first service
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-6 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="icon-gradient">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIconSvg(service.icon)} />
                                    </svg>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">{service.title}</h3>
                            <p className="text-text-secondary text-sm mb-4 line-clamp-2">{service.description}</p>
                            {service.features?.length > 0 && (
                                <ul className="space-y-1">
                                    {service.features.slice(0, 3).map((feature, idx) => (
                                        <li key={idx} className="text-xs text-text-muted flex items-center gap-2">
                                            <span className="w-1 h-1 bg-geo-accent rounded-full" />
                                            {feature}
                                        </li>
                                    ))}
                                    {service.features.length > 3 && (
                                        <li className="text-xs text-accent">+{service.features.length - 3} more</li>
                                    )}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageServices;
