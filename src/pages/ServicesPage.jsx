import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { FaBroadcastTower, FaBuilding, FaLeaf, FaTractor, FaRoute, FaGlobe } from 'react-icons/fa';
import { db } from '../firebaseConfig'; // Import the Firebase database instance
import { collection, getDocs } from 'firebase/firestore';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [solutions, setSolutions] = useState([]); // Assuming solutions are static for now

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesCollection = collection(db, 'services');
        const servicesSnapshot = await getDocs(servicesCollection);
        const servicesList = servicesSnapshot.docs.map(doc => doc.data());
        setServices(servicesList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    
    // We can continue to load solutions from a local file as it's less likely to change
    fetch('/data/solutions.json')
      .then(res => res.json())
      .then(data => setSolutions(data))
      .catch(err => console.error("Could not load solutions data:", err));

    fetchServices();
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
    <div className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-yellow-400">Our Services</h1>
          <p className="text-xl text-gray-300 mt-4">A complete spectrum of geospatial solutions.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <Card key={service.id} title={service.title}>
              {service.description}
            </Card>
          ))}
        </div>
        
        <div className="mt-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-yellow-400">Solutions by Sector</h2>
                <p className="text-xl text-gray-300 mt-4">Applying spatial intelligence across industries.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map(solution => (
                    <Card key={solution.id} title={solution.title} icon={getIcon(solution.id)}>
                        {solution.description}
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;