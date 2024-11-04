import React, { useEffect, useState } from 'react';
import NewsFeed from '../components/NewsFeed';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

const services = [
  {
    title: "Real-Time Alerts & Notifications",
    description: "Stay informed with real-time alerts for ongoing or imminent disasters in your area.",
    image: "https://static.vecteezy.com/system/resources/previews/010/366/202/large_2x/bell-icon-transparent-notification-free-png.png",
    link: "/services/alerts",
  },
  {
    title: "Disaster Preparedness",
    description: "Request rescue assistance, track live rescue operations, and manage resources efficiently.",
    image: "https://cdn.appsplayground.com/headers/com.First.Aid.Steps.emergency-header.png",
    link: "/services/rescue",
  },
  {
    title: "GeoLocation API",
    description: "Join our community of volunteers and contribute to disaster relief efforts.",
    image: "https://static.vecteezy.com/system/resources/previews/000/141/428/original/free-map-illustration-vector.jpg",
    link: "/services/GeoLocation",
  },
  {
    title: "Water Quality Monitoring",
    description: "A Real time water quality monitoring system",
    image: "https://static.vecteezy.com/system/resources/previews/000/141/428/original/free-map-illustration-vector.jpg",
    link: "/services/Water",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [newsItems, setNewsItems] = useState([]);

  const fullText = "Stay safe with real-time alerts, access resources, request rescue help, and connect with your community—all in one place. GeoRescue empowers you to prepare, respond, and recover effectively from disasters.";

  // Fetch news from News API on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=natural+disaster+OR+earthquake+OR+flood+OR+cyclone&language=en&apiKey=fd0c4d3a0abc4c7eafbeca1c07c7dda2`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          const articles = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            image: article.urlToImage || "https://via.placeholder.com/400x200",
            link: article.url,
            category: article.source.name,
          }));

          setNewsItems(articles);
        } else {
          console.error("No articles found:", data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (link) => {
    navigate(link);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
      <div className="home-container">
        {/* Navigation Bar */}
        <nav className="home-navbar">
          <div className="home-logo">GeoRescue</div>
          <ul className="home-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <div className="home-username" onClick={toggleDropdown}>
            Username
            {showDropdown && (
                <div className="home-dropdown-menu">
                  <ul>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
            )}
          </div>
        </nav>

        {/* Description */}
        <div className="home-description">
          <h1>GeoRescue: Your Disaster Management Hub</h1>
          <p>{typedText}</p>
        </div>

        {/* Content Wrapper */}
        <div className="home-content-wrapper">
          {/* Latest News Section */}
          <div className="home-left-column">
            <h2 className="home-section-title">Latest News</h2>
            <div className="home-news-box">
              <NewsFeed newsItems={newsItems} />
            </div>
          </div>

          {/* Services Section */}
          <div className="home-right-column">
            <h2 className="home-section-title">Our Services</h2>
            <div className="home-services-box">
              <div className="home-services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="home-service-card"
                        onClick={() => handleCardClick(service.link)}
                    >
                      <img
                          src={service.image}
                          alt={service.title}
                          className="home-service-image"
                      />
                      <h3 className="home-service-title">{service.title}</h3>
                      <p className="home-service-description">{service.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="home-footer">
          <p>&copy; 2024 GeoRescue. All rights reserved.</p>
        </footer>
      </div>
  );
};

export default Home;
