import React from 'react';

const StatsCard = ({ icon, label, value, trend, trendDirection = 'up' }) => {
  const isPositive = trendDirection === 'up';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sky-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {trend} vs last month
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
