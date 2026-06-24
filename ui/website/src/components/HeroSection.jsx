import React from 'react';

const HeroSection = ({ 
  title = 'Book Your Device Repair Online', 
  subtitle = 'Fast, reliable, and affordable repair services for all your electronic devices',
  ctaText1 = 'Book Now',
  ctaText2 = 'Learn More',
  onCtaClick1 = () => {},
  onCtaClick2 = () => {},
  backgroundGradient = true,
}) => {
  return (
    <section className={`relative py-20 px-4 sm:px-6 lg:px-8 ${backgroundGradient ? 'bg-gradient-to-r from-sky-50 via-blue-50 to-purple-50' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onCtaClick1}
                className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                {ctaText1}
              </button>
              <button
                onClick={onCtaClick2}
                className="px-8 py-3 border-2 border-gray-300 hover:border-sky-500 text-gray-900 hover:text-sky-600 font-semibold rounded-lg transition-all"
              >
                {ctaText2}
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:block relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-purple-100 rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              <span className="animate-bounce" style={{animationDelay: '0s'}}>📱</span>
              <span className="animate-bounce ml-4" style={{animationDelay: '0.2s'}}>💻</span>
              <span className="animate-bounce ml-4" style={{animationDelay: '0.4s'}}>⌚</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
