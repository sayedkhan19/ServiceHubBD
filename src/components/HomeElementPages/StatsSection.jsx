import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const stats = [
  {
    title: "Happy Clients",
    count: 1200,
    description: "Serving clients across Dhaka with premium care.",
    icon: "😊"
  },
  {
    title: "Services Delivered",
    count: 3500,
    description: "From makeovers to massages, we’ve done it all!",
    icon: "💇‍♀️"
  },
  {
    title: "Experts Available",
    count: 45,
    description: "Certified professionals ready to serve you.",
    icon: "👩‍🔬"
  }
];

const StatsSection = () => {
  return (
    <section className="bg-purple-100 py-12 px-4 rounded-xl">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          className="lg:text-3xl md:text-xl text-xl font-bold mb-10 text-purple-800"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Impact in Numbers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats &&
          stats?.map((stat, i) => (
            <motion.div 
              key={i}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-purple-700 mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-purple-900 mb-2">
                <CountUp end={stat.count} duration={2} />
                +
              </p>
              <p className="text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
