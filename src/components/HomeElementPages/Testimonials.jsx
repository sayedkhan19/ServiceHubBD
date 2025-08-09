import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

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
  },
  {
    name: "Hafezz Ahmed",
    feedback: "I loved the attention to detail! The team really listens to what you want.",
    location: "Banani, Dhaka",
    image: "https://i.pravatar.cc/150?img=3"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-white py-12 w-full">
      <div className="w-full mx-auto text-center">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-purple-700"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { threshold: 0.4 });
            const controls = useAnimation();

            useEffect(() => {
              if (inView) {
                controls.start({ opacity: 1, y: 0 });
              } else {
                controls.start({ opacity: 0, y: 40 });
              }
            }, [inView, controls]);

            return (
              <motion.div
                key={i}
                ref={ref}
                className="bg-purple-50 p-6 rounded-xl shadow-md text-left"
                initial={{ opacity: 0, y: 40 }}
                animate={controls}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
