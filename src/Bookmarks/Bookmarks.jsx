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

    // Remove booking only for the current user
    const updated = stored.filter(item => !(item._id === id && item.userEmail === user?.email));
    localStorage.setItem('bookedServices', JSON.stringify(updated));

    // Update UI
    const userBookings = updated.filter(item => item.userEmail === user?.email);
    setBookings(userBookings);

    toast.success('Booking removed!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">My Booked Services</h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((item, idx) => (
            <div key={idx} className="border p-4 rounded shadow relative">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold text-purple-600">{item.name}</h3>
              <p><strong>Date:</strong> {item.bookingDate}</p>
              <p><strong>Instructions:</strong> {item.instruction}</p>
              <p><strong>Booked by:</strong> {item.userName} ({item.userEmail})</p>
              <p><strong>Area:</strong> {item.area}</p>
              <p><strong>Price:</strong> ${item.price}</p>

              <button
                onClick={() => handleRemoveBooking(item._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove Booking
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookmarks;
