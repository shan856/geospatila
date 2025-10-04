import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { FaBroadcastTower, FaBuilding, FaLeaf, FaTractor, FaRoute, FaGlobe } from 'react-icons/fa';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    // Both files are now loaded statically from the public folder
    fetch('/data/services.json')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Could not load services data:", err));
      
    fetch('/data/solutions.json')
      .then(res => res.json())
      .then(data => setSolutions(data))
      .catch(err => console.error("Could not load solutions data:", err));
  }, []);

  const getIcon = (id) => {
    switch (id) {
        case 'government': return <FaBuilding />;
        case 'utilities': return <FaBroadcastTower />;
        case 'environment': return <FaLeaf />;
        case 'agriculture': return <FaTractor />;
        case 'transportation': return <FaRoute />;
        default: return <FaGlobe />;
    }
  }

  return (
    <div className="py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16"><h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Our Services</h1><p className="text-lg md:text-xl text-gray-300 mt-4">A complete spectrum of geospatial solutions.</p></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (<Card key={service.id} title={service.title} imageUrl={service.imageUrl}>{service.description}</Card>))}
        </div>
        <div className="mt-20 md:mt-24">
            <div className="text-center mb-12 md:mb-16"><h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">Solutions by Sector</h2><p className="text-lg md:text-xl text-gray-300 mt-4">Applying spatial intelligence across industries.</p></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map(solution => (<Card key={solution.id} title={solution.title} icon={getIcon(solution.id)}>{solution.description}</Card>))}
            </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;