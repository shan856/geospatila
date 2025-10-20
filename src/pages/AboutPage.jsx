import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaRocket, FaHandshake, FaUsers } from 'react-icons/fa';
import Card from '../components/Card';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    fetch('/data/about.json')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error("Could not load about data:", err));
  }, []);

  return (
    <div className="bg-primary-bg">
      <section className="py-16 md:py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent">About RRtechGeo</h1>
          <p className="text-lg md:text-xl text-text-secondary mt-4">Revealing the power of location intelligence.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary-bg">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div><img src="/uploads/team-photo.png" alt="Team" className="rounded-lg shadow-2xl"/></div>
            <div className="p-0 md:p-8">
              <h2 className="text-3xl font-bold mb-4 text-text-primary">Our Story</h2>
              <div 
                className="text-text-secondary leading-relaxed prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: aboutData.history }} 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary-bg">
        <div className="container mx-auto px-6">
          <Card title="Our Team" icon={<FaUsers size={40} className="text-accent" />}>
            {aboutData.team_summary}
          </Card>
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-secondary-bg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <Card title="Our Mission" icon={<FaRocket size={40} className="text-accent" />}>{aboutData.mission}</Card>
            <Card title="Our Vision" icon={<FaLightbulb size={40} className="text-accent" />}>{aboutData.vision}</Card>
            <Card title="Our Values" icon={<FaHandshake size={40} className="text-accent" />}>{aboutData.values?.join(', ')}</Card>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;