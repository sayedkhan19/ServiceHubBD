import React, { Suspense, useContext } from 'react';
import GetAllServices from '../ServicePage/GetAllServices';
import { AuthContext } from '../Provider/AuthProvider';
import { myServicePromise } from '../api/serviceApi';



const ManageService = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Suspense fallback={<span className="loading loading-spinner text-primary"></span>}>
                <GetAllServices 
                myServicePromise={myServicePromise(user?.email)}
                ></GetAllServices>
            </Suspense>
        </div>
    );
};

export default ManageService;