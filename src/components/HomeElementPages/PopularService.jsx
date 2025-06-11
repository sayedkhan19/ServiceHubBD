import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const PopularService = () => {
    const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/popularServices.json')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
        Popular Beauty & Grooming Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service._id}
            className="border rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
          >
            <img
              src={service.image}
              alt={service.name}
              className="rounded-xl w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-purple-700">{service.name}</h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p><strong>Price:</strong> ${service.price}</p>
            <p className='mb-3'><strong>Area:</strong> {service.area}</p>
            <NavLink to={`/popular-details/${service._id}`} className="my-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              View Details
            </NavLink>
          </div>
        ))}
      </div>
    </div>
    );
};

export default PopularService;