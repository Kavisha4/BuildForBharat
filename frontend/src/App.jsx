import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Components/Form';
import Results from './Components/Results'; 

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
          <Route exact path="/" element={<Form />}/>
            
          <Route path="/results/:pincodes" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
