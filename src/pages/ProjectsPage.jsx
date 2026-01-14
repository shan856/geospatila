import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import FloatingOrbs from '../components/FloatingOrbs';
import SEO from '../components/SEO';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projectsQuery = query(collection(db, 'projects'), orderBy('title'));
        const snapshot = await getDocs(projectsQuery);
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Map Firebase fields to display fields
          category: doc.data().category || 'GIS Mapping',
          results: doc.data().results || (doc.data().impact ? [doc.data().impact] : []),
          image: doc.data().imageUrl || doc.data().image,
          description: doc.data().description || doc.data().challenge?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        }));

        if (projectsData.length > 0) {
          setProjects(projectsData);
        } else {
          // Fallback to sample data if no Firebase data
          setProjects(sampleProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(sampleProjects);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  const sampleProjects = [
    {
      id: 1,
      title: 'Urban Development Mapping',
      category: 'GIS Mapping',
      description: 'Comprehensive land use mapping for a 500-acre urban development project, enabling informed planning decisions.',
      results: ['200+ map layers', '95% accuracy', '30% faster planning'],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
    },
    {
      id: 2,
      title: 'Agricultural Drone Survey',
      category: 'Drone Surveying',
      description: 'Multi-spectral drone surveys of 10,000 hectares of farmland for precision agriculture implementation.',
      results: ['10,000 ha surveyed', 'NDVI analysis', '25% yield increase'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600',
    },
    {
      id: 3,
      title: 'Forest Conservation Analysis',
      category: 'Remote Sensing',
      description: 'Satellite-based deforestation monitoring and forest health assessment for conservation efforts.',
      results: ['50,000 km² monitored', 'Change detection', 'Real-time alerts'],
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600',
    },
  ];

  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="relative bg-white pt-24">
      <SEO
        title="Projects"
        description="Browse our portfolio of geospatial successes. Urban mapping, agricultural drone surveys, and environmental analysis case studies."
        keywords="GIS case studies, geospatial project portfolio, urban planning mapping, agricultural drone survey results"
      />
      <FloatingOrbs />

      {/* Hero Section */}
      <section className="relative py-24 mesh-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-geo-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">Our Portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-6"
            >
              Projects That
              <span className="text-gradient"> Make Impact</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Explore our portfolio of successful geospatial projects across diverse industries and applications.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Projects Grid */}
      <section className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${activeCategory === category
                  ? 'bg-gradient-to-r from-accent to-geo-accent text-white shadow-glow'
                  : 'bg-white text-text-secondary border border-glass-border hover:border-accent hover:text-accent'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : (
            /* Projects Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id || project.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <Card variant="elevated" className="h-full overflow-hidden group p-0">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image || project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-white/90 text-accent text-xs font-semibold rounded-full">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Results */}
                        {project.results && project.results.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.results.map((result, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24">
        <div className="container-custom">
          <SectionTitle
            subtitle="Our Impact"
            title="Results That Matter"
          />

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '50M+', label: 'Hectares Mapped' },
              { value: '200+', label: 'Happy Clients' },
              { value: '15+', label: 'Countries Served' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="text-4xl font-display font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-secondary">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;