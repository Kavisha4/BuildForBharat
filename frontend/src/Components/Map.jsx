// src/Components/Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const Map = () => {
  const markers = [
    { pincode: '110001', position: { lat: 28.635308, lng: 77.22496 } },
    { pincode: '400001', position: { lat: 18.940170, lng: 72.83263 } },
    { pincode: '560001', position: { lat: 12.971599, lng: 77.594566 } }
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyBVWkgJ-1vGWr_Qr2g0mb5syFZwFqhBR0s">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
      >
        {markers.map(marker => (
          <Marker key={marker.pincode} position={marker.position} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
