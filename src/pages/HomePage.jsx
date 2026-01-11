import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import FloatingOrbs from '../components/FloatingOrbs';

const HomePage = () => {
  const services = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: 'GIS Mapping',
      description: 'Comprehensive geographic information systems for precise spatial data management and visualization.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: 'Drone Surveys',
      description: 'High-precision aerial surveys using state-of-the-art drone technology for accurate terrain mapping.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Remote Sensing',
      description: 'Advanced satellite and aerial imagery analysis for environmental monitoring and land classification.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Spatial Analytics',
      description: 'Transform complex spatial data into actionable insights with advanced analytical tools.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We understand your requirements and project goals',
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Develop a detailed strategy and timeline',
    },
    {
      step: '03',
      title: 'Execution',
      description: 'Implement solutions with precision and care',
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Present results and provide ongoing support',
    },
  ];

  const features = [
    {
      title: 'Precision Accuracy',
      description: 'Centimeter-level accuracy in all our mapping and survey services.',
      icon: '🎯',
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick delivery of comprehensive reports and data products.',
      icon: '⚡',
    },
    {
      title: 'Expert Team',
      description: 'Certified professionals with decades of combined experience.',
      icon: '👥',
    },
    {
      title: 'Modern Technology',
      description: 'Latest equipment and software for superior results.',
      icon: '🛰️',
    },
  ];

  const stats = [
    { value: '500+', label: 'Projects' },
    { value: '15+', label: 'Years' },
    { value: '98%', label: 'Satisfaction' },
    { value: '50+', label: 'Clients' },
  ];

  return (
    <div className="relative bg-white">
      <FloatingOrbs />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          <SectionTitle
            subtitle="What We Do"
            title="Our Core Services"
            description="Cutting-edge geospatial solutions tailored to your specific needs, delivered with precision and expertise."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
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
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section - Enhanced Design */}
      <section className="relative py-28 bg-gradient-to-b from-secondary-bg to-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-geo-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <SectionTitle
            subtitle="How We Work"
            title="Our Process"
            description="A streamlined approach that ensures quality results and client satisfaction at every stage."
          />

          {/* Process Steps */}
          <div className="relative mt-16">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent via-geo-accent to-accent opacity-20" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                  className="relative"
                >
                  {/* Floating number badge */}
                  <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-geo-accent flex items-center justify-center shadow-glow z-10">
                      <span className="text-white font-display font-bold text-xl">{step.step}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="glass-card p-6 text-center hover:shadow-card-hover transition-all duration-300 group">
                    <h3 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-4 z-20">
                      <div className="w-8 h-8 rounded-full bg-white shadow-md border border-accent/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated without video */}
      <section className="relative py-24 mesh-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-geo-accent" />
                <span className="text-sm font-medium text-accent uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
                Industry-Leading
                <span className="text-gradient"> Expertise</span>
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                With over 15 years of experience in geospatial technology, we bring unmatched expertise
                to every project. Our team of certified professionals uses the latest tools and methodologies
                to deliver exceptional results.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/60 border border-glass-border"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-1">{feature.title}</h4>
                      <p className="text-sm text-text-secondary">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section - Replacing Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 rounded-xl bg-accent/5 border border-accent/10"
                    >
                      <div className="text-4xl font-display font-bold text-gradient mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-text-secondary font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                    Learn About Us
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-geo-accent opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Transform Your Geospatial Data?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let's discuss how our expertise can help you achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;