import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const NewPin = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/pincodes');
        const fetchedOptions = response.data.response.map(item => ({
          value: item,
          label: item.toString(),
        }));
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  
  const handleSubmit = async (e) => { 
    e.preventDefault();

    const merchantEmail = localStorage.getItem('merchantEmail'); 
    if (!merchantEmail) {
      setError('Merchant email not found. Please log in again.');
      return;
    }

    const pincodes = selectedOptions.map(option => option.value.toString());
   
    const payload = {
      merchant_email: merchantEmail,
      pincodes: pincodes
    };
    //console.log(payload)
    try {
      const response = await axios.post('http://localhost:8080/v1/map_merchant_to_pincodes', payload);
      console.log('Response:', response.data);
      alert("submitted")
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Error submitting data. Please try again.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen relative h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Select pincodes</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <Select
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              options={options}
              className="react-select-container"
              classNamePrefix="react-select"
          />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default NewPin;
