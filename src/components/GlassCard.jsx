import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
    children,
    className = '',
    hover3D = true,
    glowOnHover = true,
    gradientBorder = false,
    onClick,
}) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!hover3D || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXValue = (mouseY / (rect.height / 2)) * -8;
        const rotateYValue = (mouseX / (rect.width / 2)) * 8;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", bounce: 0.3, duration: 0.8 }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`
        relative group
        bg-glass-medium backdrop-blur-xl 
        border border-white/10 
        rounded-2xl
        transition-all duration-300
        ${glowOnHover ? 'hover:shadow-glow-sm hover:border-accent/30' : ''}
        ${gradientBorder ? 'glow-border' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
            style={{
                transform: hover3D
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                    : undefined,
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
