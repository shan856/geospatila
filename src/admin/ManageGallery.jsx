import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newImage, setNewImage] = useState({ title: '', imageUrl: '', category: '' });

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const imagesQuery = query(collection(db, 'gallery'), orderBy('title'));
      const imagesSnapshot = await getDocs(imagesQuery);
      setImages(imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newImage.imageUrl || !newImage.title) return alert("Title and Image URL are required.");
    setIsLoading(true);

    const imageId = `image-${Date.now()}`;
    const docRef = doc(db, 'gallery', imageId);
    await setDoc(docRef, { ...newImage, id: imageId });
    alert('Image added to gallery!');
    setNewImage({ title: '', imageUrl: '', category: '' });
    await fetchImages();
  };

  const handleDelete = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setIsLoading(true);
      await deleteDoc(doc(db, 'gallery', imageId));
      alert('Image deleted!');
      await fetchImages();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary">Manage Gallery</h1>
        <p className="text-text-secondary mt-1">Add or remove images from the public gallery</p>
      </div>

      {/* Add New Image Form */}
      <form onSubmit={handleSave} className="glass-card p-6">
        <h2 className="text-xl font-display font-bold text-text-primary mb-4 flex items-center gap-2">
          <FaImage className="text-accent" /> Add New Image
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Image Title *</label>
            <input
              type="text"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              placeholder="e.g., Aerial City View"
              className="input-glass"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Image URL *</label>
            <input
              type="text"
              value={newImage.imageUrl}
              onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
              placeholder="https://..."
              className="input-glass"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
            <select
              value={newImage.category}
              onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
              className="input-glass"
            >
              <option value="">Select category</option>
              <option value="Aerial">Aerial</option>
              <option value="Satellite">Satellite</option>
              <option value="Drone">Drone</option>
              <option value="Mapping">Mapping</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center gap-2"
          >
            <FaPlus /> Add Image
          </button>
        </div>
      </form>

      {/* Gallery Grid */}
      {isLoading && images.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence>
            {images.map(image => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group rounded-xl overflow-hidden bg-white shadow-card"
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                  <div>
                    {image.category && (
                      <span className="px-2 py-1 bg-accent text-white text-xs font-medium rounded-full">
                        {image.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-white text-sm font-medium truncate flex-1 mr-2">{image.title}</p>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {images.length === 0 && !isLoading && (
        <div className="text-center py-12 glass-card">
          <FaImage className="text-4xl text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">No images in gallery. Add your first image!</p>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;