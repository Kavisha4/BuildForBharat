import React, { useState } from 'react';

function Results() {
  // Sample data for demonstration
  const sampleData = [
    { pincode: '12345', merchant: 'Merchant A' },
    { pincode: '67890', merchant: 'Merchant B' },
    { pincode: '54321', merchant: 'Merchant C' },
    { pincode: '09876', merchant: 'Merchant D' },
    { pincode: '12345', merchant: 'Merchant E' },
    { pincode: '67890', merchant: 'Merchant B' },
    { pincode: '54321', merchant: 'Merchant C' },
    { pincode: '09876', merchant: 'Merchant D' },
    { pincode: '12345', merchant: 'Merchant F' },
    { pincode: '67890', merchant: 'Merchant B' },
    { pincode: '54321', merchant: 'Merchant C' },
    { pincode: '09876', merchant: 'Merchant D' },
    // Add more data as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of items per page

  // Calculate total number of pages
  const totalPages = Math.ceil(sampleData.length / itemsPerPage);

  // Change page
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);
  const goToPage = (page) => setCurrentPage(page);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
            {/* Render items based on current page */}
            {sampleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
              <tr key={index} className="bg-gray-200">
                <td className="py-2 px-4 text-center">{item.pincode}</td>
                <td className="py-2 px-4 text-center">{item.merchant}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mr-2" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          {currentPage > 3 && <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mr-2" onClick={() => goToPage(1)}>1</button>}
          {currentPage > 4 && <span className="px-4 py-2">...</span>}
          {pageNumbers.map((pageNumber) => (
            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) && 
            <button key={pageNumber} className={`px-4 py-2 ${pageNumber === currentPage ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} rounded cursor-pointer mr-2`} onClick={() => goToPage(pageNumber)}>{pageNumber}</button>
          ))}
          {currentPage < totalPages - 3 && <span className="px-4 py-2">...</span>}
          {currentPage < totalPages - 2 && <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mr-2" onClick={() => goToPage(totalPages)}>{totalPages}</button>}
          <button className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Results;
