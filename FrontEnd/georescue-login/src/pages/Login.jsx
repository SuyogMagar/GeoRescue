import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Axios for HTTP requests
import "../styles/Login.css"; // Ensure this path is correct

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    // Toggle between sign-in and sign-up forms
    const toggleSignInSignUp = () => {
        setIsSignUp((prev) => !prev);
        setFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle sign-up form submission
    const handleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('http://localhost:8083/api/users/signup', formData)
            .then((response) => {
                console.log('User registered:', response.data);
                alert("Sign-up successful! Please log in.");
                setIsSignUp(false); // Switch to sign-in mode after successful sign-up
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('Error: ' + (error.response && error.response.data ? error.response.data.message : 'An unexpected error occurred.'));
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('http://localhost:8083/api/users/login', formData)
            .then((response) => {
                console.log('User logged in:', response.data);
                // Assuming you want to save a token or handle the response accordingly
                // localStorage.setItem('token', response.data.token); // Uncomment if using JWT
                navigate('/home'); // Redirect to Home
            })
            .catch((error) => {
                console.error('Error logging in user:', error);
                alert('Error: ' + (error.response && error.response.data ? error.response.data.message : 'An unexpected error occurred.'));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Google OAuth login
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8083/oauth2/authorization/google';
    };

    // GitHub OAuth login
    const handleGithubLogin = () => {
        window.location.href = 'http://localhost:8083/oauth2/authorization/github';
    };

    // Facebook OAuth login
    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:8083/oauth2/authorization/facebook';
    };

    return (
        <div className="login-container">
            <img
                src="/path-to-your-logo.png"  // Replace with your logo URL
                alt="GeoRescue Logo"
                className="logo"
            />
            <h2>{isSignUp ? 'Sign Up for GeoRescue' : 'Login to GeoRescue'}</h2>

            <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                {/* Username Field (Sign-Up Only) */}
                {isSignUp && (
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* Email Input Field */}
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password Input Field */}
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
            </form>

            {/* Forgot Password and Sign Up Link */}
            <div className="links-container">
                {!isSignUp && <a onClick={() => navigate('/forgot-password')} className="forgot-password">Forgot Password?</a>}
                <a className="signup-link" onClick={toggleSignInSignUp}>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </a>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login-container">
                <p>Or sign in with</p>
                <div className="social-login-buttons">
                    <button className="google-login-btn" onClick={handleGoogleLogin}>
                        <img src="https://icon2.cleanpng.com/20240111/kah/transparent-google-logo-google-logo-with-blue-green-red-1710929090503.webp" alt="Google icon" className="social-icon" />
                    </button>
                    <button className="github-login-btn" onClick={handleGithubLogin}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub icon" className="social-icon" />
                    </button>
                    <button className="facebook-login-btn" onClick={handleFacebookLogin}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook icon" className="social-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
