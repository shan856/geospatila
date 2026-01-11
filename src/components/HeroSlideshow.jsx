import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import GradientOrbs from './GradientOrbs';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const AnimatedText = ({ slide }) => {
  const { isActive } = useSwiperSlide();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.5, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="w-full max-w-5xl text-center px-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-accent text-lg md:text-xl font-medium mb-4 tracking-wide uppercase"
          >
            GIS & Spatial Intelligence
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold mb-6 leading-tight"
          >
            <span className="text-text-primary">{slide.title.split(' ').slice(0, -2).join(' ')} </span>
            <span className="text-gradient">{slide.title.split(' ').slice(-2).join(' ')}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/services" className="btn-primary text-lg inline-flex items-center gap-2">
              Explore Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/projects" className="btn-secondary text-lg inline-flex items-center gap-2">
              View Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroSlideshow = () => {
  const [slides, setSlides] = useState([]);

  // Fallback slides
  const fallbackSlides = [
    {
      id: 1,
      title: 'Transform Geospatial Data',
      subtitle: 'Expert GIS solutions, drone mapping, and remote sensing services.',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920'
    },
    {
      id: 2,
      title: 'Precision Mapping Solutions',
      subtitle: 'High-accuracy surveys and spatial analytics for your projects.',
      imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920'
    },
    {
      id: 3,
      title: 'Advanced Drone Surveying',
      subtitle: 'Professional aerial data capture for agriculture, construction, and more.',
      imageUrl: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=1920'
    }
  ];

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Try Firebase first
        const slidesQuery = query(collection(db, 'heroSlides'), orderBy('order'));
        const snapshot = await getDocs(slidesQuery);

        if (snapshot.docs.length > 0) {
          const slidesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setSlides(slidesData);
        } else {
          // Fallback to JSON file
          fetch('/data/heroSlides.json')
            .then(res => res.json())
            .then(data => setSlides(data.length > 0 ? data : fallbackSlides))
            .catch(() => setSlides(fallbackSlides));
        }
      } catch (error) {
        console.log('Using fallback slides');
        setSlides(fallbackSlides);
      }
    };

    fetchSlides();
  }, []);

  if (!slides.length) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background - light theme */}
      <div className="absolute inset-0 bg-white mesh-background" />

      {/* Floating gradient orbs */}
      <GradientOrbs className="z-0" />

      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        className="h-full w-full relative z-10"
        speed={1200}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background image with light overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-linear scale-110 swiper-slide-active:scale-100"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            {/* Light theme overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-geo-accent/5" />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center pt-20">
              <AnimatedText slide={slide} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows - light theme */}
      <button className="hero-prev absolute top-1/2 left-4 md:left-8 z-20 p-3 md:p-4 rounded-full bg-white/80 backdrop-blur-sm border border-glass-border text-text-primary hover:bg-accent hover:text-white hover:border-accent hover:shadow-glow transition-all duration-300 group">
        <FaChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button className="hero-next absolute top-1/2 right-4 md:right-8 z-20 p-3 md:p-4 rounded-full bg-white/80 backdrop-blur-sm border border-glass-border text-text-primary hover:bg-accent hover:text-white hover:border-accent hover:shadow-glow transition-all duration-300 group">
        <FaChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Pagination - styled for light theme */}
      <div className="hero-pagination absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-text-muted uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-accent/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Custom styles for Swiper pagination */}
      <style jsx global>{`
        .hero-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #0891b2, #10b981);
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(8, 145, 178, 0.4);
        }
      `}</style>
    </section>
  );
};

export default HeroSlideshow;