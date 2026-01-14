import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({
    title,
    subtitle,
    description,
    align = 'center',
    className = ''
}) => {
    const alignments = {
        center: 'text-center mx-auto',
        left: 'text-left',
        right: 'text-right ml-auto',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`max-w-3xl mb-16 ${alignments[align]} ${className}`}
        >
            {subtitle && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                    <span className="w-2 h-2 rounded-full bg-geo-accent" />
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">
                        {subtitle}
                    </span>
                </div>
            )}
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
                {title}
            </h2>
            {description && (
                <p className="text-lg text-text-secondary leading-relaxed">
                    {description}
                </p>
            )}
        </motion.div>
    );
};

export default SectionTitle;
