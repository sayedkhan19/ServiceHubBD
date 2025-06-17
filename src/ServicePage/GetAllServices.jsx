import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import ServiceCard from './ServiceCard';
import EditServiceModal from './EditServiceModal';

const GetAllServices = ({ myServicePromise }) => {
  const { user } = useContext(AuthContext);
  const [allServices, setAllServices] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editService, setEditService] = useState(null);

  useEffect(() => {
    if (myServicePromise) {
      myServicePromise
        .then(data => setAllServices(data))
        .catch(error => {
          console.error('Error loading services:', error);
          toast.error('Failed to load services.');
        });
    }
  }, [myServicePromise]);

  const myServices = allServices.filter(service => service.userEmail === user?.email);

  const openEditModal = service => {
    setEditService(service);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditService(null);
  };

  const handleUpdate = async e => {
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
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error('You must be logged in to update a service.');
        return;
      }

      const token = await currentUser.getIdToken();

      const res = await axios.put(
        `https://service-provider-code-server.vercel.app/service/${editService._id}`,
        updatedService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.result.modifiedCount > 0) {
        setAllServices(prev =>
         prev && prev?.map(service =>
            service._id === editService._id ? { ...service, ...updatedService } : service
          )
        );
        toast.success('Service updated successfully');
        closeModal();
      } else {
        toast.error('Failed to update service');
      }
    } catch (error) {
      toast.error('Error updating service');
      console.error(error);
    }
  };

  const handleDelete = async id => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (!result.isConfirmed) return;

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error('You must be logged in to delete a service.');
        return;
      }

      const token = await currentUser.getIdToken();

      const response = await fetch(`https://service-provider-code-server.vercel.app/service/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Service deleted successfully.');
        setAllServices(prev => prev.filter(service => service._id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to delete the service.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('An error occurred while deleting.');
    }
  };

  return (
    <div className="w-full my-10">
      <h3 className="text-3xl font-bold mb-6">
        My Added Services: <span className="text-blue-600">{myServices.length}</span>
      </h3>

      {myServices.length > 0 ? (
        <div className="space-y-6">
          {myServices && myServices?.map(service => (
            <ServiceCard
              key={service._id}
              service={service}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-10 text-lg">
          You haven't added any services yet.
        </div>
      )}

      <EditServiceModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleUpdate}
        service={editService}
      />
    </div>
  );
};

export default GetAllServices;
