import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { NavLink, useLoaderData } from 'react-router';

const AllServices = () => {
  const serviceData = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setFilteredServices(serviceData);
      setLoading(false);
    }, 1000);
  }, [serviceData]);

  useEffect(() => {
    const filtered = serviceData.filter((service) =>
      service.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchText, serviceData]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">All Services</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search services..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredServices.length === 0 ? (
          <p className="text-center text-red-500 font-semibold">No services found.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col lg:flex-row"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full lg:w-1/3 h-64 object-cover"
                />
                <div className="p-6 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-2xl font-semibold text-purple-700 mb-2">{service.name}</h2>
                    <p className="text-gray-600 mb-3">{service.description.slice(0, 100)}...</p>
                    <p className="text-sm text-gray-500 mb-1"><strong>Area:</strong> {service.area}</p>
                    <p className="text-lg text-gray-800 font-bold mb-4">Price: ${service.price}</p>
                  </div>
                  <NavLink
                    to={`/popular-details/${service._id}`}
                    className="self-start mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
