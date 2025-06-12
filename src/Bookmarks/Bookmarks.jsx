import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Bookmarks = () => {
  const [bookmarkedServices, setBookmarkedServices] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookmarkedServices')) || [];
    setBookmarkedServices(stored);
  }, []);

  const handleRemoveBookmark = (id) => {
    const updatedBookmarks = bookmarkedServices.filter(service => service._id !== id);
    setBookmarkedServices(updatedBookmarks);
    localStorage.setItem('bookmarkedServices', JSON.stringify(updatedBookmarks));
    toast.success("BookMark Remove")
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">My Bookmarked Services</h2>

      {bookmarkedServices.length === 0 ? (
        <p className="text-gray-500">No services bookmarked yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarkedServices.map(service => (
            <div key={service._id} className="border p-4 rounded-xl shadow">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-2">{service.description.slice(0, 100)}...</p>
              <p><strong>Price:</strong> ${service.price}</p>
              <p className='mb-3'><strong>Area:</strong> {service.area}</p>
              <button
                onClick={() => handleRemoveBookmark(service._id)}
                className='my-4 mt-3 cursor-pointer bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
              >
                Remove Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
