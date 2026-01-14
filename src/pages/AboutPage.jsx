import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import FloatingOrbs from '../components/FloatingOrbs';
import SEO from '../components/SEO';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({
    companyInfo: {
      title: 'Mapping the Future',
      description: 'Since 2008, RRtechGeo has been at the forefront of geospatial technology, helping organizations unlock the power of location intelligence.',
      stats: [
        { value: '15+', label: 'Years' },
        { value: '500+', label: 'Projects' },
        { value: '50+', label: 'Experts' },
      ],
    },
    values: [
      { icon: '🎯', title: 'Precision', description: 'We deliver accurate, reliable results you can trust.' },
      { icon: '💡', title: 'Innovation', description: 'Constantly adopting new technologies and methods.' },
      { icon: '🤝', title: 'Partnership', description: 'We work as an extension of your team.' },
      { icon: '🌍', title: 'Sustainability', description: 'Committed to environmental responsibility.' },
    ],
    milestones: [
      { year: '2008', title: 'Founded', description: 'RRtechGeo established with a vision for geospatial excellence' },
      { year: '2012', title: 'Expansion', description: 'Launched drone surveying services and expanded team' },
      { year: '2016', title: 'Recognition', description: 'Received industry award for innovative GIS solutions' },
      { year: '2020', title: 'Digital Transform', description: 'Introduced cloud-based analytics and AI integration' },
      { year: '2024', title: 'Today', description: '500+ projects completed across diverse industries' },
    ],
    team: [
      { name: 'Dr. Ravi Kumar', role: 'Founder & CEO', specialty: 'GIS & Remote Sensing Expert' },
      { name: 'Priya Sharma', role: 'Technical Director', specialty: 'Drone & LiDAR Specialist' },
      { name: 'Amit Patel', role: 'Lead Analyst', specialty: 'Spatial Analytics Expert' },
      { name: 'Neha Singh', role: 'Project Manager', specialty: 'Client Relations' },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, 'single_pages', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.log('Using default about data');
      }
      setIsLoading(false);
    };

    fetchAboutData();
  }, []);

  const { companyInfo, values, milestones, team } = aboutData;

  return (
    <div className="relative bg-white pt-24">
      <SEO
        title="About Us"
        description="Learn about RRtechGeo, a leading geospatial solutions provider in India since 2008. Precision, innovation, and expertise."
        keywords="geospatial experts, GIS company India, professional mapping services history"
      />
      <FloatingOrbs />

      {/* Hero Section */}
      <section className="relative py-24 mesh-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-geo-accent animate-pulse" />
                <span className="text-sm font-medium text-accent">About Us</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mb-6">
                {companyInfo.title?.split(' ').slice(0, -1).join(' ')}
                <span className="text-gradient"> {companyInfo.title?.split(' ').slice(-1)}</span>
              </h1>

              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                {companyInfo.description}
              </p>

              <div className="grid grid-cols-3 gap-6">
                {companyInfo.stats?.map((stat, index) => (
                  <div key={index} className="text-center p-4 glass-card">
                    <div className="text-3xl font-display font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="glass-card p-8">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-geo-accent/10 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent to-geo-accent opacity-20 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          <SectionTitle
            subtitle="Our Values"
            title="What Drives Us"
            description="Core principles that guide every project and decision we make."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="text-center h-full">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24">
        <div className="container-custom">
          <SectionTitle
            subtitle="Our Journey"
            title="Milestones"
            description="Key moments that shaped who we are today."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-geo-accent" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Card variant="glass" className="inline-block max-w-md">
                      <div className="text-3xl font-display font-bold text-gradient mb-2">
                        {milestone.year}
                      </div>
                      <h4 className="text-xl font-semibold text-text-primary mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>

                  <div className="hidden lg:flex w-4 h-4 rounded-full bg-gradient-to-br from-accent to-geo-accent shadow-glow" />

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-24 bg-secondary-bg">
        <div className="container-custom">
          <SectionTitle
            subtitle="Our Team"
            title="Meet the Experts"
            description="Dedicated professionals committed to geospatial excellence."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="text-center group">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-geo-accent/20 flex items-center justify-center group-hover:from-accent group-hover:to-geo-accent transition-all duration-300">
                    <svg className="w-12 h-12 text-accent group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-1">
                    {member.name}
                  </h4>
                  <p className="text-accent text-sm font-medium mb-1">
                    {member.role}
                  </p>
                  <p className="text-text-muted text-xs">
                    {member.specialty}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;