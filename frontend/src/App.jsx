import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Components/Form';
import Results from './Components/Results'; 
import Login from './Components/Merchant/Login';
import Signup from './Components/Merchant/Signup'
import NewPin from './Components/Merchant/NewPin';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 object-cover w-full h-full"
        >
          <source src="/public/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route exact path="/search" element={<Form />}/>
          <Route path="/results/:pincodes" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addNewPin" element={<NewPin/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
