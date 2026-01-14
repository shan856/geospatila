import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'bg-transparent text-accent hover:bg-accent/10 border-0',
        outline: 'bg-transparent text-text-primary border-2 border-glass-border hover:border-accent hover:text-accent',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${variants[variant]} ${sizes[size]} rounded-xl font-semibold transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
