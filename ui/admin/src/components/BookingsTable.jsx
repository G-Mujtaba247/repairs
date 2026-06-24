import React, { useState } from 'react';

const BookingsTable = ({ bookings = [] }) => {
  const [filter, setFilter] = useState('all');

  const defaultBookings = [
    {
      id: 1,
      customer: 'John Doe',
      device: 'iPhone 13',
      issue: 'Cracked Screen',
      date: '2026-06-25',
      time: '10:00 AM',
      status: 'confirmed',
      technician: 'Sarah Johnson',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      device: 'MacBook Pro',
      issue: 'Battery Not Charging',
      date: '2026-06-25',
      time: '2:00 PM',
      status: 'in_progress',
      technician: 'Michael Chen',
    },
    {
      id: 3,
      customer: 'Bob Wilson',
      device: 'Samsung TV',
      issue: 'No Image',
      date: '2026-06-24',
      time: '11:00 AM',
      status: 'completed',
      technician: 'Emily Davis',
    },
    {
      id: 4,
      customer: 'Alice Johnson',
      device: 'Refrigerator',
      issue: 'Not Cooling',
      date: '2026-06-26',
      time: '9:00 AM',
      status: 'pending',
      technician: 'David Wilson',
    },
  ];

  const statusColors = {
    pending: { bg: '#f3f4f6', color: '#9ca3af', label: 'Pending' },
    confirmed: { bg: '#dbeafe', color: '#3b82f6', label: 'Confirmed' },
    in_progress: { bg: '#fef3c7', color: '#f59e0b', label: 'In Progress' },
    completed: { bg: '#d1fae5', color: '#10b981', label: 'Completed' },
  };

  const items = bookings.length > 0 ? bookings : defaultBookings;
  const filtered = filter === 'all' ? items : items.filter(b => b.status === filter);

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-sky-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {['pending', 'confirmed', 'in_progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {statusColors[status].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Device</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Issue</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(booking => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.device}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.issue}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.date} {booking.time}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{booking.technician}</td>
                <td className="px-6 py-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: statusColors[booking.status].bg,
                      color: statusColors[booking.status].color,
                    }}
                  >
                    {statusColors[booking.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-sky-600 hover:text-sky-800 font-medium text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No bookings found
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
