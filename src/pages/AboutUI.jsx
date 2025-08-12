import React from 'react';

const AboutUI = () => {
     return (
    <section className="w-full mx-auto px-6 py-16 text-gray-800 bg-[#F9FAFB]">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-purple-600">
        About Us
      </h1>

      <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12">
        We connect you with trusted beauty and grooming professionals across Dhaka,
        offering top-quality services ranging from bridal makeup to spa treatments.
        Our mission is to empower skilled artists and experts while providing
        seamless booking experiences for customers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="bg-pink-500 text-white rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-6a2 2 0 114 0v6m-2-10a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Expert Professionals</h3>
          <p className="text-gray-600">
            We partner with skilled and vetted artists who are passionate about what they do.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="bg-pink-500 text-white rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
          <p className="text-gray-600">
            Book your preferred service with just a few clicks and enjoy hassle-free scheduling.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="bg-pink-500 text-white rounded-full p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-gray-600">
            We prioritize quality and strive to deliver a memorable experience every time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUI;