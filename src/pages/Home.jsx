import React, { Suspense } from 'react';
import PopularService from '../components/HomeElementPages/PopularService';
import WhyChooseUs from '../components/HomeElementPages/WhyChooseUs';
import Testimonials from '../components/HomeElementPages/Testimonials';
import StatsSection from '../components/HomeElementPages/StatsSection';
import Slider from '../components/HomeElementPages/Slider';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>

          <div>
            <Slider></Slider>
          </div>
       <div className="text-center my-8">
        <Suspense fallback={<span className="loading loading-spinner text-primary"></span>}>
          <PopularService />
        </Suspense>

        <Link
          to="/allservices"
          className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300"
        >
          View All Services
        </Link>
      </div> 


      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>
       <div>
        <StatsSection></StatsSection>
       </div>
       <div>
        <Testimonials></Testimonials>
       </div>
       
        </div>
    );
};

export default Home;