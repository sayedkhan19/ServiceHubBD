import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Ahmed",
    feedback: "Excellent service and super friendly staff! Will definitely book again.",
    location: "Dhanmondi, Dhaka",
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Raihan Khan",
    feedback: "Affordable and professional. My haircut and styling were perfect.",
    location: "Gulshan, Dhaka",
    image: "https://i.pravatar.cc/150?img=2"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-purple-700"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              className="bg-purple-50 p-6 rounded-xl shadow-md text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border" />
                <div>
                  <h4 className="font-semibold text-purple-700">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.location}</span>
                </div>
              </div>
              <p className="text-gray-700">“{t.feedback}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
