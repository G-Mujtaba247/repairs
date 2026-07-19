import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import BookingsTable from '../components/BookingsTable';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleMenuClick = (item) => {
    setActiveSection(item);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar activeItem={activeSection} onItemClick={handleMenuClick} />

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeSection}</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your repair business efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors">
                + New Booking
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <StatsCard icon="📋" label="Total Bookings" value="247" trend="12%" />
                <StatsCard icon="🔧" label="Technicians" value="42" trend="3%" />
                <StatsCard icon="🕒" label="Pending Verifications" value="5" trend="-2%" />
                <StatsCard icon="💰" label="Revenue" value="$12,450" trend="15%" />
              </div>

              {/* Charts and Tables Section */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Bookings Table */}
                <div className="lg:col-span-2">
                  <BookingsTable />
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                  {/* Technicians */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Top Technicians</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Sarah Johnson', jobs: 45, rating: 4.9 },
                        { name: 'Michael Chen', jobs: 38, rating: 4.8 },
                        { name: 'Emily Davis', jobs: 32, rating: 4.7 },
                      ].map((tech, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{tech.name}</p>
                            <p className="text-xs text-gray-600">{tech.jobs} jobs</p>
                          </div>
                          <div className="text-yellow-400 text-sm font-bold">⭐ {tech.rating}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <span>✅</span>
                        <div>
                          <p className="font-medium text-gray-900">Booking #2847 completed</p>
                          <p className="text-gray-600 text-xs">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span>📋</span>
                        <div>
                          <p className="font-medium text-gray-900">New booking from John Doe</p>
                          <p className="text-gray-600 text-xs">4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span>⭐</span>
                        <div>
                          <p className="font-medium text-gray-900">New 5-star review received</p>
                          <p className="text-gray-600 text-xs">6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'bookings' && (
            <div>
              <BookingsTable />
            </div>
          )}

          {activeSection === 'customers' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers Management</h2>
              <p className="text-gray-600">Customer management features coming soon...</p>
            </div>
          )}

          {activeSection === 'services' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Management</h2>
              <p className="text-gray-600">Services management features coming soon...</p>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <p className="text-gray-600">Settings features coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
