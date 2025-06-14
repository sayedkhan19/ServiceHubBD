import React, { use } from 'react';

const GetAllServices = ({myServicePromise}) => {
    const services = use(myServicePromise)
    return (
        <div>
            <h3 className='text-3xl'>Service are You Added: {services.length}</h3>
        </div>
    );
};

export default GetAllServices;