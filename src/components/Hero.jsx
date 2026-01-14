import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Mesh gradient background */}
            <div className="absolute inset-0 mesh-background" />

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 opacity-20">
                <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                    <circle cx="100" cy="100" r="80" stroke="url(#grad1)" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="100" r="60" stroke="url(#grad1)" strokeWidth="1.5" fill="none" />
                    <circle cx="100" cy="100" r="40" stroke="url(#grad1)" strokeWidth="1" fill="none" />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0891b2" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="absolute bottom-20 left-10 w-48 h-48 opacity-15">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" stroke="#0891b2" strokeWidth="1.5" fill="none" />
                    <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" stroke="#10b981" strokeWidth="1" fill="none" />
                </svg>
            </div>

            {/* Content */}
            <div className="container-custom relative z-10 pt-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-geo-accent animate-pulse" />
                        <span className="text-sm font-medium text-accent">
                            Leading Geospatial Innovation
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
                    >
                        <span className="text-text-primary">Transform Your</span>
                        <br />
                        <span className="text-gradient-animated">Geospatial Data</span>
                        <br />
                        <span className="text-text-primary">Into Insights</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        We deliver cutting-edge GIS solutions, drone mapping, remote sensing,
                        and spatial analytics to help businesses make data-driven decisions
                        that shape the future.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 mb-16"
                    >
                        <Link to="/services" className="btn-primary inline-flex items-center gap-2">
                            Explore Services
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link to="/projects" className="btn-secondary inline-flex items-center gap-2">
                            View Our Work
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[
                            { value: '500+', label: 'Projects Completed' },
                            { value: '50+', label: 'Expert Team' },
                            { value: '15+', label: 'Years Experience' },
                            { value: '98%', label: 'Client Satisfaction' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="glass-card p-6"
                            >
                                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-text-secondary">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-text-muted uppercase tracking-wider">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-accent/30 flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-accent"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
