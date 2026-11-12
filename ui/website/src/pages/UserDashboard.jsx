import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight, Wrench, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import WebLayout from '../layouts/WebLayout';
import { bookingStatuses } from '../resources/designSystem';

// ── Status badge helpers ──────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const info = bookingStatuses.find(s => s.value === status) ?? {
    label: status,
    color: '#6b7280',
    bgColor: '#f3f4f6',
  };
  return (
    <span
      className="self-start rounded-full px-3 py-1 text-xs font-semibold capitalize"
      style={{ color: info.color, backgroundColor: info.bgColor }}
    >
      {info.label}
    </span>
  );
};

// ── Skeleton card ─────────────────────────────────────────────────────────────
const BookingSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 animate-pulse">
    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const UserDashboard = () => {
  const { token, user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res  = await fetch('/api/v1/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status) {
          setBookings(data.bookings ?? []);
        } else {
          setError(data.message ?? 'Could not load bookings.');
        }
      } catch {
        setError('Network error — please try again.');
        toast.error('Unable to load your bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <WebLayout>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-wrap justify-between gap-4 items-end">
            <div>
              <p className="text-sky-600 font-semibold text-sm">Customer dashboard</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome, {user?.name ?? 'there'} 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Track and manage your repair appointments.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/find-technician"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-5 py-2.5 font-semibold text-sm transition-colors"
              >
                <Search size={16} />
                Find a technician
              </Link>
              <button
                onClick={() => { logout(); window.location.href = '/auth'; }}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 p-4 rounded-xl text-sm">
              {error}
            </p>
          )}

          {/* Stats strip */}
          {!loading && bookings.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total',       value: bookings.length,                                               icon: Wrench },
                { label: 'Pending',     value: bookings.filter(b => b.status === 'pending').length,           icon: Clock },
                { label: 'In Progress', value: bookings.filter(b => b.status === 'in_progress').length,       icon: Loader2 },
                { label: 'Completed',   value: bookings.filter(b => b.status === 'completed').length,         icon: Calendar },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center"
                >
                  <Icon size={20} className="text-sky-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Booking list */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Your Appointments
            </h2>

            {/* Skeleton */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <BookingSkeleton key={i} />)}
              </div>
            )}

            {/* Populated */}
            {!loading && bookings.map(booking => (
              <article
                key={booking._id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 grid md:grid-cols-[1fr_auto] gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {booking.serviceRequested}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">
                    {booking.deviceCategory}
                    {booking.technicianId?.userId?.name && ` · with ${booking.technicianId.userId.name}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                    <Calendar size={12} />
                    {booking.scheduledDate} at {booking.scheduledTime}
                    {booking.technicianId?.userId?.phone && (
                      <> · <span>{booking.technicianId.userId.phone}</span></>
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between gap-2">
                  <StatusBadge status={booking.status} />
                  <Link
                    to={`/technician-profile/${booking.technicianId?._id}`}
                    className="text-xs text-sky-600 hover:underline flex items-center gap-0.5"
                  >
                    View technician <ChevronRight size={12} />
                  </Link>
                </div>
              </article>
            ))}

            {/* Empty state */}
            {!loading && bookings.length === 0 && !error && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                <Wrench className="text-slate-300 mx-auto mb-4" size={40} />
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  No appointments yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                  Find a certified technician and book your first repair.
                </p>
                <Link
                  to="/find-technician"
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-5 py-2.5 font-semibold text-sm transition-colors"
                >
                  <Search size={16} />
                  Find a technician
                </Link>
              </div>
            )}
          </div>

        </div>
      </main>
    </WebLayout>
  );
};

export default UserDashboard;
