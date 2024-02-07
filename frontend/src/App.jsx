import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Components/Form';
import Results from './Components/Results'; 

function App() {
  const handleSubmit = (pincode) => {
    console.log('Pincode submitted:', pincode);
    // Redirect to results page after form submission
    window.location.href = '/results';
  };

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
          <Route exact path="/" element={<Form onSubmit={handleSubmit}/>}/>
            
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
