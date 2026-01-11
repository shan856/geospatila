import React from 'react';

const BackgroundLines = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #0891b2 1px, transparent 1px),
            linear-gradient(to bottom, #0891b2 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Gradient mesh overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(8, 145, 178, 0.04), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(16, 185, 129, 0.03), transparent),
            radial-gradient(ellipse 60% 40% at 0% 80%, rgba(6, 182, 212, 0.03), transparent)
          `,
                }}
            />

            {/* Decorative shapes */}
            <svg
                className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.02]"
                viewBox="0 0 600 600"
                fill="none"
            >
                <circle cx="300" cy="300" r="250" stroke="#0891b2" strokeWidth="1" fill="none" />
                <circle cx="300" cy="300" r="200" stroke="#10b981" strokeWidth="1" fill="none" />
                <circle cx="300" cy="300" r="150" stroke="#0891b2" strokeWidth="1" fill="none" />
            </svg>

            <svg
                className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.02]"
                viewBox="0 0 400 400"
                fill="none"
            >
                <path d="M0 200 L200 0 L400 200 L200 400 Z" stroke="#10b981" strokeWidth="1" fill="none" />
                <path d="M50 200 L200 50 L350 200 L200 350 Z" stroke="#0891b2" strokeWidth="1" fill="none" />
            </svg>
        </div>
    );
};

export default BackgroundLines;
