import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const ServiceToDo = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch all bookings from backend (no email filter)
  useEffect(() => {
    if (!user) return;

    user.getIdToken().then(token => {
      fetch(`http://localhost:3000/bookings/all`, {
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
          toast.error('Failed to load bookings.');
          setLoading(false);
        });
    });
  }, [user]);

  const updateStatus = (id, newStatus) => {
    if (!user) return;

    user.getIdToken().then(token => {
      fetch(`http://localhost:3000/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to update status');
          return res.json();
        })
        .then(() => {
          setBookings(prev =>
            prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
          );
          toast.success(`Status updated to "${newStatus}"`);
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to update status');
        });
    });
  };

  const handleRemoveBooking = (id) => {
    if (!user) return;

    user.getIdToken().then(token => {
      fetch(`http://localhost:3000/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete booking');
          return res.json();
        })
        .then(() => {
          setBookings(prev => prev.filter(item => item._id !== id));
          toast.success('Booking removed!');
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to remove booking');
        });
    });
  };

  // Open modal with booking details
  const handleDetailsClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading bookings...</p>;
  }

  return (
    <div className="w-full mx-auto px-4 py-8 bg-[#F9FAFB]">
      <title>Service-To-Do</title>
      <h2 className="text-3xl font-bold text-purple-700 mb-6">All Post</h2>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-purple-100">
              <tr className="bg-[#FFFFFF] text-black">
                <th className="py-3 px-4 border">Service</th>
                <th className="py-3 px-4 border">Customer</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Date</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item) => (
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
                      onClick={() => handleDetailsClick(item)}
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

      {/* Modal */}
      {showModal && selectedBooking && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h3 className="text-2xl font-bold text-purple-700 mb-4">{selectedBooking.name}</h3>

            <img
              src={selectedBooking.image || 'https://via.placeholder.com/400x250'}
              alt={selectedBooking.name}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <p><strong>Customer:</strong> {selectedBooking.userName}</p>
            <p><strong>Email:</strong> {selectedBooking.userEmail}</p>
            <p><strong>Booking Date:</strong> {selectedBooking.bookingDate}</p>
            <p><strong>Instructions:</strong> {selectedBooking.instruction || 'N/A'}</p>
            <p><strong>Area:</strong> {selectedBooking.area || 'N/A'}</p>
            <p><strong>Price:</strong> ${selectedBooking.price}</p>
            <p><strong>Status:</strong> {selectedBooking.status || 'Pending'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceToDo;
