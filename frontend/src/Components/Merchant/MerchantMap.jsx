import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

const MerchantMap = () => {
  const [merchantID, setMerchantID] = useState('');
  const [pincodes, setPincodes] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setMerchantID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(http://localhost:8080/v1/pincodes?merchantEmail=${merchantID});
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
    height: '400px',
    width: '800px'
  };

  const center = {
    lat: 20.5937, // Center the map on India
    lng: 78.9629
  };

  return (
    <div className='relative h-screen'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={merchantID}
          onChange={handleInputChange}
          placeholder="Enter Merchant ID"
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Error: {error}</p>}
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
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