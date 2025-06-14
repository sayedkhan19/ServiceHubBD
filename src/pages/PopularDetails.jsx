import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useParams } from 'react-router';

const PopularDetails = () => {
  const services = useLoaderData(); // Get all services
  const { id } = useParams(); // Get the service ID from the route
  const [selectedService, setSelectedService] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  // Load the selected service based on the ID
  useEffect(() => {
    const details = services.find(service => service._id === id);
    setSelectedService(details);

    // Check if this service is already bookmarked
    const stored = JSON.parse(localStorage.getItem('bookmarkedServices')) || [];
    const alreadyBookmarked = stored.some(s => s._id === id);
    setBookmarked(alreadyBookmarked);
  }, [services, id]);

  // Handle Bookmark Button Click
  const handleBookMark = () => {
    if (!selectedService) return;

    const stored = JSON.parse(localStorage.getItem('bookmarkedServices')) || [];

    const isAlreadyBookmarked = stored.some(s => s._id === selectedService._id);

    if (!isAlreadyBookmarked) {
      stored.push(selectedService);
      localStorage.setItem('bookmarkedServices', JSON.stringify(stored));
      setBookmarked(true);
      toast.success('Service Bookmarked!');
    } else {
      toast.error('Already Bookmarked');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {selectedService ? (
        <>
          <img
            src={selectedService.image}
            alt={selectedService.name}
            className="rounded-xl w-full h-64 object-cover mb-6"
          />
          <h2 className="text-3xl font-bold text-purple-700 mb-2">{selectedService.name}</h2>
          <p className="text-gray-600 mb-4">{selectedService.description}</p>
          
          <div className='flex gap-2 mb-2 items-center'>
          
          <strong>Provider:</strong> <img className='rounded-full bg-black w-10 h-10' src={selectedService.userImg} alt="" /> {selectedService.userName}
         
          </div>
          <p className="text-lg mb-2">
            <strong>Price:</strong> ${selectedService.price}
          </p>
          <p className="text-lg mb-4">
            <strong>Area:</strong> {selectedService.area}
          </p>
          

          {!bookmarked ? (
            <button
              onClick={handleBookMark}
              className="my-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Book This Service
            </button>
          ) : (
            <div className="my-4 p-4 bg-green-100 text-green-800 rounded">
              ✅ This service has been bookmarked!
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">Loading service details...</p>
      )}
    </div>
  );
};

export default PopularDetails;
