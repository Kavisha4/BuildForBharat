// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [merchantId, setMerchantId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, merchantId, password);
      localStorage.setItem('merchantEmail', merchantId);
      navigate('/addNewPin'); 
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-700">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
