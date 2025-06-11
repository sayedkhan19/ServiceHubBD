import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  return (
    <section className="bg-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-purple-700"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🛡️", title: "Trusted Professionals", desc: "Certified experts providing top-notch services." },
            { icon: "⏱️", title: "On-Time Delivery", desc: "Punctual and reliable service at your convenience." },
            { icon: "💬", title: "24/7 Support", desc: "We are here for you anytime, anywhere." }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
