import React, { use, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const GetAllServices = ({ myServicePromise }) => {
  const { user } = useContext(AuthContext);
  const services = use(myServicePromise);

  const myServices = services.filter(service => service.userEmail === user?.email);

  return (
    <div className="w-full my-10">
      <h3 className="text-3xl font-bold mb-6">
        My Added Services: <span className="text-blue-600">{myServices.length}</span>
      </h3>

      {myServices.length > 0 ? (
        <div className="space-y-6">
          {myServices &&
          myServices?.map(service => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Side - Image */}
              <div className="md:w-1/3 w-full">
                <img
                  src={service.imageUrl}
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side - Details */}
              <div className="p-4 md:w-2/3 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-purple-600">{service.serviceName}</h4>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  <p className="text-gray-700 font-medium">Area: {service.serviceArea}</p>
                  <p className="text-purple-600 font-semibold">Price: ${service.price}</p>
                </div>

                <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={service.userPhoto}
                      alt="Provider"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-sm font-medium">{service.userName}</span>
                  </div>

                  <div className="space-x-2">
                    <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10 text-lg">
          You haven't added any services yet.
        </div>
      )}
    </div>
  );
};

export default GetAllServices;
