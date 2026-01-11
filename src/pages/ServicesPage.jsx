import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import FloatingOrbs from '../components/FloatingOrbs';

const ServicesPage = () => {
  const services = [
    {
      id: 'gis',
      title: 'GIS Mapping & Analysis',
      description: 'Comprehensive geographic information system solutions for data visualization, spatial analysis, and decision-making support.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      features: ['Custom map creation', 'Spatial database management', 'Multi-layer analysis', 'Interactive web maps'],
    },
    {
      id: 'drone',
      title: 'Drone Surveying & Mapping',
      description: 'High-precision aerial surveys using advanced UAV technology for accurate terrain modeling and site documentation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      features: ['Orthomosaic mapping', '3D terrain modeling', 'Volumetric calculations', 'Progress monitoring'],
    },
    {
      id: 'remote',
      title: 'Remote Sensing',
      description: 'Advanced satellite and aerial imagery interpretation for environmental monitoring, land use classification, and change detection.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ['Satellite image analysis', 'Vegetation indices', 'Land cover classification', 'Temporal analysis'],
    },
    {
      id: 'analytics',
      title: 'Spatial Analytics',
      description: 'Transform your location data into actionable business intelligence using advanced spatial analysis techniques.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['Market analysis', 'Site selection', 'Route optimization', 'Risk assessment'],
    },
    {
      id: 'lidar',
      title: 'LiDAR Processing',
      description: 'Expert processing of LiDAR point cloud data for precise elevation models and detailed terrain analysis.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Digital elevation models', 'Point cloud classification', 'Feature extraction', 'Accuracy assessment'],
    },
    {
      id: 'consulting',
      title: 'GIS Consulting',
      description: 'Strategic consulting services to help organizations implement effective geospatial solutions and workflows.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: ['Needs assessment', 'Technology selection', 'Workflow design', 'Team training'],
    },
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'We understand your requirements and project goals' },
    { step: '02', title: 'Planning', description: 'Develop a detailed strategy and timeline' },
    { step: '03', title: 'Execution', description: 'Implement solutions with precision and care' },
    { step: '04', title: 'Delivery', description: 'Present results and provide ongoing support' },
  ];

  return (
    <div className="relative bg-white pt-24">
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
              <span className="text-sm font-medium text-accent">Our Expertise</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-6"
            >
              Geospatial <span className="text-gradient">Solutions</span>
              <br />That Drive Results
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              From aerial surveys to advanced analytics, we provide comprehensive
              geospatial services that transform how you understand and use location data.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          <SectionTitle
            subtitle="Services"
            title="What We Offer"
            description="Comprehensive geospatial services tailored to meet the diverse needs of modern organizations."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full group">
                  <div className="icon-gradient mb-6 group-hover:shadow-glow transition-shadow duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-geo-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24">
        <div className="container-custom">
          <SectionTitle
            subtitle="How We Work"
            title="Our Process"
            description="A streamlined approach that ensures quality results and client satisfaction at every stage."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-8 text-center h-full">
                  <div className="text-5xl font-display font-bold text-gradient mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </div>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent/30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          <SectionTitle
            subtitle="Technologies"
            title="Tools We Use"
            description="Industry-leading software and platforms for delivering exceptional results."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {['ArcGIS', 'QGIS', 'Google Earth Engine', 'Pix4D', 'DJI Terra', 'AutoCAD', 'Python', 'PostGIS'].map((tech, index) => (
              <motion.div
                key={tech}
                whileHover={{ y: -4, scale: 1.02 }}
                className="px-8 py-4 bg-white rounded-xl border border-glass-border shadow-soft text-text-primary font-semibold hover:shadow-card-hover hover:border-accent/30 transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;