import React from 'react';
import './Disaster.css';


const DisasterPreparedness = () => {
  return (
    <div className="preparedness-page-container">

      {/* Header */}
      <header className="header">
        <div className="logo">GeoRescue</div>
        <nav className="nav-menu">
          <ul>
            <li>Home</li>
            <li>Disaster Types</li>
            <li>Training Modules</li>
            <li>Simulation Drills</li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Be Prepared for Anything</h1>
          <p>Comprehensive Guides and Training for All Disaster Types</p>
          <button className="cta-button">Explore Resources</button>
        </div>
      </section>

      {/* Disaster Types Section */}
      <section className="disaster-types">
        <h2>Types of Disasters</h2>
        <div className="disaster-cards">
          <div className="card">
            <h3>Natural Disasters</h3>
            <p>Learn how to prepare for earthquakes, floods, hurricanes, and more.</p>
          </div>
          <div className="card">
            <h3>Human-Caused Disasters</h3>
            <p>Understand the impact of industrial accidents, terrorism, and civil unrest.</p>
          </div>
        </div>
      </section>

      {/* Training Modules Section */}
      <section className="training-modules">
        <h2>Training Modules</h2>
        <div className="training-cards">
          <div className="card">
            <h3>Online Courses</h3>
            <p>Access in-depth tutorials and courses on disaster preparedness.</p>
          </div>
          <div className="card">
            <h3>Downloadable Materials</h3>
            <p>Get offline resources like checklists, PDFs, and worksheets.</p>
          </div>
          <div className="card">
            <h3>Video Tutorials</h3>
            <p>Watch practical demonstrations on how to stay safe during disasters.</p>
          </div>
        </div>
      </section>

      {/* Simulation Drills Section */}
      <section className="simulation-drills">
        <h2>Simulation Drills</h2>
        <div className="simulation-cards">
          <div className="card">
            <h3>Virtual Simulations</h3>
            <p>Participate in virtual drills to practice your disaster response skills.</p>
          </div>
          <div className="card">
            <h3>In-Person Workshops</h3>
            <p>Join our upcoming workshops to engage in hands-on learning.</p>
          </div>
          <div className="card">
            <h3>Benefits of Simulations</h3>
            <p>Learn the advantages of being prepared through practice drills.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials">
        <h2>What People Are Saying</h2>
        <div className="testimonial-card">
          <blockquote>
            “GeoRescue’s disaster preparedness guides have been incredibly helpful. I now feel more confident in knowing how to protect my family.”
          </blockquote>
          <cite>- Sarah J.</cite>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources">
        <h2>Resources</h2>
        <ul>
          <li><a href="#">Emergency Contact Info</a></li>
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

export default DisasterPreparedness;
