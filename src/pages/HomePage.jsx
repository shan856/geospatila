import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 1. Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// 2. Import Swiper's CSS for navigation
import 'swiper/css';
import 'swiper/css/navigation';

import { FaArrowRight, FaLightbulb, FaRocket, FaHandshake, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from '../components/Card';
import HeroSlideshow from '../components/HeroSlideshow';
import { db } from '../firebaseConfig';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';

const HomePage = () => {
  const [aboutData, setAboutData] = useState({});
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('/data/about.json').then(res => res.json()).then(data => setAboutData(data));
        fetch('/data/services.json').then(res => res.json()).then(data => setServices(data.slice(0, 3)));
        
        // Fetch all projects for the slider
        const projectsQuery = query(collection(db, 'projects'), orderBy('title'));
        const projectsSnapshot = await getDocs(projectsQuery);
        setProjects(projectsSnapshot.docs.map(doc => doc.data()));
      } catch (error) { console.error("Error fetching homepage data:", error); }
    };
    fetchData();
  }, []);

  return (
    <div>
      <HeroSlideshow />
      <section className="py-16 md:py-20 bg-gray-800"><div className="container mx-auto px-6 text-center"><h2 className="text-3xl md:text-4xl font-bold mb-12">Our Guiding Principles</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"><Card title="Our Mission" icon={<FaRocket/>}>{aboutData.mission}</Card><Card title="Our Vision" icon={<FaLightbulb/>}>{aboutData.vision}</Card><Card title="Our Values" icon={<FaHandshake/>}>{aboutData.values?.join(', ')}</Card></div></div></section>
      <section className="py-16 md:py-20"><div className="container mx-auto px-6"><h2 className="text-3xl md:text-4xl font-bold text-center mb-12">A Spectrum of GIS Services</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{services.map(service => (<Card key={service.id} title={service.title} imageUrl={service.imageUrl}>{service.description}</Card>))}</div><div className="text-center mt-12"><Link to="/services" className="text-yellow-400 font-bold text-lg hover:underline">View All Services <FaArrowRight className="inline ml-2" /></Link></div></div></section>
      
      {/* --- THIS IS THE NEW PROJECT SHOWCASE SLIDER --- */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Project Showcase</h2>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              loop={true}
              navigation={{
                nextEl: '.project-swiper-button-next',
                prevEl: '.project-swiper-button-prev',
              }}
              // Responsive breakpoints
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                // When window width is >= 1024px (lg)
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              className="w-full"
            >
              {projects.map(project => (
                <SwiperSlide key={project.id}>
                  <motion.div 
                    className="bg-gray-700 rounded-lg overflow-hidden shadow-lg group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="overflow-hidden">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4"><strong>Impact:</strong> {project.impact}</p>
                      <Link to="/projects" className="text-yellow-400 font-semibold hover:underline">Read Case Study <FaArrowRight className="inline ml-1" /></Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <div className="project-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition cursor-pointer">
              <FaChevronLeft size={24} />
            </div>
            <div className="project-swiper-button-next absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition cursor-pointer">
              <FaChevronRight size={24} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 text-center px-4"><div className="container mx-auto"><h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Unlock Your Geospatial Potential?</h2><p className="text-lg sm:text-xl text-gray-300 mb-8">Let's discuss how our expertise can drive your success.</p><Link to="/contact" className="btn-primary text-xl">Get In Touch</Link></div></section>
    </div>
  );
};
export default HomePage;