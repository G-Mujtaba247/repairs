import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, Clock, Loader2, User, Wrench, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import WebLayout from '../layouts/WebLayout';
import { bookingStatuses } from '../resources/designSystem';

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const info = bookingStatuses.find(s => s.value === status) ?? {
    label: status,
    color: '#6b7280',
    bgColor: '#f3f4f6',
  };
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold capitalize"
      style={{ color: info.color, backgroundColor: info.bgColor }}
    >
      {info.label}
    </span>
  );
};

// ── Skeleton row ──────────────────────────────────────────────────────────────
const BookingSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 animate-pulse">
    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-3" />
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const TechnicianDashboard = () => {
  const { token, user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [updating, setUpdating] = useState(null); // id of booking being updated
  const [error,    setError]    = useState('');

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch('/api/v1/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.status) {
        setBookings(data.bookings ?? []);
      } else {
        setError(data.message ?? 'Could not load requests.');
      }
    } catch {
      setError('Network error — please try again.');
      toast.error('Unable to load booking requests.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const res  = await fetch(`/api/v1/bookings/${id}/status`, {
        method:  'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!data.status) {
        toast.error(data.message ?? 'Failed to update status.');
      } else {
        toast.success(`Booking ${status.replace('_', ' ')}.`);
        await fetchBookings();
      }
    } catch {
      toast.error('Network error — could not update status.');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <WebLayout>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-wrap justify-between gap-4 items-end">
            <div>
              <p className="text-sky-600 font-semibold text-sm">Technician workspace</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome, {user?.name ?? 'Technician'} 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Manage your incoming booking requests.
              </p>
            </div>
            <button
              onClick={() => { logout(); window.location.href = '/auth'; }}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium transition-colors"
            >
              Sign out
            </button>
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
                { label: 'Completed',   value: bookings.filter(b => b.status === 'completed').length,         icon: CheckCircle2 },
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
              Booking Requests
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
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-wrap justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">
                    {booking.serviceRequested}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm flex items-center gap-1.5">
                    <User size={12} />
                    {booking.customerId?.name}
                    {(booking.customerId?.phone || booking.customerId?.email) && (
                      <> · {booking.customerId.phone || booking.customerId.email}</>
                    )}
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar size={12} />
                    {booking.scheduledDate} at {booking.scheduledTime}
                  </p>
                  <p className="text-xs text-slate-400">{booking.deviceCategory}</p>
                </div>

                <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                  <StatusBadge status={booking.status} />

                  {/* Action buttons based on current status */}
                  <div className="flex gap-2 flex-wrap justify-end">
                    {booking.status === 'pending' && (
                      <>
                        <ActionButton
                          onClick={() => updateStatus(booking._id, 'accepted')}
                          loading={updating === booking._id}
                          className="bg-emerald-500 hover:bg-emerald-600"
                          icon={<CheckCircle2 size={14} />}
                        >
                          Accept
                        </ActionButton>
                        <ActionButton
                          onClick={() => updateStatus(booking._id, 'rejected')}
                          loading={updating === booking._id}
                          className="bg-red-500 hover:bg-red-600"
                          icon={<XCircle size={14} />}
                        >
                          Reject
                        </ActionButton>
                      </>
                    )}
                    {booking.status === 'accepted' && (
                      <ActionButton
                        onClick={() => updateStatus(booking._id, 'in_progress')}
                        loading={updating === booking._id}
                        className="bg-sky-500 hover:bg-sky-600"
                        icon={<Loader2 size={14} />}
                      >
                        Start work
                      </ActionButton>
                    )}
                    {booking.status === 'in_progress' && (
                      <ActionButton
                        onClick={() => updateStatus(booking._id, 'completed')}
                        loading={updating === booking._id}
                        className="bg-emerald-500 hover:bg-emerald-600"
                        icon={<CheckCircle2 size={14} />}
                      >
                        Mark complete
                      </ActionButton>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* Empty state */}
            {!loading && bookings.length === 0 && !error && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
                <Wrench className="text-slate-300 mx-auto mb-4" size={40} />
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  No booking requests yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Requests will appear here once customers book your services.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </WebLayout>
  );
};

// ── Helper: action button ─────────────────────────────────────────────────────
const ActionButton = ({ onClick, loading, className, icon, children }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`inline-flex items-center gap-1 text-white rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ${className}`}
  >
    {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
    {children}
  </button>
);

export default TechnicianDashboard;
