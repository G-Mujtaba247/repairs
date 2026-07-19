import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import { useParams } from 'react-router-dom';

const TechnicianProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/technicians/${id}`)
      .then(r => r.json())
      .then(data => { if (data.status) setProfile(data.profile); })
      .catch(err => console.error(err));
  }, [id]);

  const handleBooking = (formData) => {
    // POST booking to API (requires auth ideally)
    fetch('/api/v1/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(r => r.json()).then(console.log).catch(console.error);
  }

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold">{profile.userId?.name}</h1>
        <p className="text-gray-600 mt-2">{profile.bio}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Services</h3>
          <ul className="mt-2 space-y-2">
            {profile.servicesOffered.map((s, i) => (
              <li key={i} className="p-3 border rounded">{s.name} — ${s.price}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Book this technician</h2>
        <BookingForm onSubmit={handleBooking} technicianId={profile._id} />
      </div>
    </div>
  );
}

export default TechnicianProfile;
