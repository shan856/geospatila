import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
const ManageGallery = () => {
const [images, setImages] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [newImage, setNewImage] = useState({ title: '', imageUrl: '' });
const fetchImages = async () => {
setIsLoading(true);
const imagesQuery = query(collection(db, 'gallery'), orderBy('title'));
const imagesSnapshot = await getDocs(imagesQuery);
setImages(imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
setIsLoading(false);
};
useEffect(() => { fetchImages(); }, []);
const handleSave = async (e) => {
e.preventDefault();
if (!newImage.imageUrl || !newImage.title) return alert("Title and Image URL are required.");
setIsLoading(true);
const imageId = image-${Date.now()};
const docRef = doc(db, 'gallery', imageId);
await setDoc(docRef, { ...newImage, id: imageId });
alert('Image added to gallery!');
setNewImage({ title: '', imageUrl: '' });
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
<div>
<h1 className="text-4xl font-bold text-yellow-400 mb-8">Manage Gallery</h1>
<form onSubmit={handleSave} className="bg-gray-800 p-6 rounded-lg mb-8">
<h2 className="text-2xl font-bold mb-4">Add New Image</h2>
<div className="space-y-4">
<input type="text" value={newImage.title} onChange={(e) => setNewImage({...newImage, title: e.target.value})} placeholder="Image Title" className="w-full p-2 bg-gray-700 rounded text-white"/>
<input type="text" value={newImage.imageUrl} onChange={(e) => setNewImage({...newImage, imageUrl: e.target.value})} placeholder="Image URL (e.g., https://...)" className="w-full p-2 bg-gray-700 rounded text-white"/>
</div>
<div className="mt-4"><button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg" disabled={isLoading}>Add Image</button></div>
</form>
{isLoading ? <p className="text-white">Loading Gallery...</p> : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map(image => (
        <div key={image.id} className="relative group">
          <img src={image.imageUrl} alt={image.title} className="w-full h-40 object-cover rounded-lg"/>
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-sm font-bold truncate">{image.title}</p>
            <button onClick={() => handleDelete(image.id)} className="text-red-400 hover:text-red-300 text-xs self-end font-semibold bg-black/50 px-2 py-1 rounded">DELETE</button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
);
export default ManageGallery;