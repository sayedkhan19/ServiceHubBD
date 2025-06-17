import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const ServiceToDo = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookedServices')) || [];
    const userBookings = stored.filter(item => item.userEmail === user?.email);
    setBookings(userBookings);
  }, [user?.email]);

  const updateStatus = (id, newStatus) => {
    const stored = JSON.parse(localStorage.getItem('bookedServices')) || [];
    
    // Update the status of the booking for the current user
    const updated = stored.map(item => {
      if (item._id === id && item.userEmail === user?.email) {
        return { ...item, status: newStatus };
      }
      return item;
    });

    localStorage.setItem('bookedServices', JSON.stringify(updated));

    // Update UI bookings state to reflect change
    const userBookings = updated.filter(item => item.userEmail === user?.email);
    setBookings(userBookings);

    toast.success(`Status updated to "${newStatus}"`);
  };

  const handleRemoveBooking = (id) => {
    const stored = JSON.parse(localStorage.getItem('bookedServices')) || [];

    const updated = stored.filter(item => !(item._id === id && item.userEmail === user?.email));
    localStorage.setItem('bookedServices', JSON.stringify(updated));

    const userBookings = updated.filter(item => item.userEmail === user?.email);
    setBookings(userBookings);

    toast.success('Booking removed!');
  };

  const handleDetailsClick = (id) => {
    navigate(`/popular-details/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[#FFFFFF]">
      <title>Service-To-Do</title>
      <h2 className="text-3xl font-bold text-purple-700 mb-6">My Bookings</h2>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-purple-100">
              <tr className='bg-[#FFFFFF] text-black'>
                <th className="py-3 px-4 border">Service</th>
                <th className="py-3 px-4 border">Customer</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings?.map((item) => (
                <tr key={item._id} className="text-center text-black">
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.userName}</td>
                  <td className="py-2 px-4 border">${item.price}</td>
                  <td className="py-2 px-4 border">{item.bookingDate}</td>
                  <td className="py-2 px-4 border">
                    <select
                      value={item.status || 'Pending'}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="border border-gray-300 rounded p-1 text-center cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Working">Working</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleDetailsClick(item._id)}
                      className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleRemoveBooking(item._id)}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default ServiceToDo;
