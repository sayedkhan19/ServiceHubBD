import React, { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const GetAllServices = ({ myServicePromise }) => {
  const { user } = useContext(AuthContext);
  const services = use(myServicePromise);

  const [allServices, setAllServices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editService, setEditService] = useState(null); 

  useEffect(() => {
    setAllServices(services);
  }, [services]);

  const myServices = allServices.filter(service => service.userEmail === user?.email);

  // Open modal and set the service to edit
  const openEditModal = (service) => {
    setEditService(service);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditService(null);
  };

  // Handle update form submit
 const handleUpdate = (e) => {
  e.preventDefault();
  const form = e.target;

  const updatedService = {
    serviceName: form.serviceName.value,
    description: form.description.value,
    serviceArea: form.serviceArea.value,
    price: form.price.value,
    imageUrl: form.imageUrl.value,
  };

  axios.put(`http://localhost:3000/service/${editService._id}`, updatedService)
    .then(res => {
      if (res.data.modifiedCount > 0) {
        setAllServices(prev =>
          prev.map(service =>
            service._id === editService._id ? { ...service, ...updatedService } : service
          )
        );
        toast.success('Service updated successfully');
        closeModal();
      } else {
        toast.error('Failed to update service');
      }
    })
    .catch(error => {
      toast.error('Error updating service');
      console.error(error);
    });
};


  // Delete handler with Swal confirmation (unchanged)
 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure to delete?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:3000/service/${id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            setAllServices(prev => prev.filter(service => service._id !== id));
            Swal.fire("Deleted!", "Your service has been deleted.", "success");
          } else {
            toast.error("Failed to delete the service.");
          }
        })
        .catch(error => {
          toast.error("An error occurred while deleting.");
          console.error("Delete error:", error);
        });
    }
  });
};


  return (
    <div className="w-full my-10">
      <h3 className="text-3xl font-bold mb-6">
        My Added Services: <span className="text-blue-600">{myServices.length}</span>
      </h3>

      {myServices.length > 0 ? (
        <div className="space-y-6">
          {myServices.map(service => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
            >
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
                    <span className="text-sm font-medium">{service.userName}</span>
                  </div>

                  <div className="space-x-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10 text-lg">
          You haven't added any services yet.
        </div>
      )}

      {/* Modal for Editing */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Edit Service"
  className="max-w-7xl mx-auto mt-8 bg-white p-8 rounded shadow-lg outline-none
             h-[90vh] overflow-y-auto
             lg:grid lg:grid-cols-2 lg:gap-8"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto"
>
  <h2 className="text-3xl font-bold mb-6 col-span-2">Edit Service</h2>

  {editService && (
    <form
      onSubmit={handleUpdate}
      className="grid grid-cols-1 gap-6 col-span-2
                 lg:grid-cols-2 lg:gap-8"
    >
      {/* Service Name */}
      <div>
        <label className="block font-semibold mb-2">Service Name</label>
        <input
          name="serviceName"
          type="text"
          defaultValue={editService.serviceName}
          required
          className="w-full border border-gray-300 p-3 rounded"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-semibold mb-2">Price</label>
        <input
          name="price"
          type="number"
          defaultValue={editService.price}
          required
          className="w-full border border-gray-300 p-3 rounded"
        />
      </div>

      {/* Description */}
      <div className="lg:col-span-2">
        <label className="block font-semibold mb-2">Description</label>
        <textarea
          name="description"
          defaultValue={editService.description}
          required
          className="w-full border border-gray-300 p-3 rounded"
          rows={4}
        />
      </div>

      {/* Service Area */}
      <div>
        <label className="block font-semibold mb-2">Service Area</label>
        <input
          name="serviceArea"
          type="text"
          defaultValue={editService.serviceArea}
          required
          className="w-full border border-gray-300 p-3 rounded"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block font-semibold mb-2">Image URL</label>
        <input
          name="imageUrl"
          type="text"
          defaultValue={editService.imageUrl}
          required
          className="w-full border border-gray-300 p-3 rounded"
        />
      </div>

      {/* Buttons span full width on large screens */}
      <div className="flex justify-end gap-4 lg:col-span-2 mt-6">
        <button
          type="button"
          onClick={closeModal}
          className="px-6 py-3 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Update
        </button>
      </div>
    </form>
  )}
</Modal>

    </div>
  );
};

export default GetAllServices;
