import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesQuery = query(collection(db, 'gallery'), orderBy('title'));
        const imagesSnapshot = await getDocs(imagesQuery);
        setImages(imagesSnapshot.docs.map(doc => doc.data()));
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <div className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16"><h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Gallery</h1><p className="text-lg md:text-xl text-gray-300 mt-4">A showcase of our work and technology in action.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <motion.div key={image.id} layoutId={image.id} onClick={() => setSelectedImage(image)} className="cursor-pointer overflow-hidden rounded-lg shadow-lg" whileHover={{ scale: 1.05, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <img src={image.imageUrl} alt={image.title} className="w-full h-60 object-cover" />
                <div className="p-4 bg-gray-800"><h3 className="text-white font-bold truncate">{image.title}</h3></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div onClick={() => setSelectedImage(null)} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img layoutId={selectedImage.id} src={selectedImage.imageUrl} alt={selectedImage.title} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default GalleryPage;