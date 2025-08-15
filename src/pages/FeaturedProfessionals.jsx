import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedProfessionals = ({ services }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // once:true means animate only first time
  }, []);

  const professionals = Array.from(
    new Map(services.map((s) => [s.userName, s])).values()
  ).slice(0, 6);

  return (
    <section className="py-12 bg-[#F9FAFB] w-full rounded-xl">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
        <h2
          className="lg:text-3xl md:text-xl text-xl font-bold text-purple-600 text-center mb-10"
          data-aos="fade-up"
        >
          Featured Professionals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {professionals.map((pro, index) => (
            <div
              key={pro.userName}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100} // stagger effect
            >
              <img
                src={pro.userImg}
                alt={pro.userName}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-purple-500"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {pro.userName}
              </h3>
              <p className="text-sm text-gray-500">{pro.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
