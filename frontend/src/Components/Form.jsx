import React, { useState } from 'react';

function Form({ onSubmit }) {
  const [pincode, setPincode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pincode);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit} className="bg-gray-200 p-12 rounded-lg shadow-md z-10 backdrop-blur-md">
        <div className="grid grid-cols-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
              Pincodes: (comma separated)
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
  );
}

export default Form;
