import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useParams } from 'react-router';
import Modal from 'react-modal';
import { AuthContext } from '../Provider/AuthProvider';

Modal.setAppElement('#root');

const PopularDetails = () => {
  const services = useLoaderData();
  const { id } = useParams();
  const [selectedService, setSelectedService] = useState(null);
  const [booked, setBooked] = useState(false); // changed from bookmarked -> booked
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    date: '',
    instruction: '',
    userEmail: '',
    userName: ''
  });

  useEffect(() => {
    const details = services.find(service => service._id === id);
    setSelectedService(details);

    // Check if current user already booked this service
    const bookedServices = JSON.parse(localStorage.getItem('bookedServices')) || [];
    const alreadyBooked = bookedServices.some(
      (booking) => booking._id === id && booking.userEmail === user?.email
    );
    setBooked(alreadyBooked);

    if (user) {
      setFormData(prev => ({
        ...prev,
        userEmail: user.email || '',
        userName: user.displayName || ''
      }));
    }
  }, [services, id, user]);

  const handleBookMark = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmBooking = () => {
    if (!formData.date.trim() || !formData.instruction.trim()) {
      toast.error('Please fill in all required fields!');
      return;
    }

    if (!selectedService) return;

    const bookingData = {
      ...selectedService,
      bookingDate: formData.date,
      instruction: formData.instruction,
      userEmail: formData.userEmail,
      userName: formData.userName,
      status: 'Pending'
    };

    const stored = JSON.parse(localStorage.getItem('bookedServices')) || [];

    // Prevent duplicate booking on confirm button (extra safety)
    const isAlreadyBooked = stored.some(
      (booking) => booking._id === selectedService._id && booking.userEmail === user?.email
    );
    if (isAlreadyBooked) {
      toast.error('You have already booked this service!');
      setIsModalOpen(false);
      setBooked(true);
      return;
    }

    stored.push(bookingData);
    localStorage.setItem('bookedServices', JSON.stringify(stored));

    toast.success('Service booked successfully!');
    setIsModalOpen(false);
    setBooked(true);

    setFormData(prev => ({
      ...prev,
      date: '',
      instruction: ''
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {selectedService ? (
        <>
          <img src={selectedService.image} alt={selectedService.name} className="rounded-xl w-full h-64 object-cover mb-6" />
          <h2 className="text-3xl font-bold text-purple-700 mb-2">{selectedService.name}</h2>
          <p className="text-gray-600 mb-4">{selectedService.description}</p>

          <div className='flex gap-2 mb-2 items-center'>
            <strong>Provider:</strong>
            <img className='rounded-full bg-black w-10 h-10' src={selectedService.userImg} alt="" />
            {selectedService.userName}
          </div>
          <p className="text-lg mb-2"><strong>Price:</strong> ${selectedService.price}</p>
          <p className="text-lg mb-4"><strong>Area:</strong> {selectedService.area}</p>

          {!booked ? (
            <button
              onClick={handleBookMark}
              className="my-4 cursor-pointer bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Book This Service
            </button>
          ) : (
            <div className="my-4 p-4 bg-green-100 text-green-800 rounded">
              ✅ You have already booked this service!
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">Loading service details...</p>
      )}

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white max-w-xl mx-auto p-6 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4 cursor-pointer text-purple-700">Book This Service</h2>

        <form className="space-y-4">
          <input
            name="userName"
            value={formData.userName}
            readOnly
            className="w-full p-2 border rounded"
            placeholder="Your Name"
          />
          <input
            name="userEmail"
            value={formData.userEmail}
            readOnly
            className="w-full p-2 border rounded"
            placeholder="Your Email"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Service Date"
          />
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Special Instructions"
          />

          <button
            type="button"
            onClick={handleConfirmBooking}
            className="bg-purple-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-purple-700 w-full"
          >
            Book Now
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PopularDetails;
