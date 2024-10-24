import React, { useState, useEffect } from 'react';
import './Water.css'; // Add your CSS styles here

const Water = () => {
    const [pHData, setPhData] = useState([]); // pH data array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPhValue, setCurrentPhValue] = useState(null); // To hold current pH value

    // Function to fetch real-time water pH data from ThingSpeak
    const fetchPhData = async () => {
        try {
            setLoading(true); // Set loading state
            const response = await fetch(
                `https://api.thingspeak.com/channels/2496664/fields/1.json?api_key=KYDWF25RF9V9MEKP&results=10`
            ); // Use your channel ID and read API key
            if (!response.ok) {
                throw new Error('Failed to fetch pH data');
            }
            const data = await response.json();
            const filteredData = data.feeds.filter(entry => entry.field1 && entry.field1 !== '0.00'); // Filter out invalid pH readings
            setPhData(filteredData);
            const latestData = filteredData[0]; // Assuming the latest entry is at the first index
            if (latestData) {
                setCurrentPhValue(parseFloat(latestData.field1));
            }
        } catch (error) {
            console.error("Error fetching pH data:", error);
            setError(error.message);
        } finally {
            setLoading(false); // Stop loading after data fetch
        }
    };

    useEffect(() => {
        // Fetch initial data when component mounts
        fetchPhData();

        // Set interval to fetch new data every 30 seconds (30000 milliseconds)
        const interval = setInterval(() => {
            fetchPhData();
        }, 30000); // Fetch data every 30 seconds

        // Cleanup interval on component unmount to prevent memory leaks
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once when the component mounts

    // Function to save data
    const saveData = async () => {
        if (currentPhValue !== null) {
            const dataToSave = {
                value: currentPhValue,
                timestamp: new Date().toISOString(),
            };

            try {
                const response = await fetch('/api/phdata/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSave),
                });

                if (!response.ok) {
                    throw new Error('Failed to save data');
                }

                const savedData = await response.json();
                console.log('Data saved successfully:', savedData);
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            console.error('No data to save');
        }
    };

    return (
        <div className="water-quality-page">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Water Quality Testing</h1>
                <p>Real-time pH value monitoring of water quality.</p>
            </section>

            {/* About this Module Section */}
            <section className="project-description">
                <h2>Water Quality Monitoring System</h2>
                <p>
                    We made a remote control boat water quality monitoring system, which has integrated sensors to detect water quality.
                </p>
            </section>

            {/* Water Quality Data Section */}
            <section className="water-quality-data">
                {loading ? (
                    <p>Fetching pH data...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : pHData.length > 0 ? (
                    <>
                        <h2>Real-Time pH Data</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Time</th>
                                <th>pH Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pHData.map((data, index) => (
                                <tr key={index}>
                                    <td>{new Date(data.created_at).toLocaleString()}</td>
                                    <td>{parseFloat(data.field1).toFixed(2)}</td> {/* Format pH value to 2 decimal places */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>No valid pH data available</p>
                )}
            </section>

            {/* Save Data Button */}
            <section className="save-data-section">
                <button onClick={saveData} className="save-data-button">Save Data</button>
            </section>

            {/* ThinkSpeak Link Section */}
            <section className="think-speak-link">
                <h2>Real-Time Monitoring</h2>
                <p>Follow live water pH data on ThingSpeak:</p>
                <a
                    href="https://thingspeak.mathworks.com/channels/2496664/private_show"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="think-speak-link"
                >
                    View Real-Time Data on ThingSpeak
                </a>
            </section>
        </div>
    );
};

export default Water;
