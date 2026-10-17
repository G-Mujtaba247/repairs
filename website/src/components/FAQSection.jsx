import React, { useState } from 'react';

const FAQSection = ({ faqs = [] }) => {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <button
                onClick={() => setOpenId(openId === idx ? null : idx)}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                <span className={`text-2xl text-sky-500 transition-transform ${openId === idx ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              {openId === idx && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
