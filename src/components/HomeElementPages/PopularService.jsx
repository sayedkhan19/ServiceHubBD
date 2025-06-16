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
    <div className="px-4 md:px-12 lg:px-20 py-12 bg-white rounded-3xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-purple-700 text-left">
        Popular Beauty & Grooming Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.slice(0, 6).map(service => (
          <div
            key={service._id}
            className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow text-left">
              <h3 className="text-2xl font-semibold text-purple-700 mb-3">{service.name}</h3>
              
              <p className="text-gray-700 flex-grow mb-4 leading-relaxed">
                {service.description.length > 120
                  ? service.description.slice(0, 117) + "..."
                  : service.description}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <strong className="text-gray-700">Provider:</strong>
                <img
                  className="rounded-full w-10 h-10 object-cover border-2 border-purple-600"
                  src={service.userImg}
                  alt={service.userName}
                  title={service.userName}
                />
                <span className="text-gray-800 font-medium">{service.userName}</span>
              </div>

              <p className="text-lg font-semibold text-purple-700 mb-2">
                Price: <span className="text-gray-800">${service.price}</span>
              </p>

              <p className="text-gray-600 mb-6">
                <strong>Area:</strong> {service.area}
              </p>

              <NavLink
                to={`/popular-details/${service._id}`}
                className="mt-auto bg-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                View Details
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularService;
