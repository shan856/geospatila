import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaRocket, FaHandshake } from 'react-icons/fa';
import Card from '../components/Card';
import { db } from '../firebaseConfig'; // Import the Firebase database instance
import { doc, getDoc } from 'firebase/firestore';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    // Fetch the single 'about' document from the 'single_pages' collection
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'single_pages', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          console.log("No about document found!");
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <div className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-yellow-400">About GeoSpatial Innovations</h1>
          <p className="text-xl text-gray-300 mt-4">Revealing the power of location intelligence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img 
              src="/uploads/team-photo.jpg" 
              alt="GeoSpatial Innovations Team" 
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div 
              className="text-gray-300 leading-relaxed prose prose-invert max-w-none" 
              dangerouslySetInnerHTML={{ __html: aboutData.history }} 
            />
            <p className="text-gray-300 leading-relaxed mt-4">
              We believe that <strong className="text-yellow-400">where</strong> things happen is as critical as <strong className="text-yellow-400">what</strong> happens. By integrating this spatial context, we provide our clients with a profound competitive advantage and a clearer path to success.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-center mb-12">Our Guiding Principles</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Card title="Our Mission" icon={<FaRocket size={40} />}>{aboutData.mission}</Card>
            <Card title="Our Vision" icon={<FaLightbulb size={40} />}>{aboutData.vision}</Card>
            <Card title="Our Values" icon={<FaHandshake size={40} />}>{aboutData.values?.join(', ')}</Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;