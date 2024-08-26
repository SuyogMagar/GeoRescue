import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Toggle between sign-in and sign-up forms
  const toggleSignInSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  // Handle login click
  const handleLogin = () => {
    navigate('/home'); // Navigate to home page on button click
  };

  return (
    <div className="login-container">
      <img
        src="https://your-logo-url.com" // Replace with your logo URL
        alt="GeoRescue Logo"
        className="logo"
      />
      <h2>{isSignUp ? 'Sign Up for GeoRescue' : 'Login to GeoRescue'}</h2>

      {/* Email/Password Input Fields */}
      <div className="form-group">
        <input
          type="email"
          placeholder="Username or E-mail"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
        />
      </div>

      {/* Login/Sign Up Button */}
      <button className="login-btn" onClick={handleLogin}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>

      {/* Forgot Password and Sign Up Links */}
      <div className="links-container">
        <a href="#" className="forgot-password">Forgot Password?</a>
        <a href="#" className="signup-link">{isSignUp ? 'Sign In' : 'Sign Up'}</a>
      </div>

      {/* Social Login Buttons */}
      <div className="social-login-container">
        <p>or you can sign in with</p>
        <div className="social-login-buttons">
          <button className="google-login-btn">
            <img src="https://icon2.cleanpng.com/20240111/kah/transparent-google-logo-google-logo-with-blue-green-red-1710929090503.webp" alt="Google icon" className="social-icon" />
          </button>
          <button className="github-login-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub icon" className="social-icon" />
          </button>
          <button className="facebook-login-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook icon" className="social-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
