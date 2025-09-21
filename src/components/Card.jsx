import React from 'react';

const Card = ({ icon, title, children }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/10">
      <div className="flex items-center mb-4">
        {icon && <div className="text-yellow-400 text-3xl mr-4">{icon}</div>}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">
        {children}
      </p>
    </div>
  );
};

export default Card;