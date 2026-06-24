import React from 'react';

const TestimonialsSection = ({ testimonials = [] }) => {
  const defaultTestimonials = [
    {
      name: 'John Smith',
      role: 'Business Owner',
      text: 'Fast and professional service. Got my laptop repaired within 2 hours!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Student',
      text: 'Very affordable and quality work. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Home User',
      text: 'Excellent customer service and fair pricing. Will definitely use again.',
      rating: 5,
    },
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-8 shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
