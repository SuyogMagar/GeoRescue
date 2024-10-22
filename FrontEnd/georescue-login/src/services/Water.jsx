import React, { useState, useEffect } from 'react';
import './Water.css'; // Add your CSS styles here

const Water = () => {
    const [waterQuality, setWaterQuality] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch real-time water quality data from ThinkSpeak
    const fetchWaterQualityData = async () => {
        try {
            setLoading(true); // Set loading state
            const response = await fetch('https://api.thingspeak.com/channels/YOUR_CHANNEL_ID/feeds.json?results=2'); // Replace with actual ThinkSpeak API
            if (!response.ok) {
                throw new Error('Failed to fetch water quality data');
            }
            const data = await response.json();
            setWaterQuality(data);
        } catch (error) {
            console.error("Error fetching water quality data:", error);
            setError(error.message);
        } finally {
            setLoading(false); // Stop loading after data fetch
        }
    };

    useEffect(() => {
        fetchWaterQualityData(); // Fetch data when the component mounts
    }, []);

    // Function to share water quality data (placeholder)
    const shareWaterQuality = () => {
        console.log('Sharing water quality data via social media...');
        // Implement sharing functionality here
    };

    // Function to save water quality data (placeholder)
    const saveWaterQuality = () => {
        console.log('Saving water quality data...');
        // Implement saving functionality here
    };

    return (
        <div className="water-quality-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Water Quality Testing</h1>
                <p>Using our RC boat, we are conducting real-time water quality testing to monitor environmental health.</p>
            </section>

            {/* Water Quality Data Section */}
            <section className="water-quality-data">
                {loading ? (
                    <p>Fetching water quality data...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : waterQuality && waterQuality.feeds.length > 0 ? (
                    <>
                        <h2>Real-Time Water Quality Data</h2>
                        <p><strong>pH Level:</strong> {waterQuality.feeds[0].field1 || "N/A"}</p>
                        <p><strong>Dissolved Oxygen:</strong> {waterQuality.feeds[0].field2 || "N/A"}</p>
                        <p><strong>Temperature:</strong> {waterQuality.feeds[0].field3 || "N/A"} °C</p>
                        <p><strong>Conductivity:</strong> {waterQuality.feeds[0].field4 || "N/A"} µS/cm</p>
                    </>
                ) : (
                    <p>No water quality data available</p>
                )}
            </section>

            {/* Project Description Section */}
            <section className="project-description">
                <h2>About Our Work</h2>
                <p>We use an RC boat equipped with sensors to measure various parameters such as pH, dissolved oxygen, temperature, and conductivity. These measurements help in monitoring water quality and ensuring environmental sustainability in aquatic ecosystems.</p>
                <p>Our project is aimed at detecting early signs of pollution, ensuring timely interventions, and contributing to the protection of water resources.</p>
            </section>

            {/* ThinkSpeak Link Section */}
            <section className="think-speak-link">
                <h2>Real-Time Monitoring</h2>
                <p>Follow our live water quality data through ThinkSpeak for real-time insights:</p>
                <a href="https://thingspeak.com/channels/YOUR_CHANNEL_ID" target="_blank" rel="noopener noreferrer" className="think-speak-link">
                    View Real-Time Data on ThinkSpeak
                </a>
            </section>

            {/* User Interactions */}
            <section className="user-interactions">
                <button className="share-button" onClick={shareWaterQuality}>Share Data</button>
                <button className="save-button" onClick={saveWaterQuality}>Save Data</button>
            </section>
        </div>
    );
};

export default Water;
