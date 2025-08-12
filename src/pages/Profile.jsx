import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookingCount, setBookingCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch booking count for logged-in user
    fetch(`https://service-provider-code-server.vercel.app/bookings/count?email=${encodeURIComponent(user.email)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch booking count');
        return res.json();
      })
      .then(data => {
        setBookingCount(data.count);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load booking count.');
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 mt-10 bg-white rounded-lg shadow-md bg-[#F9FAFB]">
      <title>My Profile</title>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* User Photo */}
        <img
          src={user.photoURL || 'https://via.placeholder.com/150'}
          alt={user.displayName || 'User Photo'}
          className="rounded-full w-40 h-40 object-cover border-4 border-purple-600"
        />

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">{user.displayName || 'No Name Provided'}</h1>
          <p className="text-gray-700 mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700 mb-4"><strong>User ID:</strong> {user.uid}</p>

          <div className="bg-purple-100 p-4 rounded-lg max-w-xs">
            <h2 className="text-xl font-semibold mb-2 text-purple-700">Your Bookings</h2>
            {loading ? (
              <div className="flex items-center gap-2 text-purple-700">
                <svg
                  className="animate-spin h-6 w-6 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Loading booking count...</span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-purple-800">
                {bookingCount} {bookingCount === 1 ? 'Booking' : 'Bookings'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
