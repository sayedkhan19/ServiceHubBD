import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';
import Footer from '../components/HomeElementPages/Footer';

const MainLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;