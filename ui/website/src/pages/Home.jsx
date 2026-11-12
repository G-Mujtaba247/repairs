import React, { useState } from 'react';
import WebLayout from '../layouts/WebLayout';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ServiceHighlights from '../components/ServiceHighlights';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import BookingForm from '../components/BookingForm';
import { repairCategories, serviceHighlights } from '../resources/designSystem';
import { toast } from 'sonner';
import { X, Wrench } from 'lucide-react';
import apiClient from '../services/api';
import { BOOKING_CREATE } from '../resources/server_apis';

const Home = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const handleBookService = () => {
    setBookingError('');
    setShowBookingForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = async (formData) => {
    const category = repairCategories.find(({ id }) => id === formData.deviceType);
    if (!category) {
      setBookingError('Select a repair category before submitting.');
      return;
    }

    setIsBookingSubmitting(true);
    setBookingError('');
    try {
      const response = await apiClient.post(BOOKING_CREATE, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        category: category.name,
        issue: formData.issue,
        message: formData.description,
        priority: formData.priority,
        repairDate: formData.date,
        repairTime: formData.time,
        locationName: formData.address,
      });

      if (!response.data?.status) {
        throw new Error(response.data?.message || 'Unable to submit your repair request.');
      }

      setShowBookingForm(false);
      toast.success(response.data.message || 'Your repair request was submitted.');
    } catch (error) {
      const message = error.response?.data?.message || error.data?.message || error.message ||
        'Unable to submit your repair request. Please try again.';
      setBookingError(message);
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'What is your service area?',
      answer: 'We provide repair services across the metropolitan area and surrounding regions within 50 miles. Contact us to confirm service availability for your location.',
    },
    {
      question: 'Do you offer emergency repairs?',
      answer: 'Yes, we offer 24/7 emergency repair services for critical issues. Emergency appointments are subject to availability and may have additional charges.',
    },
    {
      question: 'How long do repairs typically take?',
      answer: 'Most repairs are completed within 1-4 hours depending on the device type and issue. We provide time estimates during the booking process.',
    },
    {
      question: 'What is your warranty policy?',
      answer: 'All repairs come with a 90-day warranty on parts and labor. If the same issue occurs within this period, we will fix it at no additional cost.',
    },
    {
      question: 'Do you repair all device brands?',
      answer: 'Yes, we service all major brands including Apple, Samsung, LG, Dell, HP, GE, Whirlpool, and many more. Contact us if you have questions about your specific device.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, cash, bank transfers, and digital payment methods. Payment is required after the repair is completed.',
    },
  ];

  return (
    <WebLayout>
      <div id="main-content" className="min-h-screen bg-background">
        {/* Booking Form Modal */}
        {showBookingForm && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-h-[90vh] w-full max-w-2xl overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10">
                <h2 id="booking-modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">
                  Book Your Repair
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  aria-label="Close booking form"
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <BookingForm
                  onSubmit={handleBookingSubmit}
                  onCancel={() => setShowBookingForm(false)}
                  submitting={isBookingSubmitting}
                  submitError={bookingError}
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <HeroSection
          title="Expert Device Repair Services"
          subtitle="Get your phones, laptops, appliances, and more fixed by certified technicians. Fast, affordable, and reliable."
          ctaText1="Book Now"
          ctaText2="View Services"
          onCtaClick1={handleBookService}
          onCtaClick2={() => window.scrollTo({ top: document.getElementById('services')?.offsetTop || 0, behavior: 'smooth' })}
        />

        {/* Service Highlights */}
        <ServiceHighlights highlights={serviceHighlights} />

        {/* Services Section */}
        <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">What We Repair</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Comprehensive repair services for all your electronic devices
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {repairCategories.map(category => (
                <ServiceCard
                  key={category.id}
                  icon={category.icon}
                  title={category.name}
                  description={category.description}
                  issues={category.issues}
                  onBook={handleBookService}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Why Choose Our Repair Service?</h2>
                <ul className="space-y-4">
                  {[
                    { icon: '⚡', title: 'Fast Turnaround',       desc: 'Most repairs completed same-day' },
                    { icon: '🔧', title: 'Certified Technicians', desc: 'Factory-trained professionals with 5+ years experience' },
                    { icon: '💰', title: 'Transparent Pricing',   desc: 'No hidden fees, free diagnostics' },
                    { icon: '🛡️', title: '90-Day Warranty',       desc: 'All repairs covered by comprehensive warranty' },
                  ].map(({ icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-4">
                      <span className="text-2xl" aria-hidden="true">{icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <p className="text-sky-100">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="relative h-80 w-80 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Wrench className="text-white/60" size={96} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* Final CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Your Device Fixed?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Schedule your repair appointment today and get back to what matters most.
            </p>
            <button
              onClick={handleBookService}
              className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition-all text-lg"
            >
              Book Your Repair Now →
            </button>
          </div>
        </section>
      </div>
    </WebLayout>
  );
};

export default Home;
