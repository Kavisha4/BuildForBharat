import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Results() {
  const [merchantData, setMerchantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page
  const { pincodes } = useParams(); // Get pincodes from URL parameter

  useEffect(() => {
    const fetchMerchantData = async () => {
      setLoading(true);
      try {
        const pincodeArray = pincodes.split(',').map(pincode => pincode.trim());
        //console.log(pincodeArray)
        const promises = pincodeArray.map(pincode =>
          fetch(`http://35.207.207.45/:8080/merchants?pincodes=${pincode}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch data for pincode ${pincode}`);
              }
              return response.json();
            })
        );
        const data = await Promise.all(promises);
        setMerchantData(data[0]["merchant_indexes"]);
     
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

  const totalPages = Math.ceil(merchantData.length / itemsPerPage);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMerchantData = merchantData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div className="px-4 py-8 bg-gray-200 z-20 relative">
      <h1 className="text-white bg-black px-4 py-2 text-2xl mb-4 text-center">Results Page</h1>
      <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4">Pincode</th>
              <th className="py-2 px-4">Merchant ID</th>
            </tr>
          </thead>
          <tbody>
            {currentMerchantData.map((merchant, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                <td className="py-2 px-4">{pincodes}</td>
                <td className="py-2 px-4">{merchant}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          {currentPage > 1 && (
            <>
              <button
                className="px-4 py-2 bg-white text-gray-900 rounded cursor-pointer mr-2"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {currentPage > 4 && <span className="px-4 py-2">...</span>}
            </>
          )}
          {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = pageNumber === currentPage;
            const showPageNumber = currentPage === 1 || currentPage === totalPages || (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2);
            return (
              showPageNumber && (
                <button
                  key={index}
                  className={`px-4 py-2 ${isCurrentPage ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} rounded cursor-pointer mr-2`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            );
          })}
          {currentPage < totalPages && (
            <>
              {currentPage < totalPages - 3 && <span className="px-4 py-2">...</span>}
              <button
                className="px-4 py-2 bg-white text-gray-900 rounded cursor-pointer mr-2"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
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
