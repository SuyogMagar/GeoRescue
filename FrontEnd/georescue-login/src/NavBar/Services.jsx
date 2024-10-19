import React from 'react';
import '../NavBar/Services.css';

const servicesData = [
    {
        title: "Real-Time Alerts",
        description: "Get immediate alerts about disasters happening near you.",
        image: "https://via.placeholder.com/400x200", // Placeholder, replace with actual image
    },
    {
        title: "Rescue Operations",
        description: "Join our rescue operations to help those in need.",
        image: "https://via.placeholder.com/400x200", // Placeholder, replace with actual image
    },
    {
        title: "Community Support",
        description: "Connect with volunteers and support your community.",
        image: "https://via.placeholder.com/400x200", // Placeholder, replace with actual image
    },
    {
        title: "Emergency Resources",
        description: "Access vital resources and support during emergencies.",
        image: "https://via.placeholder.com/400x200", // Placeholder, replace with actual image
    },
];

const Services = () => {
    return (
        <div className="services-container">
            <h1 className="services-title">Our Services</h1>
            <div className="services-grid">
                {servicesData.map((service, index) => (
                    <div key={index} className="service-card">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="service-image"
                        />
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
