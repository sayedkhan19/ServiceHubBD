import React from 'react';
import Modal from 'react-modal';

const EditServiceModal = ({ isOpen, onClose, onSubmit, service }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Service"
      className="max-w-7xl mx-auto mt-8 bg-white p-8 rounded shadow-lg outline-none h-[90vh] overflow-y-auto lg:grid lg:grid-cols-2 lg:gap-8"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto"
    >
      <h2 className="text-3xl font-bold mb-6 col-span-2">Edit Service</h2>

      {service && (
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-6 col-span-2 lg:grid-cols-2 lg:gap-8"
        >
          <div>
            <label className="block font-semibold mb-2">Service Name</label>
            <input
              name="serviceName"
              type="text"
              defaultValue={service.serviceName}
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Price</label>
            <input
              name="price"
              type="number"
              defaultValue={service.price}
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={service.description}
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
              defaultValue={service.serviceArea}
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              name="imageUrl"
              type="text"
              defaultValue={service.imageUrl}
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
          </div>

          <div className="flex justify-end gap-4 lg:col-span-2 mt-6">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default EditServiceModal;
