import React, { useState } from 'react';
import { repairCategories, repairPriorities } from '../resources/designSystem';
import { validateEmail, validatePhone } from '../lib/validations';

const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BookingForm = ({ onSubmit, onCancel, technicianId, submitting = false, submitError = '' }) => {
  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    deviceType: '',
    issue: '',
    priority: 'medium',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  const steps = [
    { number: 1, label: 'Device Type' },
    { number: 2, label: 'Issue Details' },
    { number: 3, label: 'Schedule' },
    { number: 4, label: 'Your Info' },
    { number: 5, label: 'Review' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationErrors(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const getStepErrors = (stepNumber) => {
    const errors = {};
    if (stepNumber === 1 && !formData.deviceType) {
      errors.deviceType = 'Choose a device category.';
    }
    if (stepNumber === 2) {
      if (!formData.issue) errors.issue = 'Choose the main issue.';
      if (!repairPriorities.some(({ value }) => value === formData.priority)) {
        errors.priority = 'Choose a priority level.';
      }
    }
    if (stepNumber === 3) {
      if (!formData.date) errors.date = 'Choose a preferred date.';
      else if (formData.date < getLocalDate()) errors.date = 'Choose today or a future date.';
      if (!formData.time) errors.time = 'Choose a preferred time.';
    }
    if (stepNumber === 4) {
      if (!formData.firstName.trim()) errors.firstName = 'Enter your first name.';
      if (!formData.lastName.trim()) errors.lastName = 'Enter your last name.';
      if (!formData.email.trim()) errors.email = 'Enter your email address.';
      else if (!validateEmail(formData.email.trim())) errors.email = 'Enter a valid email address.';
      if (!formData.phone.trim()) errors.phone = 'Enter your phone number.';
      else if (!validatePhone(formData.phone)) errors.phone = 'Enter a valid phone number.';
    }
    return errors;
  };

  const handleNextStep = () => {
    const errors = getStepErrors(step);
    setValidationErrors(errors);
    if (!Object.keys(errors).length && step < steps.length) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    for (let stepNumber = 1; stepNumber < steps.length; stepNumber += 1) {
      const errors = getStepErrors(stepNumber);
      if (Object.keys(errors).length) {
        setStep(stepNumber);
        setValidationErrors(errors);
        return;
      }
    }

    if (onSubmit) {
      const payload = { ...formData };
      if (technicianId) payload.technicianId = technicianId;
      onSubmit(payload);
    }
  };

  const getSelectedCategory = () => repairCategories.find(cat => cat.id === formData.deviceType);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 sm:p-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div
                aria-current={step === s.number ? 'step' : undefined}
                aria-label={`Step ${s.number}: ${s.label}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s.number
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > s.number ? '✓' : s.number}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > s.number ? 'bg-sky-500' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm">Step {step} of {steps.length}</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">{steps[step - 1].label}</h2>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6 mb-8">
        {/* Step 1: Device Type */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repairCategories.map(category => (
              <button
                key={category.id}
                type="button"
                aria-pressed={formData.deviceType === category.id}
                onClick={() => {
                  handleInputChange({ target: { name: 'deviceType', value: category.id } });
                  setFormData(prev => ({ ...prev, issue: '' }));
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.deviceType === category.id
                    ? 'border-sky-500 bg-sky-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </button>
            ))}
          </div>
        )}
        {validationErrors.deviceType && <p className="text-sm text-red-600" role="alert">{validationErrors.deviceType}</p>}

        {/* Step 2: Issue Details */}
        {step === 2 && getSelectedCategory() && (
          <div className="space-y-4">
            <div>
              <span className="block text-sm font-semibold text-gray-900 mb-3">
                What's the main issue?
              </span>
              <div className="space-y-2">
                {getSelectedCategory().issues.map(issue => (
                  <label key={issue} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="issue"
                      value={issue}
                      checked={formData.issue === issue}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-sky-500"
                    />
                    <span className="ml-3 text-gray-900">{issue}</span>
                  </label>
                ))}
              </div>
            </div>
            {validationErrors.issue && <p className="text-sm text-red-600" role="alert">{validationErrors.issue}</p>}

            <div>
              <span className="block text-sm font-semibold text-gray-900 mb-3">
                Priority Level
              </span>
              <div className="grid grid-cols-3 gap-3">
                {repairPriorities.map(priority => (
                  <label
                    key={priority.value}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.priority === priority.value
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={formData.priority === priority.value}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="rounded text-sm font-semibold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-sky-600" style={{ color: priority.color }}>
                      {priority.label}
                    </div>
                  </label>
                ))}
              </div>
              {validationErrors.priority && <p className="mt-2 text-sm text-red-600" role="alert">{validationErrors.priority}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="booking-date" className="block text-sm font-semibold text-gray-900 mb-2">
                Preferred Date
              </label>
              <input
                id="booking-date"
                type="date"
                name="date"
                min={getLocalDate()}
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-invalid={Boolean(validationErrors.date)}
                aria-describedby={validationErrors.date ? 'booking-date-error' : undefined}
              />
              {validationErrors.date && <p id="booking-date-error" className="mt-1 text-sm text-red-600" role="alert">{validationErrors.date}</p>}
            </div>
            <div>
              <label htmlFor="booking-time" className="block text-sm font-semibold text-gray-900 mb-2">
                Preferred Time
              </label>
              <input
                id="booking-time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-invalid={Boolean(validationErrors.time)}
                aria-describedby={validationErrors.time ? 'booking-time-error' : undefined}
              />
              {validationErrors.time && <p id="booking-time-error" className="mt-1 text-sm text-red-600" role="alert">{validationErrors.time}</p>}
            </div>
          </div>
        )}

        {/* Step 4: Personal Information */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-first-name" className="block text-sm font-semibold text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  id="booking-first-name"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="John"
                  aria-invalid={Boolean(validationErrors.firstName)}
                  aria-describedby={validationErrors.firstName ? 'booking-first-name-error' : undefined}
                />
                {validationErrors.firstName && <p id="booking-first-name-error" className="mt-1 text-sm text-red-600" role="alert">{validationErrors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="booking-last-name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Last Name
                </label>
                <input
                  id="booking-last-name"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Doe"
                  aria-invalid={Boolean(validationErrors.lastName)}
                  aria-describedby={validationErrors.lastName ? 'booking-last-name-error' : undefined}
                />
                {validationErrors.lastName && <p id="booking-last-name-error" className="mt-1 text-sm text-red-600" role="alert">{validationErrors.lastName}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="booking-email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                id="booking-email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="john@example.com"
                aria-invalid={Boolean(validationErrors.email)}
                aria-describedby={validationErrors.email ? 'booking-email-error' : undefined}
              />
              {validationErrors.email && <p id="booking-email-error" className="mt-1 text-sm text-red-600" role="alert">{validationErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="booking-phone" className="block text-sm font-semibold text-gray-900 mb-2">
                Phone
              </label>
              <input
                id="booking-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="+1 (555) 000-0000"
                aria-invalid={Boolean(validationErrors.phone)}
                aria-describedby={validationErrors.phone ? 'booking-phone-error' : undefined}
              />
              {validationErrors.phone && <p id="booking-phone-error" className="mt-1 text-sm text-red-600" role="alert">{validationErrors.phone}</p>}
            </div>
            <div>
              <label htmlFor="booking-address" className="block text-sm font-semibold text-gray-900 mb-2">
                Address <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <input
                id="booking-address"
                type="text"
                name="address"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="123 Main St, City, State"
              />
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Review Your Booking</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Device Type:</span>
                <span className="font-semibold text-gray-900">{getSelectedCategory()?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Issue:</span>
                <span className="font-semibold text-gray-900">{formData.issue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Priority:</span>
                <span className="font-semibold text-gray-900">{repairPriorities.find(p => p.value === formData.priority)?.label}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-semibold text-gray-900">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-900">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold text-gray-900">{formData.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {submitError && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{submitError}</p>}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={step === 1}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        {step < steps.length ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="flex-1 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 text-white font-semibold rounded-lg transition-colors"
          >
            {submitting ? 'Submitting request…' : 'Submit Repair Request'}
          </button>
        )}
      </div>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full mt-3 px-6 py-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default BookingForm;
