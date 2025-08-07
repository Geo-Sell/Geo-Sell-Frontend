import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage'; // Adjust path as needed

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
