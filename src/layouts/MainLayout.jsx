import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';
import Footer from '../components/HomeElementPages/Footer';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;