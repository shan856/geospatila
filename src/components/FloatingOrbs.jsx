import React from 'react';
import { motion } from 'framer-motion';

const FloatingOrbs = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Soft gradient orbs for light theme */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(8, 145, 178, 0.08) 0%, transparent 70%)',
                    top: '-10%',
                    right: '-5%',
                }}
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
                    top: '40%',
                    left: '-10%',
                }}
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute w-[450px] h-[450px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
                    bottom: '-5%',
                    right: '20%',
                }}
                animate={{
                    y: [0, 25, 0],
                    x: [0, -15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Smaller accent orbs */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)',
                    top: '60%',
                    right: '10%',
                }}
                animate={{
                    y: [0, -35, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute w-[250px] h-[250px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
                    top: '20%',
                    left: '20%',
                }}
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

export default FloatingOrbs;
