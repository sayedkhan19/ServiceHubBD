import React from 'react';

const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 w-full">
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 md:w-2/3 flex flex-col justify-between">
        <div>
          <h4 className="text-2xl font-bold mb-2 text-purple-600">
            {service.serviceName}
          </h4>
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
            <span className="text-sm font-medium text-black">{service.userName}</span>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => onEdit(service)}
              className="bg-purple-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(service._id)}
              className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
