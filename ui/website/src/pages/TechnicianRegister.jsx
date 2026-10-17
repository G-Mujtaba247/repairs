import React, { useState } from 'react';
import { colors, spacing, typography } from '../resources/designSystem';

const TechnicianRegister = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    // Account
    name: '',
    email: '',
    password: '',
    phone: '',
    // Profile
    bio: '',
    yearsExperience: 0,
    deviceCategories: [],
    availability: [],
    // Services
    servicesOffered: [],
    profileImage: ''
  });

  const [currentService, setCurrentService] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    estimatedDuration: ''
  });

  const [currentAvailability, setCurrentAvailability] = useState({
    day: 'Monday',
    from: '09:00',
    to: '17:00'
  });

  const deviceCategoryOptions = [
    'Mobile Phones',
    'Laptops & PCs',
    'Tablets',
    'Home Appliances',
    'Electronics',
    'Mechanical'
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const steps = [
    { number: 1, label: 'Account' },
    { number: 2, label: 'Profile' },
    { number: 3, label: 'Services' },
    { number: 4, label: 'Availability' },
    { number: 5, label: 'Review' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const cats = prev.deviceCategories.includes(category)
        ? prev.deviceCategories.filter(c => c !== category)
        : [...prev.deviceCategories, category];
      return { ...prev, deviceCategories: cats };
    });
  };

  const handleAddService = () => {
    if (!currentService.name || !currentService.category || !currentService.price) {
      setError('Please fill in all service fields');
      return;
    }
    setFormData(prev => ({
      ...prev,
      servicesOffered: [...prev.servicesOffered, { ...currentService }]
    }));
    setCurrentService({ name: '', category: '', description: '', price: '', estimatedDuration: '' });
    setError('');
  };

  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      servicesOffered: prev.servicesOffered.filter((_, i) => i !== index)
    }));
  };

  const handleAddAvailability = () => {
    if (!currentAvailability.day || !currentAvailability.from || !currentAvailability.to) {
      setError('Please fill in all availability fields');
      return;
    }
    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, { ...currentAvailability }]
    }));
    setCurrentAvailability({ day: 'Monday', from: '09:00', to: '17:00' });
    setError('');
  };

  const handleRemoveAvailability = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError('Please fill in all required fields');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    } else if (step === 2) {
      if (!formData.bio || !formData.yearsExperience || formData.deviceCategories.length === 0) {
        setError('Please fill in all profile fields and select at least one category');
        return false;
      }
    } else if (step === 3) {
      if (formData.servicesOffered.length === 0) {
        setError('Please add at least one service');
        return false;
      }
    } else if (step === 4) {
      if (formData.availability.length === 0) {
        setError('Please add at least one availability slot');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep() && step < steps.length) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError('');
    
    try {
      // Step 1: Register user account
      const registerRes = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: 'technician'
        })
      });

      const registerData = await registerRes.json();
      if (!registerData.status) {
        setError(registerData.message || 'Registration failed');
        setLoading(false);
        return;
      }

      const token = registerData.token;

      // Step 2: Create technician profile
      const profileRes = await fetch('/api/v1/technicians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bio: formData.bio,
          yearsExperience: parseInt(formData.yearsExperience),
          deviceCategories: formData.deviceCategories,
          servicesOffered: formData.servicesOffered,
          availability: formData.availability,
          profileImage: formData.profileImage || null
        })
      });

      const profileData = await profileRes.json();
      if (!profileData.status) {
        setError(profileData.message || 'Profile creation failed');
        setLoading(false);
        return;
      }

      setSuccess('Technician registration completed! Your profile is pending verification.');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(registerData.user));
      
      setTimeout(() => {
        window.location.href = '/technician-dashboard';
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = (step / steps.length) * 100;

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: colors.background }}>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.text.primary }}>
            Technician Registration
          </h1>
          <p style={{ fontSize: typography.fontSize.base, color: colors.text.secondary, marginTop: spacing.md }}>
            Join our marketplace as a service provider
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: spacing.xl }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.md }}>
            {steps.map((s) => (
              <div
                key={s.number}
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  borderRadius: '0.5rem',
                  backgroundColor: step >= s.number ? colors.primary[500] : colors.neutral[200],
                  color: step >= s.number ? 'white' : colors.text.secondary,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  transition: '200ms'
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: colors.neutral[200], borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                backgroundColor: colors.primary[500],
                width: `${progressPercent}%`,
                transition: '300ms'
              }}
            />
          </div>
        </div>

        {/* Error Message */}
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

        {/* Success Message */}
        {success && (
          <div
            style={{
              padding: spacing.md,
              marginBottom: spacing.lg,
              backgroundColor: '#d1fae5',
              border: `1px solid ${colors.success}`,
              borderRadius: '0.5rem',
              color: colors.success,
              fontSize: typography.fontSize.sm
            }}
          >
            {success}
          </div>
        )}

        {/* Form Content */}
        <div style={{ backgroundColor: colors.card, borderRadius: '0.75rem', padding: spacing.xl }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.lg }}>
                Create Your Account
              </h2>
              <div style={{ marginBottom: spacing.md }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  placeholder="john@example.com"
                />
              </div>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Password (min 6 characters) *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  placeholder="••••••"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.lg }}>
                Build Your Profile
              </h2>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Bio / About You *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base,
                    minHeight: '100px',
                    fontFamily: typography.fontFamily.sans
                  }}
                  placeholder="Tell customers about your experience and expertise..."
                />
              </div>

              <div style={{ marginBottom: spacing.md }}>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                  Years of Experience *
                </label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.5rem',
                    fontSize: typography.fontSize.base
                  }}
                  placeholder="5"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.md }}>
                  Device Categories (Select at least one) *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: spacing.md }}>
                  {deviceCategoryOptions.map((cat) => (
                    <label
                      key={cat}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: spacing.md,
                        border: `2px solid ${formData.deviceCategories.includes(cat) ? colors.primary[500] : colors.border}`,
                        borderRadius: '0.5rem',
                        backgroundColor: formData.deviceCategories.includes(cat) ? colors.primary[50] : 'transparent',
                        cursor: 'pointer',
                        transition: '200ms'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.deviceCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        style={{ marginRight: spacing.sm, cursor: 'pointer' }}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.lg }}>
                Services Offered
              </h2>

              <div style={{ marginBottom: spacing.lg, padding: spacing.lg, backgroundColor: colors.neutral[50], borderRadius: '0.5rem' }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md }}>Add a Service</h3>

                <div style={{ marginBottom: spacing.md }}>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={currentService.name}
                    onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem'
                    }}
                    placeholder="e.g., Screen Replacement"
                  />
                </div>

                <div style={{ marginBottom: spacing.md }}>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Category *
                  </label>
                  <select
                    value={currentService.category}
                    onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem'
                    }}
                  >
                    <option value="">Select a category</option>
                    {formData.deviceCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: spacing.md }}>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Description
                  </label>
                  <textarea
                    value={currentService.description}
                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem',
                      minHeight: '60px',
                      fontFamily: typography.fontFamily.sans
                    }}
                    placeholder="Describe what's included in this service..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.md }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      value={currentService.price}
                      onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                      min="0"
                      step="0.01"
                      style={{
                        width: '100%',
                        padding: spacing.md,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0.5rem'
                      }}
                      placeholder="49.99"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                      Est. Duration (e.g., 1-2 hours)
                    </label>
                    <input
                      type="text"
                      value={currentService.estimatedDuration}
                      onChange={(e) => setCurrentService({ ...currentService, estimatedDuration: e.target.value })}
                      style={{
                        width: '100%',
                        padding: spacing.md,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0.5rem'
                      }}
                      placeholder="1-2 hours"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddService}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    backgroundColor: colors.primary[500],
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: typography.fontWeight.semibold,
                    cursor: 'pointer',
                    transition: '200ms'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.primary[600]}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.primary[500]}
                >
                  Add Service
                </button>
              </div>

              {formData.servicesOffered.length > 0 && (
                <div>
                  <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md }}>Your Services</h3>
                  {formData.servicesOffered.map((svc, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: spacing.md,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0.5rem',
                        marginBottom: spacing.md,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: typography.fontWeight.semibold }}>{svc.name}</div>
                        <div style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
                          {svc.category} • ${svc.price} • {svc.estimatedDuration}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveService(idx)}
                        style={{
                          padding: `${spacing.sm} ${spacing.md}`,
                          backgroundColor: colors.error,
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontSize: typography.fontSize.sm
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.lg }}>
                Set Availability
              </h2>

              <div style={{ marginBottom: spacing.lg, padding: spacing.lg, backgroundColor: colors.neutral[50], borderRadius: '0.5rem' }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md }}>Add Time Slot</h3>

                <div style={{ marginBottom: spacing.md }}>
                  <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                    Day *
                  </label>
                  <select
                    value={currentAvailability.day}
                    onChange={(e) => setCurrentAvailability({ ...currentAvailability, day: e.target.value })}
                    style={{
                      width: '100%',
                      padding: spacing.md,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '0.5rem'
                    }}
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md, marginBottom: spacing.md }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                      From *
                    </label>
                    <input
                      type="time"
                      value={currentAvailability.from}
                      onChange={(e) => setCurrentAvailability({ ...currentAvailability, from: e.target.value })}
                      style={{
                        width: '100%',
                        padding: spacing.md,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0.5rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: typography.fontWeight.medium, marginBottom: spacing.sm }}>
                      To *
                    </label>
                    <input
                      type="time"
                      value={currentAvailability.to}
                      onChange={(e) => setCurrentAvailability({ ...currentAvailability, to: e.target.value })}
                      style={{
                        width: '100%',
                        padding: spacing.md,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0.5rem'
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddAvailability}
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    backgroundColor: colors.primary[500],
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: typography.fontWeight.semibold,
                    cursor: 'pointer',
                    transition: '200ms'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.primary[600]}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.primary[500]}
                >
                  Add Time Slot
                </button>
              </div>

              {formData.availability.length > 0 && (
                <div>
                  <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md }}>Your Availability</h3>
                  {formData.availability.map((slot, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: spacing.md,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0.5rem',
                        marginBottom: spacing.md,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: typography.fontWeight.semibold }}>{slot.day}</div>
                        <div style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
                          {slot.from} - {slot.to}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAvailability(idx)}
                        style={{
                          padding: `${spacing.sm} ${spacing.md}`,
                          backgroundColor: colors.error,
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontSize: typography.fontSize.sm
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold, marginBottom: spacing.lg }}>
                Review Your Information
              </h2>

              <div style={{ marginBottom: spacing.lg }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md, color: colors.primary[500] }}>
                  Account
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
                  <div>
                    <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>Name</div>
                    <div style={{ fontWeight: typography.fontWeight.semibold }}>{formData.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>Email</div>
                    <div style={{ fontWeight: typography.fontWeight.semibold }}>{formData.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>Phone</div>
                    <div style={{ fontWeight: typography.fontWeight.semibold }}>{formData.phone}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md, color: colors.primary[500] }}>
                  Profile
                </h3>
                <div style={{ marginBottom: spacing.md }}>
                  <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>Bio</div>
                  <div style={{ fontWeight: typography.fontWeight.semibold }}>{formData.bio}</div>
                </div>
                <div style={{ marginBottom: spacing.md }}>
                  <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>Experience</div>
                  <div style={{ fontWeight: typography.fontWeight.semibold }}>{formData.yearsExperience} years</div>
                </div>
                <div>
                  <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>Categories</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm }}>
                    {formData.deviceCategories.map((cat) => (
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

              <div style={{ marginBottom: spacing.lg }}>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md, color: colors.primary[500] }}>
                  Services ({formData.servicesOffered.length})
                </h3>
                {formData.servicesOffered.map((svc, idx) => (
                  <div key={idx} style={{ marginBottom: spacing.md, padding: spacing.md, backgroundColor: colors.neutral[50], borderRadius: '0.5rem' }}>
                    <div style={{ fontWeight: typography.fontWeight.semibold }}>{svc.name}</div>
                    <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                      {svc.category} • ${svc.price} • {svc.estimatedDuration}
                    </div>
                    {svc.description && <div style={{ marginTop: spacing.sm, fontSize: typography.fontSize.sm }}>{svc.description}</div>}
                  </div>
                ))}
              </div>

              <div>
                <h3 style={{ fontWeight: typography.fontWeight.semibold, marginBottom: spacing.md, color: colors.primary[500] }}>
                  Availability ({formData.availability.length})
                </h3>
                {formData.availability.map((slot, idx) => (
                  <div key={idx} style={{ marginBottom: spacing.sm, fontSize: typography.fontSize.sm }}>
                    <strong>{slot.day}:</strong> {slot.from} - {slot.to}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: spacing.xl, gap: spacing.md }}>
          <button
            onClick={handlePrevStep}
            disabled={step === 1}
            style={{
              padding: `${spacing.md} ${spacing.lg}`,
              backgroundColor: colors.neutral[200],
              color: step === 1 ? colors.text.light : colors.text.primary,
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: typography.fontWeight.semibold,
              cursor: step === 1 ? 'not-allowed' : 'pointer',
              opacity: step === 1 ? 0.5 : 1,
              transition: '200ms'
            }}
          >
            Previous
          </button>

          {step < steps.length ? (
            <button
              onClick={handleNextStep}
              style={{
                padding: `${spacing.md} ${spacing.lg}`,
                backgroundColor: colors.primary[500],
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: typography.fontWeight.semibold,
                cursor: 'pointer',
                transition: '200ms'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.primary[600]}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primary[500]}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: `${spacing.md} ${spacing.lg}`,
                backgroundColor: loading ? colors.text.light : colors.success,
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: typography.fontWeight.semibold,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: '200ms'
              }}
            >
              {loading ? 'Submitting...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianRegister;
