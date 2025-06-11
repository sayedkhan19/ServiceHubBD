import React from 'react';
import PopularService from '../components/HomeElementPages/PopularService';
import WhyChooseUs from '../components/HomeElementPages/WhyChooseUs';
import Testimonials from '../components/HomeElementPages/Testimonials';
import StatsSection from '../components/HomeElementPages/StatsSection';
import Slider from '../components/HomeElementPages/Slider';

const Home = () => {
    return (
        <div>

          <div>
            <Slider></Slider>
          </div>
      <div> <PopularService></PopularService></div> 

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