import React, { useState, useEffect } from 'react';
import '../styles/geolocation.css'; // Add your CSS styles here
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Use a mapping library like Leaflet
import 'leaflet/dist/leaflet.css';

const Geolocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddressFromAPI(latitude, longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function that fetches address from an API. 
  // Can be replaced by a Spring Boot backend call later on.
  const fetchAddressFromAPI = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Function that could be used to save the location to a backend (Spring Boot API later on)
  const saveLocation = async () => {
    try {
      // This is where you would call your Spring Boot backend API to save the location
      console.log('Saving location to the backend...');
      // Example code:
      // const response = await fetch('/api/saveLocation', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ latitude: location.latitude, longitude: location.longitude, address }),
      // });
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  // Function that could be used to share the location (placeholder for now)
  const shareLocation = () => {
    console.log('Sharing location via social media...');
    // Implement sharing functionality here
  };

  return (
    <div className="geolocation-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Your Location</h1>
        <p>Discover nearby places, share your location, or save it for future reference.</p>
        {location.latitude && location.longitude ? (
          <MapContainer center={[location.latitude, location.longitude]} zoom={13} className="map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>You are here</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Locating...</p>
        )}
      </section>

      {/* Location Details */}
      <section className="location-details">
        {address ? (
          <>
            <h2>Location Details</h2>
            <p><strong>Address:</strong> {address.display_name}</p>
            <p><strong>City:</strong> {address.address.city}</p>
            <p><strong>State:</strong> {address.address.state}</p>
            <p><strong>Country:</strong> {address.address.country}</p>
            <p><strong>Postal Code:</strong> {address.address.postcode}</p>
            {/* Additional data points like elevation, time zone, and weather could be fetched and displayed here */}
          </>
        ) : (
          error ? <p className="error-message">{error}</p> : <p>Fetching location details...</p>
        )}
      </section>

      {/* Nearby Places */}
      <section className="nearby-places">
        <h2>Nearby Places</h2>
        {/* You can fetch and display nearby places using APIs like Google Places or Foursquare */}
        <p>Find restaurants, attractions, and more around you.</p>
        <input type="text" placeholder="Search for places..." className="search-bar" />
        {/* Add interactive map markers or links here */}
      </section>

      {/* User Interactions */}
      <section className="user-interactions">
        <button className="share-button" onClick={shareLocation}>Share Location</button>
        <button className="save-button" onClick={saveLocation}>Save Location</button>
      </section>
    </div>
  );
};

export default Geolocation;
