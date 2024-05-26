import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import 'tailwindcss/tailwind.css';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const MerchantMap = () => {
  const [merchantID, setMerchantID] = useState('');
  const [pincodes, setPincodes] = useState([]);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null); // Store a reference to the Google Map object

  const handleInputChange = (e) => {
    setMerchantID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await fetch(http://localhost:8080/v1/pincodes?merchantEmail=${merchantID});
=======
      const response = await fetch(`http://localhost:8080/v1/pincodes?merchantEmail=${merchantID}`);
>>>>>>> 14d2251de95c4620f791c867e4b74249d0dcf278
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      // Check if response contains the "response" key and if it's an array
      if (Array.isArray(responseData.response)) {
        // Set the array of pin codes to pincodes state
        setPincodes(responseData.response);
        setError(null);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      setError(error.message);
      setPincodes([]);
    }
  };
  

  const mapContainerStyle = {
    height: '600px', // Adjust height
    width: '100%' // Make map container wider
  };

  const onLoad = mapInstance => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map && pincodes.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      pincodes.forEach(pincode => {
        bounds.extend(new window.google.maps.LatLng(pincode.latitude, pincode.longitude));
      });
      map.fitBounds(bounds);
    }
  }, [map, pincodes]);

  return (
<<<<<<< HEAD
    <div className='relative h-screen'>
      <form onSubmit={handleSubmit}>
=======
    <div className="flex flex-col items-center bg-gray-100 justify-center relative h-screen">
      <form onSubmit={handleSubmit} className="mb-4">
>>>>>>> 14d2251de95c4620f791c867e4b74249d0dcf278
        <input
          type="text"
          value={merchantID}
          onChange={handleInputChange}
          placeholder="Enter Merchant ID"
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg">Search</button>
      </form>
      {error && <p>Error: {error}</p>}
      <LoadScript googleMapsApiKey={apiKey}>
<<<<<<< HEAD
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
=======
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 20.5937, lng: 78.9629 }} // Center the map on India
          zoom={5}
          onLoad={onLoad}
        >
>>>>>>> 14d2251de95c4620f791c867e4b74249d0dcf278
          {pincodes.map((pincode, index) => (
            <Marker
              key={index}
              position={{ lat: pincode.latitude, lng: pincode.longitude }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MerchantMap;