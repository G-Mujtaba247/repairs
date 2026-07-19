import React from 'react';
import BookingForm from '../components/BookingForm';

const TechnicianRegister = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Technician Registration</h1>
      <p className="text-gray-600 mb-6">Multi-step profile setup coming — placeholder form below.</p>
      <div className="bg-white p-6 rounded shadow">
        {/* Placeholder: reuse BookingForm layout for input structure visual parity */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Full name</label>
            <input className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input className="w-full border p-2 rounded" />
          </div>
          <button className="px-4 py-2 bg-sky-500 text-white rounded">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default TechnicianRegister;
