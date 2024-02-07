import React, { useState } from 'react';

function Results() {
  
  const sampleData = [
    { pincode: '12345', merchant: 'Merchant A' },
    { pincode: '67890', merchant: 'Merchant B' },
    { pincode: '54321', merchant: 'Merchant C' },
    { pincode: '09876', merchant: 'Merchant D' },
    
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); 

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 py-8 bg-gray-200 z-20 relative">
      <h1 className="text-white bg-black px-4 py-2 text-2xl mb-4 text-center">Results Page</h1>
      <div className="w-70 mx-auto bg-gray-100 p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              <th className="py-2 px-4">Pincode</th>
              <th className="py-2 px-4">Merchant</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="bg-gray-200">
                <td className="py-2 px-4 text-center">{item.pincode}</td>
                <td className="py-2 px-4 text-center">{item.merchant}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="flex justify-center mt-4">
          {sampleData.map((item, index) => (
            <li key={index} className="mr-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer" onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Results;
