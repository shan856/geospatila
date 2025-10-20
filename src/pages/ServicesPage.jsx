import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { FaBroadcastTower, FaBuilding, FaLeaf, FaTractor, FaRoute, FaGlobe, FaCode, FaChartBar, FaSatelliteDish, FaHelicopter, FaDatabase, FaLightbulb, FaLaptopCode, FaCube, FaNetworkWired, FaCity } from 'react-icons/fa';

const serviceIcons = {
  FaCode: <FaCode size={32} />,
  FaChartBar: <FaChartBar size={32} />,
  FaSatelliteDish: <FaSatelliteDish size={32} />,
  FaHelicopter: <FaHelicopter size={32} />,
  FaDatabase: <FaDatabase size={32} />,
  FaLightbulb: <FaLightbulb size={32} />,
  FaLaptopCode: <FaLaptopCode size={32} />,
  FaCube: <FaCube size={32} />,
  FaNetworkWired: <FaNetworkWired size={32} />
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    fetch('/data/services.json').then(res => res.json()).then(data => setServices(data));
    fetch('/data/solutions.json').then(res => res.json()).then(data => setSolutions(data));
  }, []);

  const getSolutionIcon = (id) => {
    switch (id) {
        case 'government': return <FaBuilding />;
        case 'utilities': return <FaBroadcastTower />;
        case 'environment': return <FaLeaf />;
        case 'agriculture': return <FaTractor />;
        case 'transportation': return <FaRoute />;
        case 'real-estate': return <FaCity />;
        default: return <FaGlobe />;
    }
  }

  return (
    <div className="bg-primary-bg">
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-accent">Our Services</h1>
            <p className="text-lg md:text-xl text-text-secondary mt-4">A complete spectrum of geospatial solutions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <Card key={service.id} title={service.title} imageUrl={service.imageUrl} icon={serviceIcons[service.icon]}>
                {service.description}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary-bg">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary">Solutions by Sector</h2>
              <p className="text-lg md:text-xl text-text-secondary mt-4">Applying spatial intelligence across industries.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map(solution => (
                  <Card key={solution.id} title={solution.title} icon={getSolutionIcon(solution.id)}>
                    {solution.description}
                  </Card>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;