import React from 'react';
import '../NavBar/About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-description">
                At GeoRescue, our mission is to provide timely and effective assistance during natural disasters. We leverage technology to ensure that help reaches those in need promptly.
            </p>

            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-description">
                To be the leading organization in disaster response, ensuring safety and support for all affected individuals.
            </p>

            <h2 className="contact-title">Contact Us</h2>
            <div className="contact-info">
                <div>
                    <strong>Email:</strong> support@georescue.com
                </div>
                <div>
                    <strong>Phone:</strong> +1 (555) 123-4567
                </div>
            </div>
        </div>
    );
};

export default About;
