import React from 'react';
import errorImg from '../assets/download.png';
import { Link } from 'react-router';

const NotFound = () => {
    return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10 text-center">
      {/* Image Placeholder */}
      <div className="w-full max-w-md mb-8">
        <img
          src={errorImg}
          alt="Error Illustration"
          className="w-full h-auto object-contain rounded-xl shadow-lg"
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Oops! Page not found</h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl shadow hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
    );
};

export default NotFound;