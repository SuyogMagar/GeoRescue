import React from 'react';
import './RealTimeAlerts.css';  // Make sure to style your page in this file

const RealTimeAlerts = () => {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="logo">GeoRescue</div>
        <input type="text" placeholder="Search alerts..." className="search-bar" />
        <nav className="nav-menu">
          <ul>
            <li>Home</li>
            <li>Alerts</li>
            <li>Safety Tips</li>
            <li>Resources</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Stay Informed, Stay Safe</h1>
          <p>Real-Time Disaster Alerts at Your Fingertips</p>
          <button className="cta-button">Sign Up for Alerts</button>
        </div>
      </section>

      {/* Alert Section */}
      <section className="alert-section">
        <h2>Latest Alerts</h2>
        <div className="alerts-container">
          <div className="alert">
            <h3>Flood Warning - High Severity</h3>
            <p>Location: City X</p>
            <p>Details: Heavy rain expected to cause flash floods.</p>
          </div>
          <div className="alert">
            <h3>Wildfire - Moderate Severity</h3>
            <p>Location: Region Y</p>
            <p>Details: Ongoing containment efforts in progress.</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Active Disasters</h2>
        <div className="map-container">
          {/* Placeholder for an actual map */}
          <img src="https://via.placeholder.com/600x400" alt="Disaster Map" className="map" />
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="safety-tips">
        <h2>Safety Tips</h2>
        <div className="tips-container">
          <div className="tip">
            <h3>Earthquake Safety</h3>
            <p>Drop, cover, and hold on to protect yourself during an earthquake.</p>
          </div>
          <div className="tip">
            <h3>Flood Safety</h3>
            <p>Avoid walking or driving through floodwaters, as they can be deeper than they appear.</p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources">
        <h2>Resources</h2>
        <ul>
          <li><a href="#">Emergency Contacts</a></li>
          <li><a href="#">Disaster Preparedness Guides</a></li>
          <li><a href="#">Local News & Updates</a></li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Contact Us: (123) 456-7890 | info@georescue.com</p>
        <p>© 2024 GeoRescue. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default RealTimeAlerts;
