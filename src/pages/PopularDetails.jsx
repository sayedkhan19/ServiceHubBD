import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

const PopularDetails = () => {
      const services = useLoaderData();
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const details = services.find(service => service._id === id);
    setSelectedService(details);
  }, [services, id]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {selectedService && (
        <>
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="rounded-xl w-full h-64 object-cover mb-6"
          />
          <h2 className="text-3xl font-bold text-purple-700 mb-2">{selectedService.name}</h2>
          <p className="text-gray-600 mb-4">{selectedService.description}</p>
          <p className="text-lg mb-2"><strong>Price:</strong> ${selectedService.price}</p>
          <p className="text-lg mb-4"><strong>Area:</strong> {selectedService.area}</p>
          <button className="my-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Book This Service
          </button>
        </>
      )}
    </div>
    );
};

export default PopularDetails;