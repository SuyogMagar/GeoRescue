import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RealTimeAlerts from './services/RealTimeAlerts';
import DisasterPreparedness from './services/DisasterPreparedness';
import Geolocation from './services/Geolocation';
import './index.css'; // Make sure to include any general CSS styles if needed

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

                    {/* Define a fallback route to handle 404 errors or unknown paths */}
                    <Route
                        path="*"
                        element={
                            <div>
                                <h2>404 - Page Not Found</h2>
                                <p>The page you are looking for does not exist.</p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;