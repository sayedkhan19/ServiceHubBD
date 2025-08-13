import React from 'react';
import { FaNewspaper } from 'react-icons/fa';

const newsItems = [
  {
    id: 1,
    title: 'New Bridal Makeup Trends in 2025',
    excerpt: 'Discover the latest bridal makeup styles that are trending this year and how you can achieve them effortlessly.',
  },
  {
    id: 2,
    title: 'Top 5 Spa Treatments for Relaxation',
    excerpt: 'Unwind with these popular spa therapies designed to rejuvenate your body and mind.',
  },
  {
    id: 3,
    title: 'How to Choose the Right Hairstyle for You',
    excerpt: 'Tips and tricks from experts on selecting a hairstyle that complements your face shape and lifestyle.',
  },
  {
    id: 4,
    title: 'The Benefits of Regular Facial Care',
    excerpt: 'Learn why consistent facial treatments can boost your skin health and glow.',
  },
  {
    id: 5,
    title: 'Nail Art Designs That Will Wow Everyone',
    excerpt: 'Explore creative and trendy nail art ideas perfect for every occasion.',
  },
  {
    id: 6,
    title: 'Understanding Hair Coloring Techniques',
    excerpt: 'A guide to modern hair coloring methods and how to maintain vibrant colors.',
  },
];

const NewsSection = () => {
  return (
    <section className="w-full mx-auto  py-16">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-purple-600">Latest News</h2>
      <p className="text-center mb-12 max-w-2xl mx-auto text-purple-700">
        Stay updated with the latest trends, tips, and news from the beauty and grooming world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {newsItems.map(({ id, title, excerpt }) => (
          <div
            key={id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.03] transition duration-300 cursor-pointer"
          >
            <FaNewspaper className="text-purple-600 w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">{title}</h3>
            <p className="text-gray-600 mb-4 text-center">{excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
