import React, { useState } from 'react';

function App() {
  const [pincode, setPincode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any action with the pincode here, such as sending it to a server or updating state.
    console.log('Pincode submitted:', pincode);
  };

  return (
    
      <div className="relative h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 object-cover w-full h-full"
      >
        <source src="/public/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="flex items-center justify-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-200 p-12 rounded-lg shadow-md z-10 backdrop-blur-md">
          <div className="grid grid-cols-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
                Pincode:
              </label>
              <input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mt-7 ml-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white w-40 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
