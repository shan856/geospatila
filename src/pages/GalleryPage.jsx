import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import FloatingOrbs from '../components/FloatingOrbs';
import SEO from '../components/SEO';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch gallery from Firebase
  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const galleryQuery = query(collection(db, 'gallery'), orderBy('title'));
        const snapshot = await getDocs(galleryQuery);
        const galleryData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          src: doc.data().imageUrl || doc.data().src,
          category: doc.data().category || 'Aerial',
        }));

        if (galleryData.length > 0) {
          setImages(galleryData);
        } else {
          // Fallback to sample data if no Firebase data
          setImages(sampleImages);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setImages(sampleImages);
      }
      setIsLoading(false);
    };

    fetchGallery();
  }, []);

  const sampleImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800', category: 'Aerial', title: 'Coastal Aerial View' },
    { id: 2, src: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800', category: 'Mapping', title: 'Terrain Mapping' },
    { id: 3, src: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800', category: 'Satellite', title: 'City Grid Analysis' },
    { id: 4, src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', category: 'Satellite', title: 'Night Lights Data' },
    { id: 5, src: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=800', category: 'Drone', title: 'Agricultural Survey' },
    { id: 6, src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800', category: 'Aerial', title: 'Urban Development' },
  ];

  // Get unique categories from images
  const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))];

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <div className="relative bg-white pt-24">
      <SEO
        title="Gallery"
        description="Explore stunning aerial imagery and mapping results from RRtechGeo's geospatial projects."
        keywords="aerial photography gallery, mapping results showcase, satellite imagery examples"
      />
      <FloatingOrbs />

      {/* Hero Section */}
      <section className="relative py-24 mesh-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-geo-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Visual Showcase</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-6"
            >
              Our <span className="text-gradient">Gallery</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Browse through stunning visuals from our geospatial projects and aerial surveys.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${activeCategory === category
                  ? 'bg-gradient-to-r from-accent to-geo-accent text-white shadow-glow'
                  : 'bg-white text-text-secondary border border-glass-border hover:border-accent hover:text-accent'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : (
            /* Gallery Grid */
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedImage(image)}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer group ${index % 5 === 0 ? 'row-span-2' : ''
                      }`}
                  >
                    <img
                      src={image.src || image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ minHeight: index % 5 === 0 ? '400px' : '200px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="px-3 py-1 bg-white/90 text-accent text-xs font-semibold rounded-full">
                        {image.category}
                      </span>
                      <h4 className="text-white font-semibold mt-2">{image.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img
                src={selectedImage.src || selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-2">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-text-primary hover:bg-accent hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;