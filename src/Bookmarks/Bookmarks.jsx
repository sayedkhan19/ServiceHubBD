import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    // Get Firebase token then fetch bookings with Authorization header
    user.getIdToken().then(token => {
      fetch(`http://localhost:3000/posts?email=${encodeURIComponent(user.email)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch bookings');
          return res.json();
        })
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
          toast.error('Failed to load bookings.');
        });
    });
  }, [user]);

  const handleRemoveBooking = (id) => {
    user.getIdToken().then(token => {
      fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete booking');
          return res.json();
        })
        .then(result => {
          if (result.deletedCount > 0) {
            setBookings(prev => prev.filter(item => item._id !== id));
            toast.success('Booking removed!');
          } else {
            toast.error('Failed to remove booking.');
          }
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to remove booking.');
        });
    });
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading your bookings...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <title>BookMarked</title>
      <h2 className="text-3xl font-bold text-purple-700 mb-8 border-b pb-2 text-center md:text-left">
        My Booked Services
      </h2>

      {bookings.length > 0 ? (
        <div className="flex flex-col gap-8">
          {bookings.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="flex flex-col p-6 flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-purple-700 mb-3">{item.name}</h3>
                  <p className="mb-1"><span className="font-semibold text-gray-700">Date:</span> {item.bookingDate}</p>
                  <p className="mb-1"><span className="font-semibold text-gray-700">Instructions:</span> {item.instruction}</p>
                  <p className="mb-1"><span className="font-semibold text-gray-700">Area:</span> {item.area}</p>
                  <p className="mb-1">
                    <span className="font-semibold text-gray-700">Price:</span>{' '}
                    <span className="text-purple-600 font-semibold">${item.price}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveBooking(item._id)}
                  className="mt-4 w-max cursor-pointer bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-200 self-start"
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
