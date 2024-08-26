import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RealTimeAlerts from './services/RealTimeAlerts';
import DisasterPreparedness from './services/DisasterPreparedness';
import Geolocation from './services/Geolocation';

// Add more imports as needed for other service components

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for the login page */}
          <Route path="/" element={<Login />} />

          {/* Define the route for the home page */}
          <Route path="/home" element={<Home />} />

          {/* Define the routes for the services pages */}
          <Route path="/services/alerts" element={<RealTimeAlerts />} />
          <Route path="/services/rescue" element={<DisasterPreparedness />} />
          <Route path="/services/GeoLocation" element={<Geolocation />} />
          {/* Add more routes as needed for other services */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
