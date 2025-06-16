import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookedServices')) || [];
    const userBookings = stored.filter(item => item.userEmail === user?.email);
    setBookings(userBookings);
  }, [user?.email]);

  const handleRemoveBooking = (id) => {
    const stored = JSON.parse(localStorage.getItem('bookedServices')) || [];

    const updated = stored.filter(item => !(item._id === id && item.userEmail === user?.email));
    localStorage.setItem('bookedServices', JSON.stringify(updated));

    const userBookings = updated.filter(item => item.userEmail === user?.email);
    setBookings(userBookings);

    toast.success('Booking removed!');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-purple-700 mb-8 border-b pb-2 text-center md:text-left">My Booked Services</h2>

      {bookings.length > 0 ? (
        <div className="flex flex-col gap-8">
          {bookings.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image on top on mobile, left on md+ */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-48 h-48 object-cover"
              />

              {/* Info below on mobile, right on md+ */}
              <div className="flex flex-col p-6 flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3">{item.name}</h3>
                  <p className="mb-1"><span className="font-semibold text-gray-700">Date:</span> {item.bookingDate}</p>
                  <p className="mb-1"><span className="font-semibold text-gray-700">Instructions:</span> {item.instruction}</p>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-700">Booked by:</span> {item.userName}{' '}
                    <span className="text-gray-500">({item.userEmail})</span>
                  </p>
                  <p className="mb-1"><span className="font-semibold text-gray-700">Area:</span> {item.area}</p>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-700">Price:</span>{' '}
                    <span className="text-purple-600 font-semibold">${item.price}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveBooking(item._id)}
                  className="mt-4 w-max bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-200 self-start"
                  aria-label={`Remove booking for ${item.name}`}
                >
                  Remove Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-16 text-lg">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookmarks;
