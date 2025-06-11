import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Outlet></Outlet>
    </div>
    );
};

export default DashboardLayout;