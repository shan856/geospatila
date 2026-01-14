import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import SEO from '../components/SEO';
import FloatingOrbs from '../components/FloatingOrbs';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            setIsLoading(true);
            try {
                const docRef = doc(db, 'services', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setService({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching service:", error);
            }
            setIsLoading(false);
        };
        fetchService();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen pt-40 px-4 text-center">
                <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Service Not Found</h2>
                <p className="text-text-secondary mb-8">The service you are looking for does not exist or has been removed.</p>
                <Link to="/services" className="btn-primary inline-flex items-center gap-2">
                    <FaArrowLeft /> Back to Services
                </Link>
            </div>
        );
    }

    const iconSvgPaths = {
        map: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        drone: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
        globe: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        lightbulb: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    };

    return (
        <div className="relative bg-white pt-24 min-h-screen">
            <SEO
                title={service.title}
                description={service.description}
                keywords={`${service.title}, geospatial services, ${service.features?.join(', ')}`}
            />
            <FloatingOrbs />

            <section className="relative py-20 mesh-background px-4 min-h-[80vh] flex items-center">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link to="/services" className="text-accent hover:underline inline-flex items-center gap-2 font-medium transition-colors">
                            <FaArrowLeft className="text-sm" /> Back to Services
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="icon-gradient w-14 h-14 flex items-center justify-center rounded-xl shadow-glow">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconSvgPaths[service.icon] || iconSvgPaths.map} />
                                    </svg>
                                </div>
                                <span className="text-accent font-mono tracking-wider text-sm uppercase">Professional Service</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-8 leading-tight">
                                {service.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-10 max-w-xl">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link to="/contact" className="btn-primary group inline-flex items-center gap-2 whitespace-nowrap">
                                    Book This Service
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <button onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl border border-glass-border hover:bg-white/5 transition-colors font-semibold text-text-primary">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-glass-border md:translate-x-8">
                                {service.imageUrl ? (
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-accent/10 to-geo-accent/10 flex items-center justify-center">
                                        <svg className="w-32 h-32 text-accent/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={iconSvgPaths[service.icon] || iconSvgPaths.map} />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent mix-blend-overlay" />
                            </div>

                            {/* Decorative background element behind image */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-geo-accent/20 rounded-[3rem] blur-2xl -z-10 opacity-60 md:translate-x-8" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="details" className="relative py-24 px-4 overflow-hidden">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 space-y-12"
                        >
                            {/* Detailed Description */}
                            <div className="max-w-none">
                                <h2 className="text-3xl font-display font-bold text-text-primary mb-6">Overview</h2>
                                <div className="text-text-secondary leading-relaxed space-y-6 text-lg">
                                    {service.detailedDescription ? (
                                        service.detailedDescription.split('\n').map((paragraph, idx) => (
                                            <p key={idx} className={paragraph.trim() === '' ? 'h-2' : ''}>
                                                {paragraph}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No detailed description provided for this service yet. Contact us to learn more about our {service.title} expertise.</p>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-8 md:p-12 bg-gradient-to-br from-accent/5 to-geo-accent/5 rounded-3xl border border-glass-border shadow-soft relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-display font-bold text-text-primary mb-4">Interested in this service?</h3>
                                    <p className="text-lg text-text-secondary mb-8 max-w-xl">Let's discuss how we can apply our {service.title} solutions to your specific business needs and challenges.</p>
                                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                                        Get a Free Consultation
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Key Features Sidebar */}
                            <div className="glass-card p-8 sticky top-24 border-accent/10">
                                <h4 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-accent rounded-full" />
                                    Key Capabilities
                                </h4>
                                <ul className="space-y-5">
                                    {service.features?.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start gap-3 text-text-secondary"
                                        >
                                            <FaCheckCircle className="text-geo-accent shrink-0 mt-1" />
                                            <span className="text-base font-medium leading-tight">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
