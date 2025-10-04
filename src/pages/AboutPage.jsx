import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaRocket, FaHandshake, FaUsers } from 'react-icons/fa';
import Card from '../components/Card';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    // Correctly fetches from the local public/data folder
    fetch('/data/about.json')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error("Could not load about data:", err));
  }, []);

  return (
    <div className="py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">About GeoSpatial Innovations</h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4">Revealing the power of location intelligence.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20">
          <div><img src="/uploads/team-photo.jpg" alt="Team" className="rounded-lg shadow-2xl"/></div>
          <div className="bg-gray-800 p-6 md:p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="text-gray-300 leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: aboutData.history }} />
          </div>
        </div>
        <div className="mb-16 md:mb-20">
          <Card title="Our Team" icon={<FaUsers size={40} />}>
            {aboutData.team_summary}
          </Card>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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