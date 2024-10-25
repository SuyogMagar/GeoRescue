import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './About.css';

const About = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const items = document.querySelectorAll('.author-item');

        const handleMouseEnter = (item) => {
            items.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.style.filter = 'blur(3px)';
                }
            });
        };

        const handleMouseLeave = () => {
            items.forEach((otherItem) => {
                otherItem.style.filter = 'none';
            });
        };

        items.forEach(item => {
            item.addEventListener('mouseenter', () => handleMouseEnter(item));
            item.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            items.forEach(item => {
                item.removeEventListener('mouseenter', () => handleMouseEnter(item));
                item.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <div className="about-page">
            <div className="video-background">
                <video autoPlay loop muted playsInline id="background-video">
                    <source src="pexels-cottonbro-9665235 (Original).mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="navbar">
                <div className="navbar-logo">
                    <img src="logo-no-background.png" alt="Project Logo" />
                </div>
                <div className="navbar-back">
                    {/* Use navigate to go back to Home on button click */}
                    <button onClick={() => navigate('/')}>Go Back</button>
                </div>
            </div>

            <div className="authors-header">
                <h1>About the Authors</h1>
            </div>

            <div className="authors-section">
                <div className="authors-row">
                    <div className="author-item">
                        Akshat Dwivedi
                        <div className="overlay-text">
                            HELLO!! MY NAME IS AKSHAT DWIVEDI <br />
                            AN UP AND COMING FULL STACK WEB DEVELOPER.
                        </div>
                    </div>
                    <div className="author-item">
                        Swastik Jangir
                        <div className="overlay-text">
                            HELLO! MY NAME IS SWASTIK JANGIR <br />
                            AN AVID TECH SAVVY WHO HAS KNOWLEDGE OF BLOCKCHAINS.
                        </div>
                    </div>
                </div>

                <div className="authors-row">
                    <div className="author-item">
                        Magar Suyog
                        <div className="overlay-text">
                            HELLO! MY NAME IS MAGAR SUYOG <br />
                        </div>
                    </div>
                    <div className="author-item">
                        Dron Madaan
                        <div className="overlay-text">
                            HELLO! MY NAME IS DRON MADAAN <br />
                            I AM A PROBLEM SOLVER WITH A KNOWLEDGE OF MACHINE LEARNING.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
