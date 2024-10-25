import React, { useState, useEffect } from 'react';
import './Water.css';

const Water = () => {
    const [pHData, setPhData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPhValue, setCurrentPhValue] = useState(null);

    const fetchPhData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.thingspeak.com/channels/2496664/fields/1.json?api_key=KYDWF25RF9V9MEKP&results=10`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch pH data');
            }
            const data = await response.json();
            const filteredData = data.feeds.filter(entry => entry.field1 && entry.field1 !== '0.00');
            setPhData(filteredData);
            const latestData = filteredData[0];
            if (latestData) {
                setCurrentPhValue(parseFloat(latestData.field1));
            }
        } catch (error) {
            console.error("Error fetching pH data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhData();
        const interval = setInterval(() => {
            fetchPhData();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

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
            <section className="water-hero">
                <h1>Water Quality Testing</h1>
                <p>Real-time pH value monitoring of water quality.</p>
            </section>

            <section className="water-description">
                <h2>Water Quality Monitoring System</h2>
                <p>We made a remote control boat water quality monitoring system, which has integrated sensors to detect water quality.</p>
            </section>

            <section className="water-data">
                {loading ? (
                    <p>Fetching pH data...</p>
                ) : error ? (
                    <p className="water-error">{error}</p>
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
                                    <td>{parseFloat(data.field1).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>No valid pH data available</p>
                )}
            </section>

            <section className="water-save">
                <button onClick={saveData} className="water-save-button">Save Data</button>
            </section>

            <section className="water-link">
                <h2>Real-Time Monitoring</h2>
                <p>Follow live water pH data on ThingSpeak:</p>
                <a
                    href="https://thingspeak.mathworks.com/channels/2496664/private_show"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="water-link-button"
                >
                    View Real-Time Data on ThingSpeak
                </a>
            </section>
        </div>
    );
};

export default Water;
