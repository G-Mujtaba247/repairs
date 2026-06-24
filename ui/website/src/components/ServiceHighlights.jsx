import React from 'react';

const ServiceHighlights = ({ highlights = [] }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl mb-4">{highlight.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
              <p className="text-gray-600 text-sm">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
