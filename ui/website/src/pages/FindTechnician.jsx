import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';

const FindTechnician = () => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    fetch('/api/v1/technicians')
      .then(r => r.json())
      .then(data => { if (data.status) setTechs(data.technicians || []); })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Find a Technician</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {techs.map(t => (
          <ServiceCard key={t._id} title={t.userId?.name || 'Technician'} description={t.bio} ctaText="View" />
        ))}
      </div>
    </div>
  );
}

export default FindTechnician;
