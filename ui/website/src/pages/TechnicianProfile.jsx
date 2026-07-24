import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colors, spacing, typography } from '../resources/designSystem';

const TechnicianProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    issueDescription: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/v1/technicians/${id}`);
      const data = await response.json();

      if (data.status) {
        setProfile(data.profile);
      } else {
        setError(data.message || 'Failed to load technician profile');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while loading the profile');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowBooking(true);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to book a service');
      navigate('/login');
      return;
    }

    if (!bookingData.scheduledDate || !bookingData.scheduledTime) {
      setError('Please select a date and time');
      return;
    }

    try {
      const response = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          technicianId: profile._id,
          deviceCategory: selectedService.category,
          serviceRequested: selectedService.name,
          issueDescription: bookingData.issueDescription,
          scheduledDate: bookingData.scheduledDate,
          scheduledTime: bookingData.scheduledTime,
          price: selectedService.price
        })
      });

      const data = await response.json();
      if (data.status) {
        alert('Booking created successfully! Check your dashboard for updates.');
        navigate('/customer-dashboard');
      } else {
        setError(data.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the booking');
    }
  };

  const getAvailableTimes = () => {
    // Return predefined time slots from 9 AM to 5 PM
    const times = [];
    for (let hour = 9; hour < 17; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return times;
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: colors.text.secondary }}>Loading technician profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: spacing.xl }}>
        <div
          style={{
            padding: spacing.lg,
            backgroundColor: '#fee2e2',
            border: `1px solid ${colors.error}`,
            borderRadius: '0.5rem',
            color: colors.error
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: spacing.xl }}>
        <p style={{ color: colors.text.secondary }}>Technician not found</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh', paddingBottom: spacing.xl }}>
      {/* Header */}
      <div style={{ backgroundColor: colors.primary[500], color: 'white', padding: `${spacing.xl} ${spacing.lg}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => navigate('/find-technician')}
            style={{
              marginBottom: spacing.md,
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: typography.fontSize.sm
            }}
          >
            ← Back to Search
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: spacing.xl }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xl, marginBottom: spacing.xl }}>
          {/* Left Column - Profile Info */}
          <div>
            {/* Profile Card */}
            <div
              style={{
                backgroundColor: colors.card,
                borderRadius: '0.75rem',
                border: `1px solid ${colors.border}`,
                padding: spacing.xl,
                marginBottom: spacing.lg
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: colors.primary[50],
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  marginBottom: spacing.lg,
                  backgroundImage: profile.profileImage ? `url(${profile.profileImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!profile.profileImage && '👨‍🔧'}
              </div>

              {/* Name */}
              <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.sm }}>
                {profile.userId?.name || 'Technician'}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < Math.floor(profile.rating) ? colors.warning : colors.neutral[300],
                        fontSize: '20px'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ fontWeight: typography.fontWeight.semibold }}>
                  {profile.rating.toFixed(1)} ({profile.reviewCount} reviews)
                </span>
              </div>

              {/* Verification Badge */}
              {profile.verificationStatus === 'verified' && (
                <div
                  style={{
                    display: 'inline-block',
                    padding: `${spacing.sm} ${spacing.md}`,
                    backgroundColor: '#d1fae5',
                    color: colors.success,
                    borderRadius: '9999px',
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                    marginBottom: spacing.lg
                  }}
                >
                  ✓ Verified
                </div>
              )}

              {/* Bio */}
              <div style={{ marginBottom: spacing.lg }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>About</h3>
                <p style={{ color: colors.text.secondary, lineHeight: typography.lineHeight.relaxed }}>
                  {profile.bio}
                </p>
              </div>

              {/* Experience */}
              <div style={{ marginBottom: spacing.lg }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>Experience</h3>
                <p style={{ color: colors.text.secondary }}>
                  <strong>{profile.yearsExperience}</strong> years in the industry
                </p>
              </div>

              {/* Contact Info */}
              <div style={{ marginTop: spacing.lg, paddingTop: spacing.lg, borderTop: `1px solid ${colors.border}` }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.sm }}>Contact</h3>
                <p style={{ color: colors.text.secondary, marginBottom: spacing.sm }}>
                  📧 {profile.userId?.email}
                </p>
                <p style={{ color: colors.text.secondary }}>
                  📞 {profile.userId?.phone || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Categories */}
            <div
              style={{
                backgroundColor: colors.card,
                borderRadius: '0.75rem',
                border: `1px solid ${colors.border}`,
                padding: spacing.lg
              }}
            >
              <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md }}>Specialties</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.md }}>
                {profile.deviceCategories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      padding: `${spacing.sm} ${spacing.md}`,
                      backgroundColor: colors.primary[50],
                      color: colors.primary[700],
                      borderRadius: '9999px',
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Services & Booking */}
          <div>
            {/* Services */}
            <div
              style={{
                backgroundColor: colors.card,
                borderRadius: '0.75rem',
                border: `1px solid ${colors.border}`,
                padding: spacing.xl,
                marginBottom: spacing.lg
              }}
            >
              <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.lg }}>
                Services Offered
              </h2>

              {profile.servicesOffered.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                  {profile.servicesOffered.map((service, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: spacing.lg,
                        backgroundColor: colors.neutral[50],
                        borderRadius: '0.5rem',
                        border: `1px solid ${colors.border}`,
                        cursor: 'pointer',
                        transition: '200ms',
                        backgroundColor: selectedService === service ? colors.primary[50] : colors.neutral[50],
                        borderColor: selectedService === service ? colors.primary[500] : colors.border
                      }}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: spacing.sm }}>
                        <div>
                          <h4 style={{ fontWeight: typography.fontWeight.semibold }}>{service.name}</h4>
                          <p style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                            {service.category}
                          </p>
                        </div>
                        <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.primary[500] }}>
                          ${service.price}
                        </div>
                      </div>

                      {service.description && (
                        <p style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary, marginBottom: spacing.sm }}>
                          {service.description}
                        </p>
                      )}

                      <p style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                        ⏱️ Est. {service.estimatedDuration}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: colors.text.secondary }}>No services listed yet</p>
              )}
            </div>

            {/* Availability */}
            <div
              style={{
                backgroundColor: colors.card,
                borderRadius: '0.75rem',
                border: `1px solid ${colors.border}`,
                padding: spacing.xl
              }}
            >
              <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md }}>Availability</h3>

              {profile.availability.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  {profile.availability.map((slot, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: spacing.sm, borderBottom: `1px solid ${colors.border}` }}>
                      <span style={{ fontWeight: typography.fontWeight.medium }}>{slot.day}</span>
                      <span style={{ color: colors.text.secondary }}>
                        {slot.from} - {slot.to}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: colors.text.secondary }}>Availability not set</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        {showBooking && selectedService && (
          <div
            style={{
              backgroundColor: colors.card,
              borderRadius: '0.75rem',
              border: `1px solid ${colors.border}`,
              padding: spacing.xl,
              maxWidth: '600px'
            }}
          >
            <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.lg }}>
              Book {selectedService.name}
            </h2>

            {error && (
              <div
                style={{
                  padding: spacing.md,
                  marginBottom: spacing.lg,
                  backgroundColor: '#fee2e2',
                  border: `1px solid ${colors.error}`,
                  borderRadius: '0.5rem',
                  color: colors.error,
                  fontSize: typography.fontSize.sm
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitBooking}>
              <div style={{ marginBottom: spacing.lg }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Service
                </label>
                <div
                  style={{
                    padding: spacing.md,
                    backgroundColor: colors.neutral[50],
                    borderRadius: '0.5rem',
                    fontWeight: typography.fontWeight.semibold
                  }}
                >
                  {selectedService.name} - ${selectedService.price}
                </div>
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Issue Description *
                </label>
                <textarea
                  name="issueDescription"
                  value={bookingData.issueDescription}
                  onChange={handleBookingChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    minHeight: '80px',
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.base
                  }}
                  placeholder="Describe the issue or what you need..."
                  required
                />
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="scheduledDate"
                  value={bookingData.scheduledDate}
                  onChange={handleBookingChange}
                  min={getMinDate()}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Preferred Time *
                </label>
                <select
                  name="scheduledTime"
                  value={bookingData.scheduledTime}
                  onChange={handleBookingChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  required
                >
                  <option value="">Select a time</option>
                  {getAvailableTimes().map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: spacing.md,
                  backgroundColor: colors.success,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: typography.fontWeight.semibold,
                  cursor: 'pointer',
                  transition: '200ms',
                  fontSize: typography.fontSize.base
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Book Service
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowBooking(false);
                  setSelectedService(null);
                  setBookingData({ issueDescription: '', scheduledDate: '', scheduledTime: '' });
                }}
                style={{
                  width: '100%',
                  padding: spacing.md,
                  marginTop: spacing.md,
                  backgroundColor: colors.neutral[200],
                  color: colors.text.primary,
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: typography.fontWeight.semibold,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {!showBooking && (
          <div style={{ textAlign: 'center', padding: spacing.xl }}>
            <p style={{ color: colors.text.secondary, marginBottom: spacing.md }}>
              Click on a service above to book an appointment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianProfile;
