import React from 'react';
import PopularService from '../components/HomeElementPages/PopularService';
import WhyChooseUs from '../components/HomeElementPages/WhyChooseUs';
import Testimonials from '../components/HomeElementPages/Testimonials';

const Home = () => {
    return (
        <div>
      <div> <PopularService></PopularService></div> 

      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>
       
       <div>
        <Testimonials></Testimonials>
       </div>
       
        </div>
    );
};

export default Home;