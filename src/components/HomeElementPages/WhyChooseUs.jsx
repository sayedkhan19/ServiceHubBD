import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 40 });
    }
  }, [inView, controls]);

  const items = [
    { icon: "🛡️", title: "Trusted Professionals", desc: "Certified experts providing top-notch services." },
    { icon: "⏱️", title: "On-Time Delivery", desc: "Punctual and reliable service at your convenience." },
    { icon: "💬", title: "24/7 Support", desc: "We are here for you anytime, anywhere." }
  ];

  return (
    <section className="bg-purple-50 py-12 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 text-purple-700"
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              animate={controls}
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
