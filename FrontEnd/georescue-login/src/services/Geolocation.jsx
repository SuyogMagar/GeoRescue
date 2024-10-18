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
                    fetchAddressFromBackend(latitude, longitude); // Fetch address using backend
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    // Function to fetch address from Spring Boot backend
    const fetchAddressFromBackend = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `http://localhost:8083/api/geolocation/address?latitude=${latitude}&longitude=${longitude}`
            );
            const data = await response.json();
            setAddress(data);
        } catch (error) {
            console.error("Error fetching address from backend:", error);
        }
    };

    // Function to save location to the Spring Boot backend
    const saveLocation = async () => {
        if (location.latitude && location.longitude && address) { // Ensure we have valid data
            try {
                const response = await fetch('http://localhost:8083/api/geolocation/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        latitude: location.latitude,
                        longitude: location.longitude,
                        address: address.display_name, // Ensure you're sending the correct address data
                    }),
                });
                const result = await response.text(); // Expecting a success message from the backend
                console.log(result); // Log the result to confirm it saved
                alert(result); // Alert the user with the result
            } catch (error) {
                console.error("Error saving location:", error);
            }
        } else {
            console.error("Invalid location or address data"); // Log if data is invalid
            alert("Please ensure location and address are valid before saving.");
        }
    };

    // Function to share location (placeholder)
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
                        <p><strong>City:</strong> {address.address.city || "N/A"}</p>
                        <p><strong>State:</strong> {address.address.state || "N/A"}</p>
                        <p><strong>Country:</strong> {address.address.country || "N/A"}</p>
                        <p><strong>Postal Code:</strong> {address.address.postcode || "N/A"}</p>
                    </>
                ) : (
                    error ? <p className="error-message">{error}</p> : <p>Fetching location details...</p>
                )}
            </section>

            {/* Nearby Places */}
            <section className="nearby-places">
                <h2>Nearby Places</h2>
                <p>Find restaurants, attractions, and more around you.</p>
                <input type="text" placeholder="Search for places..." className="search-bar" />
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
