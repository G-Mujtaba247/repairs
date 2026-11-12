import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, CheckCircle2, Mail, Phone, Clock,
  Wrench, Loader2, AlertCircle, Calendar, ChevronDown, ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import WebLayout from '../layouts/WebLayout';

// ── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 16 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={size}
        className={i <= Math.floor(rating)
          ? 'text-amber-400 fill-amber-400'
          : 'text-slate-300 dark:text-slate-600'}
      />
    ))}
  </div>
);

// ── Time slots (9 AM – 5 PM, 30-min intervals) ───────────────────────────────
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2);
  const min  = i % 2 === 0 ? '00' : '30';
  return `${String(hour).padStart(2, '0')}:${min}`;
});

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

// ── Profile skeleton ──────────────────────────────────────────────────────────
const ProfileSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-24" />
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 space-y-4">
        <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded" />)}
      </div>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const TechnicianProfile = () => {
  const { id }          = useParams();
  const navigate        = useNavigate();
  const { isLoggedIn, token } = useAuth();

  const [profile,          setProfile]          = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState('');
  const [selectedService,  setSelectedService]  = useState(null);
  const [showBooking,      setShowBooking]      = useState(false);
  const [submitting,       setSubmitting]       = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [bookingData,      setBookingData]      = useState({
    issueDescription: '',
    scheduledDate:    '',
    scheduledTime:    '',
  });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`/api/v1/technicians/${id}`);
      const data = await res.json();
      if (data.status) {
        setProfile(data.profile);
      } else {
        setError(data.message ?? 'Failed to load profile');
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setShowBooking(true);
    // Scroll to booking form
    setTimeout(() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error('Please sign in to book a service');
      navigate('/auth', { state: { from: { pathname: `/technician-profile/${id}` } } });
      return;
    }

    if (!bookingData.scheduledDate || !bookingData.scheduledTime) {
      toast.error('Please select both a date and a time slot.');
      return;
    }

    setSubmitting(true);
    try {
      const res  = await fetch('/api/v1/bookings', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          technicianId:     profile._id,
          deviceCategory:   selectedService.category,
          serviceRequested: selectedService.name,
          issueDescription: bookingData.issueDescription,
          scheduledDate:    bookingData.scheduledDate,
          scheduledTime:    bookingData.scheduledTime,
          price:            selectedService.price,
        }),
      });
      const data = await res.json();

      if (data.status) {
        toast.success('Booking created! Check your dashboard for updates.');
        navigate('/customer-dashboard');
      } else {
        toast.error(data.message ?? 'Failed to create booking.');
      }
    } catch {
      toast.error('Network error — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const cancelBooking = () => {
    setShowBooking(false);
    setSelectedService(null);
    setBookingData({ issueDescription: '', scheduledDate: '', scheduledTime: '' });
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <WebLayout>
        <div id="main-content" className="max-w-5xl mx-auto py-10 px-4">
          <ProfileSkeleton />
        </div>
      </WebLayout>
    );
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (error || !profile) {
    return (
      <WebLayout>
        <div className="max-w-2xl mx-auto py-20 px-4 text-center">
          <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            {error || 'Technician not found'}
          </h2>
          <button
            onClick={() => navigate('/find-technician')}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            Back to search
          </button>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
      <div id="main-content" className="max-w-5xl mx-auto py-10 px-4 space-y-6">

        {/* Back link */}
        <button
          onClick={() => navigate('/find-technician')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to search
        </button>

        {/* Two-column grid — stacks on mobile */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* ── LEFT: Profile card ──────────────────────────────────────── */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">

              {/* Avatar */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center overflow-hidden shrink-0 border-2 border-sky-100 dark:border-sky-900">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.userId?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Wrench className="text-sky-300 dark:text-sky-700" size={36} />
                  )}
                </div>
                <div className="space-y-1 min-w-0">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {profile.userId?.name ?? 'Technician'}
                  </h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <StarRating rating={profile.rating} />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {profile.rating?.toFixed(1)} ({profile.reviewCount} reviews)
                    </span>
                  </div>
                  {profile.verificationStatus === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Bio */}
              {profile.bio && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">About</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* Experience */}
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">{profile.yearsExperience}</span> years in the industry
              </div>

              {/* Contact */}
              <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact</h3>
                {profile.userId?.email && (
                  <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Mail size={13} className="text-sky-500 shrink-0" />
                    {profile.userId.email}
                  </p>
                )}
                {profile.userId?.phone && (
                  <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Phone size={13} className="text-sky-500 shrink-0" />
                    {profile.userId.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Specialties */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {profile.deviceCategories?.map(cat => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 text-sm font-medium rounded-full border border-sky-100 dark:border-sky-900"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability — collapsible */}
            {profile.availability?.length > 0 && (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowAvailability(v => !v)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={showAvailability}
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar size={16} className="text-sky-500" />
                    Availability
                  </h3>
                  {showAvailability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showAvailability && (
                  <div className="border-t border-slate-100 dark:border-slate-700 px-5 pb-5 space-y-2">
                    {profile.availability.map((slot, i) => (
                      <div key={i} className="flex justify-between text-sm py-1.5 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{slot.day}</span>
                        <span className="text-slate-500 dark:text-slate-400">{slot.from} – {slot.to}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT: Services ──────────────────────────────────────────── */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Services Offered</h2>

              {profile.servicesOffered?.length > 0 ? (
                <div className="space-y-3">
                  {profile.servicesOffered.map((service, idx) => {
                    const isSelected = selectedService === service;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectService(service)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                            : 'border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 bg-slate-50/50 dark:bg-slate-700/30'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                              {service.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {service.category}
                            </p>
                          </div>
                          <span className="font-bold text-sky-600 dark:text-sky-400 shrink-0">
                            ${service.price}
                          </span>
                        </div>
                        {service.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                            {service.description}
                          </p>
                        )}
                        {service.estimatedDuration && (
                          <p className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                            <Clock size={11} />
                            Est. {service.estimatedDuration}
                          </p>
                        )}
                        {isSelected && (
                          <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-2">
                            ✓ Selected — fill in the booking form below
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">No services listed yet.</p>
              )}

              {!showBooking && profile.servicesOffered?.length > 0 && (
                <p className="text-xs text-slate-400 text-center pt-2">
                  Click a service above to open the booking form.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Booking form ───────────────────────────────────────────────── */}
        {showBooking && selectedService && (
          <div
            id="booking-form"
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 max-w-2xl space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Book: {selectedService.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  with {profile.userId?.name} · <span className="font-semibold text-sky-600 dark:text-sky-400">${selectedService.price}</span>
                </p>
              </div>
              <button
                onClick={cancelBooking}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Cancel booking"
              >
                ✕
              </button>
            </div>

            {!isLoggedIn && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                You'll need to sign in before confirming your booking.
              </div>
            )}

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              {/* Issue description */}
              <div className="space-y-1.5">
                <label
                  htmlFor="issueDescription"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Describe the issue <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="issueDescription"
                  name="issueDescription"
                  value={bookingData.issueDescription}
                  onChange={handleBookingChange}
                  required
                  rows={3}
                  placeholder="What needs to be repaired and what symptoms are you seeing?"
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              {/* Date & time — side by side on sm+ */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="scheduledDate"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Preferred date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="scheduledDate"
                    type="date"
                    name="scheduledDate"
                    value={bookingData.scheduledDate}
                    onChange={handleBookingChange}
                    min={getTomorrow()}
                    required
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="scheduledTime"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Preferred time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="scheduledTime"
                    name="scheduledTime"
                    value={bookingData.scheduledTime}
                    onChange={handleBookingChange}
                    required
                    className="w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {submitting ? 'Booking…' : 'Confirm Booking'}
                </button>
                <button
                  type="button"
                  onClick={cancelBooking}
                  className="flex-1 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </WebLayout>
  );
};

export default TechnicianProfile;
