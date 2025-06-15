import React, { use, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const GetAllServices = ({ myServicePromise }) => {
  const { user } = useContext(AuthContext);
  const services = use(myServicePromise);

  // Filter services to only include those added by the logged-in user
  const myServices = services.filter(service => service.userEmail === user?.email);

  return (
    <div className="w-full mt-10">
      <h3 className="text-3xl font-bold mb-6">
        My Added Service: <span className="text-blue-600">{myServices.length}</span>
      </h3>

      {myServices.length > 0 ? (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="table w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>Provider</th>
                <th>Service Name</th>
                <th>Area</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myServices.map(service => (
                <tr key={service._id} className="hover:bg-gray-50">
                  <td className="flex items-center gap-2 py-3">
                    <img
                      src={service.userPhoto}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{service.userName}</span>
                  </td>
                  <td>{service.serviceName}</td>
                  <td>{service.serviceArea}</td>
                  <td>${service.price}</td>
                  <td className="space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
