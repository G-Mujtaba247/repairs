import React from 'react';

const Sidebar = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'bookings', label: '📋 Bookings', icon: '📋' },
    { id: 'customers', label: '👥 Customers', icon: '👥' },
    { id: 'services', label: '🔧 Services', icon: '🔧' },
    { id: 'technicians', label: '👨‍🔧 Technicians', icon: '👨‍🔧' },
    { id: 'webpages', label: '📄 Pages', icon: '📄' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">🔧 Repairs CMS</h2>
        <p className="text-gray-400 text-sm">Admin Panel</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`w-full text-left px-6 py-3 transition-all ${
              activeItem === item.id
                ? 'bg-sky-600 border-r-4 border-sky-400 font-semibold'
                : 'hover:bg-gray-700'
            }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 text-xs text-gray-400">
        <p>Repairs CMS v1.0</p>
        <button className="mt-3 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
