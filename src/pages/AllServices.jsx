import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { NavLink, useLoaderData } from "react-router";

const AllServices = () => {
  const serviceData = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setFilteredServices(serviceData);
      setLoading(false);
    }, 1000);
  }, [serviceData]);

  useEffect(() => {
    const filtered = serviceData.filter((service) =>
      service.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchText, serviceData]);

  useEffect(() => {
    if (!sortOption) return;
    let sortedServices = [...filteredServices];
    if (sortOption === "lowToHigh") {
      sortedServices.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "highToLow") {
      sortedServices.sort((a, b) => Number(b.price) - Number(a.price));
    }
    setFilteredServices(sortedServices);
  }, [sortOption]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 w-full">
      <title>All Services</title>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          All Services
        </h1>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search services..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full md:w-2/3 p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div>
            <label
              htmlFor="sort"
              className="mr-2 font-medium text-gray-700"
            >
              (Sort by Price):
            </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">--Select--</option>
              <option value="lowToHigh">Price Low to High</option>
              <option value="highToLow">Price High to Low</option>
            </select>
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredServices.length === 0 ? (
          <p className="text-center text-red-500 font-semibold">
            No services found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col lg:flex-row h-full border border-gray-100"
              >
                {/* Image */}
                <div className="w-full lg:w-1/3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full object-cover h-40 sm:h-48 md:h-56"
                    style={{ aspectRatio: "4 / 3" }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-3">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      {service.description.length > 80
                        ? service.description.slice(0, 77) + "..."
                        : service.description}
                    </p>
                  </div>

                  <NavLink
                    to={`/popular-details/${service._id}`}
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-purple-700 transition-colors w-max"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
