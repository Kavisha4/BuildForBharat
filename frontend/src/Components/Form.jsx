import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';


function Form() {
 
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
 
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://35.207.207.45:5173/v1/pincodes');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedValues = selectedOptions.map(option => option.value).join(',');
    console.log(selectedValues)
    navigateTo(`/results/${selectedValues}`);
    
   
  };

  return (
    <div className="relative h-screen">
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-full">
        <div className='bg-gray-300 p-10 rounded-md'> 
          <label htmlFor="pincodes" className="block text-gray-700 text-sm font-bold mb-2">Pincodes: </label>
          <Select
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              options={options}
              className="react-select-container"
              classNamePrefix="react-select"
          />
          <button type="submit" className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
