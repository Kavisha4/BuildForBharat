import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Results() {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page
  const { merchantID } = useParams(); // Get merchantID from URL parameter

  let currentLocationData = []; // Declare currentLocationData here

  useEffect(() => {
    const fetchLocationData = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch pin codes for the given merchant ID
        const pincodeResponse = await fetch(`http://localhost:8080/v1/pincodes?merchantID=${merchantID}`);
        if (!pincodeResponse.ok) {
          throw new Error(`Failed to fetch pin codes for merchant ID ${merchantID}`);
        }
        const pincodeData = await pincodeResponse.json();

        if (!pincodeData || pincodeData.length === 0) {
          setError(`Invalid merchant ID ${merchantID}`);
          setLoading(false); // Stop loading
          return; // Stop further execution
        }

        const pincodeArray = pincodeData.pincodes;

        // Step 2: Fetch latitude and longitude for each pin code
        const promises = pincodeArray.map(pincode =>
          fetch(`http://localhost:8080/v1/location?pinCode=${pincode}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch location data for pin code ${pincode}`);
              }
              return response.json();
            })
        );
        const locationDataArray = await Promise.all(promises);

        const combinedData = pincodeArray.map((pincode, index) => ({
          pincode,
          latitude: locationDataArray[index].latitude,
          longitude: locationDataArray[index].longitude
        }));

        setLocationData(combinedData);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchLocationData();
  }, [merchantID]);

  if (loading) {
    return <div className='z-20 relative text-center'>Loading...</div>;
  }

  if (error) {
    return <div className='z-20 relative text-center'>Error: {error}</div>;
  }

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  var totalPages;
  if (locationData) {
    totalPages = Math.ceil(locationData.length / itemsPerPage);
    currentLocationData = locationData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

  return (
    <div className="px-4 py-8 bg-gray-200 z-20 relative">
      <h1 className="text-white bg-black px-4 py-2 text-2xl mb-4 text-center">Results Page</h1>
      {
        !locationData && 
        <div className='text-center'>Merchant ID does not exist</div>
      }
      <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        {
          locationData && <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Merchant ID</th>
                <th className="py-2 px-4">Pincode</th>
                <th className="py-2 px-4">Latitude</th>
                <th className="py-2 px-4">Longitude</th>
              </tr>
            </thead>
            <tbody>
              {currentLocationData.map((location, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                  <td className="py-2 px-4">{merchantID}</td>
                  <td className="py-2 px-4">{location.pincode}</td>
                  <td className="py-2 px-4">{location.latitude}</td>
                  <td className="py-2 px-4">{location.longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
      {/* Pagination */}
      {locationData && locationData.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer mr-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {/* Pagination buttons */}
          <button
            className="px-4 py-2 bg-white text-gray-900 rounded cursor-pointer mr-2"
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          {/* Other pagination buttons */}
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
