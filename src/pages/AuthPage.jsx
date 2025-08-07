import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = ({ onClose }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: 'MANUFACTURER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const businessTypes = ['MANUFACTURER', 'DISTRIBUTOR', 'RETAILER', 'CONSULTANT'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSignUp = (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Set authentication in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);

      setSuccess('Account created successfully!');
      setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });
      
      setTimeout(() => {
        setSuccess('');
        onClose(); // Navigate back to landing page
      }, 1500);

      setLoading(false);
    }, 1000);
  };

  const handleSignIn = (e) => {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Set authentication in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);

      setSuccess('Signed in successfully!');
      setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });

      setTimeout(() => {
        setSuccess('');
        onClose(); // Navigate back to landing page
      }, 1500);

      setLoading(false);
    }, 1000);
  };

  const toggleToSignUp = () => {
    setIsRightPanelActive(true);
    setError('');
    setSuccess('');
    setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });
  };

  const toggleToSignIn = () => {
    setIsRightPanelActive(false);
    setError('');
    setSuccess('');
    setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });
  };

  return (
    <div className="auth-page-fullscreen">
      {/* Header with back button */}
      <div className="auth-header">
        <button className="back-btn" onClick={onClose}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <div className="auth-brand">
          <i className="fas fa-map-marker-alt brand-icon"></i>
          <span className="brand-text">GeoSell</span>
        </div>
      </div>
      
      <div className="auth-main-content">
        <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              
              {/* Success/Error Messages */}
              {success && <div className="success-message">{success}</div>}
              {error && <div className="error-message">{error}</div>}
              
              <input 
                type="text" 
                placeholder="Name" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <span>or use your account</span>
              
              {/* Success/Error Messages */}
              {success && <div className="success-message">{success}</div>}
              {error && <div className="error-message">{error}</div>}
              
              <input 
                type="email" 
                placeholder="Email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <a href="#">Forgot your password?</a>
              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={toggleToSignIn}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={toggleToSignUp}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;