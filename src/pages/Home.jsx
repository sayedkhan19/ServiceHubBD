import React, { Suspense } from 'react';
import PopularService from '../components/HomeElementPages/PopularService';
import WhyChooseUs from '../components/HomeElementPages/WhyChooseUs';
import Testimonials from '../components/HomeElementPages/Testimonials';
import StatsSection from '../components/HomeElementPages/StatsSection';
import Slider from '../components/HomeElementPages/Slider';
import { Link } from 'react-router';
import Advertise from './Advertise';
import NewsSection from './NewsSection';
import FeaturedProfessionals from './FeaturedProfessionals';
import servicesData from '../.././public/popularServices.json';

const Home = () => {
    return (
        <div className=''>
<title>Home</title>
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
        <Advertise></Advertise>
      </div>


      {/* <div>
        <WhyChooseUs></WhyChooseUs>
      </div> */}
       <div>
        <StatsSection></StatsSection>
       </div>

       <div>
        <NewsSection></NewsSection>
       </div>

       <div>
        <FeaturedProfessionals services={servicesData}></FeaturedProfessionals>
       </div>
       <div>
        <Testimonials></Testimonials>
       </div>
       
        </div>
    );
};

export default Home;