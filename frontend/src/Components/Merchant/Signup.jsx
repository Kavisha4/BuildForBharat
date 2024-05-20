// src/components/Login.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


const Signup = () => {
  const [merchantId, setMerchantId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      email: merchantId,
    };

    try {
        await createUserWithEmailAndPassword(auth, merchantId, password);
        const response = await axios.post('http://localhost:8080/v1/add_merchant', payload);
        console.log('Response:', response.data);
        navigate('/login');
      } catch (error) {
        setError('Failed to sign up. Please try again.');
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="merchantId">
              Merchant Email
            </label>
            <input
              id="merchantId"
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
