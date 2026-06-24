import React, { useState } from 'react';

const UserDashboard = () => {
  const [userBookings, setUserBookings] = useState([
    {
      id: 'BK001',
      device: 'iPhone 13 Pro',
      issue: 'Cracked Screen',
      status: 'completed',
      bookingDate: '2026-06-15',
      completedDate: '2026-06-15',
      technician: 'Sarah Johnson',
      cost: '$150',
      rating: 5,
    },
    {
      id: 'BK002',
      device: 'MacBook Pro 14"',
      issue: 'Battery Not Charging',
      status: 'in_progress',
      bookingDate: '2026-06-20',
      scheduledDate: '2026-06-25',
      scheduledTime: '2:00 PM',
      technician: 'Michael Chen',
      progress: 65,
    },
    {
      id: 'BK003',
      device: 'Samsung Refrigerator',
      issue: 'Not Cooling Properly',
      status: 'confirmed',
      bookingDate: '2026-06-22',
      scheduledDate: '2026-06-26',
      scheduledTime: '10:00 AM',
      technician: 'Emily Davis',
    },
    {
      id: 'BK004',
      device: 'iPad Air',
      issue: 'Screen Flickering',
      status: 'pending',
      bookingDate: '2026-06-24',
      technician: 'Pending Assignment',
    },
  ]);

  const statusConfig = {
    pending: { color: '#9ca3af', bgColor: '#f3f4f6', icon: '⏳', label: 'Pending' },
    confirmed: { color: '#3b82f6', bgColor: '#dbeafe', icon: '✓', label: 'Confirmed' },
    in_progress: { color: '#f59e0b', bgColor: '#fef3c7', icon: '⚙️', label: 'In Progress' },
    completed: { color: '#10b981', bgColor: '#d1fae5', icon: '✅', label: 'Completed' },
  };

  const BookingCard = ({ booking }) => {
    const config = statusConfig[booking.status];

    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: config.color }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{config.icon}</span>
              <h3 className="text-lg font-bold text-gray-900">{booking.device}</h3>
            </div>
            <p className="text-gray-600 text-sm">Issue: {booking.issue}</p>
            <p className="text-gray-500 text-xs mt-1">Booking ID: {booking.id}</p>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{ backgroundColor: config.bgColor, color: config.color }}
          >
            {config.label}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4 pb-4 border-t border-gray-200">
          <div className="pt-4">
            <p className="text-xs text-gray-600 font-semibold mb-1">TECHNICIAN</p>
            <p className="text-gray-900 font-medium">{booking.technician}</p>
          </div>

          {booking.status === 'completed' && (
            <>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">COMPLETED</p>
                <p className="text-gray-900 font-medium">{booking.completedDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">COST</p>
                <p className="text-gray-900 font-medium">{booking.cost}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-600 font-semibold mb-2">YOUR RATING</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      {i < booking.rating ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {booking.status === 'in_progress' && (
            <>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">SCHEDULED</p>
                <p className="text-gray-900 font-medium">{booking.scheduledDate} at {booking.scheduledTime}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-600 font-semibold mb-2">PROGRESS</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${booking.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{booking.progress}% complete</p>
              </div>
            </>
          )}

          {booking.status === 'confirmed' && (
            <>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-600 font-semibold mb-1">SCHEDULED FOR</p>
                <p className="text-gray-900 font-medium">{booking.scheduledDate} at {booking.scheduledTime}</p>
              </div>
            </>
          )}

          {booking.status === 'pending' && (
            <>
              <div className="md:col-span-2">
                <p className="text-xs text-gray-600 font-semibold mb-1">BOOKING DATE</p>
                <p className="text-gray-900 font-medium">{booking.bookingDate}</p>
                <p className="text-xs text-gray-600 mt-1">We're reviewing your request and will assign a technician soon.</p>
              </div>
            </>
          )}
        </div>

        {booking.status !== 'completed' && (
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium text-sm transition-colors">
              View Details
            </button>
            {booking.status !== 'in_progress' && (
              <button className="flex-1 px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm transition-colors">
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Repair Bookings</h1>
        <p className="text-gray-600">Track the status of all your repair requests and past services</p>
      </div>

      {/* Status Summary */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Completed', count: 1, icon: '✅' },
          { label: 'In Progress', count: 1, icon: '⚙️' },
          { label: 'Confirmed', count: 1, icon: '✓' },
          { label: 'Pending', count: 1, icon: '⏳' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {userBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      {/* Empty State */}
      {userBookings.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-6">Start by booking a repair service for your device</p>
          <button className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors">
            Book a Repair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
