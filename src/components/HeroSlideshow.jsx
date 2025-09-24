import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AnimatedText = ({ slide }) => {
  const { isActive } = useSwiperSlide();
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delayChildren: 0.6, staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } } };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div className="w-full max-w-4xl" initial="hidden" animate="visible" exit="hidden" variants={containerVariants}>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">{slide.title}</motion.h1>
          <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">{slide.subtitle}</motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/services" className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300">Explore Services</Link>
            <Link to="/projects" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300">View Projects</Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroSlideshow = () => {
  const [slides, setSlides] = useState([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    fetch('/data/heroSlides.json') // Correct Path
      .then(res => res.json())
      .then(data => setSlides(data));
  }, []);

  if (!slides.length) return <div className="h-screen bg-gray-900" />;

  return (
    <section className="h-screen relative overflow-hidden text-white">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        onSwiper={setSwiper}
        loop={true}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
        pagination={{ el: '.swiper-pagination-custom', clickable: true }}
        className="h-full w-full"
        speed={1000}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.imageUrl})` }} />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <AnimatedText slide={slide} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 p-3 rounded-full bg-black/30 hover:bg-black/50 transition cursor-pointer"><FaChevronLeft size={24} /></div>
      <div className="swiper-button-next-custom absolute top-1/2 right-4 z-10 p-3 rounded-full bg-black/30 hover:bg-black/50 transition cursor-pointer"><FaChevronRight size={24} /></div>
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10" />
    </section>
  );
};

export default HeroSlideshow;