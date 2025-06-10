import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;