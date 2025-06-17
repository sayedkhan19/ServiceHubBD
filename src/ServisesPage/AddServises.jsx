import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddServices = () => {
    const { user } = useContext(AuthContext);

    const handleAddService = (e) => {
        e.preventDefault();
        const form = e.target;
        const imageUrl = form.imageUrl.value;
        const price = form.price.value;
        const serviceName = form.serviceName.value;
        const description = form.description.value;
        const serviceArea = form.serviceArea.value;

        const newService = {
            imageUrl,
            price,
            serviceName,
            description,
            serviceArea,
            userEmail: user?.email,
            userName: user?.displayName,
            userPhoto : user?.photoURL,
        };

        // console.log('Service added:', newService);
        axios.post("http://localhost:3000/service", newService)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
            toast.success("Service add successfully")
            }
            
        })
        .catch(error=>{
            console.log(error)
        })
        
    };

    return (
        <div className="max-w-xl mx-auto mt-10 px-6 py-8 bg-[#F3E8FF] rounded-xl shadow-md">
            <title>Add service</title>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Service</h2>
            <form onSubmit={handleAddService} className="space-y-5">
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL of the Service
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div>
                    <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">
                        Service Name
                    </label>
                    <input
                        type="text"
                        id="serviceName"
                        name="serviceName"
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div>
                    <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700">
                        Service Area
                    </label>
                    <input
                        type="text"
                        id="serviceArea"
                        name="serviceArea"
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        required
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddServices;
