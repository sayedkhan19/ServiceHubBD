import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { getAuth } from "firebase/auth";


Modal.setAppElement('#root');

const GetAllServices = ({ myServicePromise }) => {
  const { user } = useContext(AuthContext);
  const [allServices, setAllServices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editService, setEditService] = useState(null); 

  // Load services from the promise
  useEffect(() => {
    if (myServicePromise) {
      myServicePromise.then(data => {
        setAllServices(data);
      }).catch(error => {
        console.error('Error loading services:', error);
        toast.error('Failed to load services.');
      });
    }
  }, [myServicePromise]);

  const myServices = allServices.filter(service => service.userEmail === user?.email);

  const openEditModal = (service) => {
    setEditService(service);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditService(null);
  };

const handleUpdate = async (e) => {
  e.preventDefault();
  const form = e.target;

  const updatedService = {
    serviceName: form.serviceName.value,
    description: form.description.value,
    serviceArea: form.serviceArea.value,
    price: form.price.value,
    imageUrl: form.imageUrl.value,
  };

  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to update a service.");
      return;
    }

    const token = await user.getIdToken();

    const res = await axios.put(
      `http://localhost:3000/service/${editService._id}`,
      updatedService,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.result.modifiedCount > 0) {
      setAllServices(prev =>
        prev.map(service =>
          service._id === editService._id
            ? { ...service, ...updatedService }
            : service
        )
      );
      toast.success("Service updated successfully");
      closeModal();
    } else {
      toast.error("Failed to update service");
    }
  } catch (error) {
    toast.error("Error updating service");
    console.error(error);
  }
};





const handleDelete = async (id) => {
  try {
    
    const result = await Swal.fire({
      title: "Are you sure to delete?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return; 
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("You must be logged in to delete a service.");
      return;
    }

    const token = await user.getIdToken();

    const response = await fetch(`http://localhost:3000/service/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      toast.success("Service deleted successfully.");

      
      setAllServices(prevServices =>
        prevServices.filter(service => service._id !== id)
      );
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Failed to delete the service.");
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("An error occurred while deleting.");
  }
};



  return (
    <div className="w-full my-10">
      <title>Manage</title>
      <h3 className="text-3xl font-bold mb-6">
        My Added Services: <span className="text-blue-600">{myServices.length}</span>
      </h3>

      {myServices.length > 0 ? (
        <div className="space-y-6">
          {myServices && myServices?.map(service => (
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
                      className="bg-purple-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-purple-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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
        className="max-w-7xl mx-auto mt-8 bg-white p-8 rounded shadow-lg outline-none h-[90vh] overflow-y-auto lg:grid lg:grid-cols-2 lg:gap-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto"
      >
        <h2 className="text-3xl font-bold mb-6 col-span-2">Edit Service</h2>

        {editService && (
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 gap-6 col-span-2 lg:grid-cols-2 lg:gap-8"
          >
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
