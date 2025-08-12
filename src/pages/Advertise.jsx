import React from 'react';
import { FaUsers, FaStar, FaMobileAlt, FaHeadset, FaShieldAlt, FaRocket } from 'react-icons/fa';

const Advertise = () => {
  const features = [
    {
      icon: <FaUsers className="text-purple-600 w-12 h-12 mb-4" />,
      title: 'Trusted Professionals',
      desc: 'All service providers are verified and highly rated by customers.',
    },
    {
      icon: <FaStar className="text-purple-600 w-12 h-12 mb-4" />,
      title: 'Quality Assurance',
      desc: 'We prioritize top quality in every service for your complete satisfaction.',
    },
    {
      icon: <FaMobileAlt className="text-purple-600 w-12 h-12 mb-4" />,
      title: 'Easy Booking',
      desc: 'Book your favorite service quickly and securely with just a few clicks.',
    },
    {
      icon: <FaHeadset className="text-purple-600 w-12 h-12 mb-4" />,
      title: '24/7 Customer Support',
      desc: 'We’re here to help you anytime with any questions or concerns.',
    },
    {
      icon: <FaShieldAlt className="text-purple-600 w-12 h-12 mb-4" />,
      title: 'Secure Payments',
      desc: 'All transactions are safe and encrypted for your peace of mind.',
    },
    {
      icon: <FaRocket className="text-purple-600 w-12 h-12 mb-4" />,
      title: 'Fast & Reliable',
      desc: 'Get prompt services and timely updates to keep you in control.',
    },
  ];

  return (
    <section className="w-full mx-auto px-6 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer text-center"
          >
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advertise;
