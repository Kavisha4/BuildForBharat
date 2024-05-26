import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative h-screen">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl font-bold mb-6">Welcome to ONDC</h1>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h2 className="text-xl font-semibold mb-2">For Merchants</h2>
            
            <Link to="/login" className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Merchant Login
            </Link>
            <Link to="/merchant-map" className="mt-2 ml-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Visualization
            </Link>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4">
            <h2 className="text-xl font-semibold mb-2">For Buyers</h2>
            
            <Link to="/search" className="mt-2 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Buyer Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
