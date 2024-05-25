import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
      const response = await fetch(`http://35.207.207.45:5173?merchantID=${merchantID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPincodes(data);
      setError(null);
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
    <div>
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
      <LoadScript googleMapsApiKey={API_KEY}>
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
