import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const SERVICE_ID = 'service_6wl2msn';
    const TEMPLATE_ID = 'template_l9gn0gf';
    const USER_ID = 'zStx7EDBP1Dy2FbV6';

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    toast.promise(
      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID),
      {
        loading: 'Sending...',
        success: () => {
          setFormData({ name: '', email: '', message: '' });
          return 'Message sent successfully!';
        },
        error: 'Failed to send message. Please try again.',
      }
    );
  };

  return (
    <section className="w-full mx-auto px-6 py-16 text-gray-800 bg-[#F9FAFB]">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

      <h2 className="lg:text-3xl md:text-xl text-xl font-extrabold text-center mb-8 text-purple-600">Contact Us</h2>
      <p className="text-center mb-12 text-lg max-w-xl mx-auto">
        Have questions or want to book a service? Reach out to us and we’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
        noValidate
      >
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 cursor-pointer text-white font-semibold py-3 rounded-md hover:bg-purple-600 transition-colors"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
