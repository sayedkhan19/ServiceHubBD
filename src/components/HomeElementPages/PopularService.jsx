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
    <div className="py-10 bg-white">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-purple-700">
        Popular Beauty & Grooming Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 6).map(service => (
          <div
            key={service._id}
            className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center text-center flex-grow justify-center">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {service.name}
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {service.description.length > 100
                  ? service.description.slice(0, 97) + "..."
                  : service.description}
              </p>

              {/* Centered Action Button */}
              <NavLink
                to={`/popular-details/${service._id}`}
                className="bg-purple-600 text-white px-4 py-1.5 rounded-md font-medium hover:bg-purple-700 transition-colors text-xs"
              >
                Details
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularService;
