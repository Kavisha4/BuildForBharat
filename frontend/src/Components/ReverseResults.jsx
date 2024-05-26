import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

function ReverseResults() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { merchantID } = useParams();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://35.207.207.45:8080/api/locations?merchantID=${merchantID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch locations');
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchLocations();
  }, [merchantID]);

  if (loading) {
    return <div className='z-20 relative text-center'>Loading...</div>;
  }

  if (error) {
    return <div className='z-20 relative text-center'>Error: {error}</div>;
  }

  return (
    <div className="px-4 py-8 bg-gray-200 z-20 relative">
      <h1 className="text-white bg-black px-4 py-2 text-2xl mb-4 text-center">Results Page</h1>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: locations[0]?.latitude || 0, lng: locations[0]?.longitude || 0 }}
          zoom={10}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => setSelectedMarker(location)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <p>Pincode: {selectedMarker.pincode}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default ReverseResults;
