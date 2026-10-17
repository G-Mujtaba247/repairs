import React from 'react';

const ServiceCard = ({ icon, title, description, issues = [], onBook }) => {
  return (
    <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      {issues.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-700 mb-2">Common Issues:</p>
          <div className="flex flex-wrap gap-2">
            {issues.slice(0, 3).map((issue, idx) => (
              <span key={idx} className="inline-block bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full">
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={onBook}
        className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors"
      >
        Book Service
      </button>
    </div>
  );
};

export default ServiceCard;
