import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLightbulb, FaRocket, FaHandshake } from 'react-icons/fa';
import Card from '../components/Card';
import HeroSlideshow from '../components/HeroSlideshow';

const HomePage = () => {
  const [aboutData, setAboutData] = useState({});
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    import('../data/about.json').then(data => setAboutData(data.default));
    import('../data/services.json').then(data => setServices(data.default.slice(0, 3)));
    import('../data/projects.json').then(data => setProjects(data.default.slice(0, 2)));
  }, []);

  return (
    <div>
      <HeroSlideshow />
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">Our Guiding Principles</h2>
            <div className="grid md:grid-cols-3 gap-10">
                <Card title="Our Mission" icon={<FaRocket/>}>{aboutData.mission}</Card>
                <Card title="Our Vision" icon={<FaLightbulb/>}>{aboutData.vision}</Card>
                <Card title="Our Values" icon={<FaHandshake/>}>{aboutData.values?.join(', ')}</Card>
            </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">A Spectrum of GIS Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map(service => (<Card key={service.id} title={service.title}>{service.description}</Card>))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="text-yellow-400 font-bold text-lg hover:underline">View All Services <FaArrowRight className="inline ml-2" /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Project Showcase</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map(project => (
              <motion.div 
                key={project.id} 
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover"/>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4"><strong>Impact:</strong> {project.impact}</p>
                  <Link to="/projects" className="text-yellow-400 font-semibold hover:underline">Read Case Study <FaArrowRight className="inline ml-1" /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section with Correct Button Style */}
      <section className="py-20 text-center px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Unlock Your Geospatial Potential?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">Let's discuss how our expertise can drive your success.</p>
          <Link to="/contact" className="btn-primary text-xl">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
