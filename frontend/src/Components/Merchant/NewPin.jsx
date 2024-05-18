import React, { useState } from 'react';

const NewPin = () => {
  const [file, setFile] = useState(null);
  const [pincodes, setPincodes] = useState([]);
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

  const handleFileRead = (fileContent) => {
    const rows = fileContent.split('\n').map(row => row.trim());
    setPincodes(rows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        handleFileRead(fileContent);
      };
      reader.readAsText(file);
    } else {
      setError('Please upload a CSV file.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload CSV File</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
        {pincodes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Pincodes you serve:</h3>
            <ul className="list-disc list-inside">
              {pincodes.map((pincode, index) => (
                <li key={index}>{pincode}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPin;
