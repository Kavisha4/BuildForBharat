import React, { useState } from 'react';

const NewPin = () => {
   const [file, setFile] = useState(null);
   const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid CSV file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Process the CSV file here
      console.log(file);
      alert('File uploaded successfully');
    } else {
      setError('Please upload a CSV file.');
    }
  };
    return(
        <div className="relative h-screen">
      {/* Form content */}
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-full">
        <div className='bg-gray-300 p-10 rounded-md'> 
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              CSV File
            </label>
            <input
              id="file"
              type="file"
              accept=".csv"
              className="w-full px-3 py-2 border rounded-lg"
              onChange={handleFileChange}
              required
            />
          <button type="submit" className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
            Upload
          </button>
        </div>
      </form>
    </div>
    )
}

export default NewPin;