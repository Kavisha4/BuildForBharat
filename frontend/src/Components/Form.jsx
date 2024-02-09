import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Form() {
  const [pincodes, setPincodes] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const navigateTo = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const pincodes2 = pincodes.split(',').map((pc) => pc.trim());

    const invalidPincode = pincodes2.find((pc) => isNaN(pc) || pc.length !== 6);
    if (invalidPincode) {
      setPincodeError('Pincode must be a 6-digit numerical value separated by commas.');
      return;
    }
    else{
      const pincodeArray = pincodes.split(',').map(pincode => pincode.trim());
      navigateTo(`/results/${pincodeArray.join(',')}`);
    }
   
  };

  return (
    <div className="relative h-screen">
      {/* Form content */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-full">
        <div className='bg-gray-300 p-10 rounded-md'> 
          <label htmlFor="pincodes" className="block text-gray-700 text-sm font-bold mb-2">Pincodes: </label>
          <input
          required
            id="pincodes"
            type="text"
            value={pincodes}
            onChange={(e) => setPincodes(e.target.value)}
            className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Comma separated..."
          />
           {pincodeError && <p className="text-red-500 text-xs italic">{pincodeError}</p>}
          <button type="submit" className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
