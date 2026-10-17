import React, { useState } from 'react';
import WebLayout from '../layouts/WebLayout';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ServiceHighlights from '../components/ServiceHighlights';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import BookingForm from '../components/BookingForm';
import { repairCategories, serviceHighlights } from '../resources/designSystem';

const Home = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookService = () => {
    setShowBookingForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (formData) => {
    console.log('Booking submitted:', formData);
    setShowBookingForm(false);
    alert('Booking request submitted! We will contact you soon.');
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
      <div className="min-h-screen bg-white">
        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">Book Your Repair</h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-900 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <BookingForm
                  onSubmit={handleBookingSubmit}
                  onCancel={() => setShowBookingForm(false)}
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
        <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Repair</h2>
              <p className="text-xl text-gray-600">
                Comprehensive repair services for all your electronic devices
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Why Choose Our Repair Service?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-2xl mr-4">⚡</span>
                    <div>
                      <h3 className="font-semibold text-lg">Fast Turnaround</h3>
                      <p className="text-sky-100">Most repairs completed same-day</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-4">👨‍🔧</span>
                    <div>
                      <h3 className="font-semibold text-lg">Certified Technicians</h3>
                      <p className="text-sky-100">Factory-trained professionals with 5+ years experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-4">💰</span>
                    <div>
                      <h3 className="font-semibold text-lg">Transparent Pricing</h3>
                      <p className="text-sky-100">No hidden fees, free diagnostics</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-2xl mr-4">🛡️</span>
                    <div>
                      <h3 className="font-semibold text-lg">90-Day Warranty</h3>
                      <p className="text-sky-100">All repairs covered by comprehensive warranty</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block">
                <div className="relative h-96 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl">🔧</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Your Device Fixed?</h2>
            <p className="text-xl text-gray-300 mb-8">
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
