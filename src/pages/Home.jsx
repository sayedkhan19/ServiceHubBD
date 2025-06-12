import React, { Suspense } from 'react';
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
      <div> 
        <Suspense fallback={<span className="loading loading-spinner text-primary"></span>}>
        <PopularService></PopularService>
        </Suspense>
        
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