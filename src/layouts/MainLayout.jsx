import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';
import Footer from '../components/HomeElementPages/Footer';

const MainLayout = () => {
    return (
        <div className='w-11/12 mx-auto flex flex-col min-h-screen'>
            <NavBar></NavBar>
            <main className='flex-1 w-11/12 mx-auto'>
             <Outlet></Outlet>
            </main>
            
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;