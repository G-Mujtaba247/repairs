import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/auth');
    fetch('/api/v1/bookings', { headers: { Authorization: `Bearer ${token}` } }).then(response => response.json()).then(data => data.status ? setBookings(data.bookings) : setError(data.message)).catch(() => setError('Unable to load bookings'));
  }, [navigate]);
  return <main className="min-h-screen bg-slate-50 py-24 px-4"><div className="max-w-6xl mx-auto space-y-8"><div className="flex flex-wrap justify-between gap-4 items-end"><div><p className="text-sky-600 font-semibold">Customer dashboard</p><h1 className="text-3xl font-bold text-slate-900">Your appointments</h1></div><Link to="/find-technician" className="bg-sky-500 text-white rounded-lg px-5 py-3 font-semibold">Find a technician</Link></div>{error && <p className="text-red-700 bg-red-50 p-3 rounded-lg">{error}</p>}<div className="grid gap-4">{bookings.map(booking => <article key={booking._id} className="bg-white border border-slate-200 rounded-xl p-5 grid md:grid-cols-[1fr_auto] gap-4"><div><h2 className="font-bold text-lg">{booking.serviceRequested}</h2><p className="text-slate-600">{booking.deviceCategory} with {booking.technicianId?.userId?.name || 'technician'}</p><p className="text-sm text-slate-500 mt-2">{booking.scheduledDate} at {booking.scheduledTime} · {booking.technicianId?.userId?.phone || 'Contact shared after acceptance'}</p></div><span className="self-start rounded-full bg-sky-50 text-sky-700 px-3 py-1 text-sm font-semibold capitalize">{booking.status.replace('_', ' ')}</span></article>)}{!bookings.length && <div className="bg-white rounded-xl border p-10 text-center text-slate-600">No appointments yet.</div>}</div></div></main>;
};
export default UserDashboard;