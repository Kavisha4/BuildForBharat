import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Results() {
  const [merchantData, setMerchantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page
  const { pincodes } = useParams(); // Get pincodes from URL parameter

  let currentMerchantData = []; // Declare currentMerchantData here

  useEffect(() => {
    const fetchMerchantData = async () => {
      setLoading(true);
      try {
        const pincodeArray = pincodes.split(',').map(pincode => pincode.trim());
        const promises = pincodeArray.map(pincode =>
          fetch(`http://35.207.207.45:8080/v1/merchants?pincodes=${pincode}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch data for pincode ${pincode}`);
              }
              return response.json();
            })
        );
        const data = await Promise.all(promises);
        
        const invalidPincodeIndex = data.findIndex(merchantData => !merchantData || merchantData.length === 0);
        if (invalidPincodeIndex !== -1) {
          setError(`Invalid pincode ${pincodeArray[invalidPincodeIndex]}`);
          setLoading(false); // Stop loading
          return; // Stop further execution
        }

        const merchantSets = data.map(item => new Set(item["merchant_emails"]));
        const intersection = merchantSets.reduce((acc, set) => {
          return new Set([...acc].filter(email => set.has(email)));
        });

        setMerchantData(Array.from(intersection));

      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchMerchantData();
  }, [pincodes]);

  if (loading) {
    return <div className='z-20 relative text-center'>Loading...</div>;
  }

  if (error) {
    return <div className='z-20 relative text-center'>Error: {error}</div>;
  }

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const totalPages = Math.ceil(merchantData.length / itemsPerPage);
  currentMerchantData = merchantData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="px-4 py-8 bg-gray-200 z-20 relative">
      <h1 className="text-white bg-black px-4 py-2 text-2xl mb-4 text-center">Results Page</h1>
      <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        {merchantData.length === 0 && 
          <div className='text-center'>No merchants found for the given pincodes</div>
        }
        {merchantData.length > 0 && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Merchant ID</th>
              </tr>
            </thead>
            <tbody>
              {currentMerchantData.map((merchant, index) => (
                <tr key={merchant} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                  <td className="py-2 text-center px-4">{merchant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      {merchantData.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mr-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} rounded cursor-pointer mr-2`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mr-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Results;
