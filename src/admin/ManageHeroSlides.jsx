import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaImage } from 'react-icons/fa';

const ManageHeroSlides = () => {
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSlide, setEditingSlide] = useState(null);

    const fetchSlides = async () => {
        setIsLoading(true);
        try {
            const slidesQuery = query(collection(db, 'heroSlides'), orderBy('order'));
            const snapshot = await getDocs(slidesQuery);
            setSlides(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => { fetchSlides(); }, []);

    const handleSave = async () => {
        if (!editingSlide || !editingSlide.title) return alert("Title is required.");
        if (!editingSlide.imageUrl) return alert("Image URL is required.");

        setIsLoading(true);
        const docRef = doc(db, 'heroSlides', String(editingSlide.id));
        await setDoc(docRef, {
            ...editingSlide,
            order: editingSlide.order || slides.length + 1,
        }, { merge: true });
        alert('Slide saved!');
        setEditingSlide(null);
        await fetchSlides();
        setIsLoading(false);
    };

    const handleDelete = async (slideId) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            setIsLoading(true);
            await deleteDoc(doc(db, 'heroSlides', String(slideId)));
            alert('Slide deleted!');
            await fetchSlides();
            setIsLoading(false);
        }
    };

    if (isLoading && slides.length === 0) {
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
                    <h1 className="text-3xl font-display font-bold text-text-primary">Manage Hero Slides</h1>
                    <p className="text-text-secondary mt-1">Add, edit, or delete homepage hero slides</p>
                </div>
                <button
                    onClick={() => setEditingSlide({
                        id: String(Date.now()),
                        title: '',
                        subtitle: '',
                        imageUrl: '',
                        order: slides.length + 1
                    })}
                    className="btn-primary inline-flex items-center gap-2"
                >
                    <FaPlus /> Add New Slide
                </button>
            </div>

            {/* Edit Form */}
            <AnimatePresence>
                {editingSlide && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-card p-6"
                    >
                        <h2 className="text-xl font-display font-bold text-text-primary mb-6">
                            {slides.find(s => s.id === editingSlide.id) ? 'Edit Slide' : 'Add New Slide'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-text-primary mb-2">Title *</label>
                                <input
                                    value={editingSlide.title}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                                    placeholder="e.g., Transform Geospatial Data"
                                    className="input-glass"
                                />
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-text-primary mb-2">Subtitle</label>
                                <input
                                    value={editingSlide.subtitle}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                                    placeholder="e.g., Expert GIS solutions for your business"
                                    className="input-glass"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">Image URL *</label>
                                <input
                                    value={editingSlide.imageUrl}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="input-glass"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-primary mb-2">Order</label>
                                <input
                                    type="number"
                                    value={editingSlide.order}
                                    onChange={(e) => setEditingSlide({ ...editingSlide, order: parseInt(e.target.value) })}
                                    placeholder="1"
                                    className="input-glass"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        {editingSlide.imageUrl && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-text-primary mb-2">Preview</label>
                                <div className="relative h-40 rounded-xl overflow-hidden">
                                    <img
                                        src={editingSlide.imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center p-6">
                                        <div>
                                            <h3 className="text-white text-lg font-bold">{editingSlide.title || 'Title'}</h3>
                                            <p className="text-white/80 text-sm">{editingSlide.subtitle || 'Subtitle'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 mt-6 pt-4 border-t border-glass-border">
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <FaSave /> Save Slide
                            </button>
                            <button
                                onClick={() => setEditingSlide(null)}
                                className="px-6 py-3 rounded-xl font-medium text-text-secondary bg-secondary-bg hover:bg-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slides List */}
            <div className="space-y-4">
                {slides.map((slide, index) => (
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                                {slide.order || index + 1}
                            </div>
                            {slide.imageUrl && (
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    className="w-24 h-16 object-cover rounded-lg"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="font-semibold text-text-primary">{slide.title}</h3>
                                <p className="text-sm text-text-secondary truncate max-w-md">{slide.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditingSlide({ ...slide })}
                                className="px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors inline-flex items-center gap-2"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(slide.id)}
                                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors inline-flex items-center gap-2"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {slides.length === 0 && !isLoading && (
                <div className="text-center py-12 glass-card">
                    <FaImage className="text-4xl text-text-muted mx-auto mb-4" />
                    <p className="text-text-secondary">No hero slides found. Add your first slide!</p>
                </div>
            )}
        </div>
    );
};

export default ManageHeroSlides;
