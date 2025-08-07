import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }) => {
    const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        businessType: 'MANUFACTURER'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Update mode when initialMode prop changes
    React.useEffect(() => {
        setIsSignUp(initialMode === 'signup');
    }, [initialMode]);

    const businessTypes = ['MANUFACTURER', 'DISTRIBUTOR', 'RETAILER', 'CONSULTANT'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8086/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    passwordHash: formData.password,
                    businessType: formData.businessType,
                    subscriptionType: 'FREE', // Default subscription type
                })
            });

            if (response.ok) {
                const userData = await response.json();
                setSuccess('Account created successfully!');

                // Set authentication in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', formData.email);

                setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });
                setTimeout(() => {
                    setSuccess('');
                    onClose(); // Close modal after successful signup
                }, 1500);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create account');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // For now, simulate successful login (replace with actual API call)
        setTimeout(() => {
            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', formData.email);

            setSuccess('Signed in successfully!');
            setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });

            setTimeout(() => {
                setSuccess('');
                onClose(); // Close modal after successful signin
            }, 1500);

            setLoading(false);
        }, 1000);
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setSuccess('');
        setFormData({ name: '', email: '', password: '', businessType: 'MANUFACTURER' });
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`} onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>

                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}

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
                            className="business-type-select"
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
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>

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
                            <p>
                                To keep connected  <br />
                               with us please login with your info
                            </p>
                            <button className="ghost" onClick={toggleMode}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, <br />Business Owner!</h1>
                            <p>Enter your personal details
                                <br/> start journey with us</p>
                            <button className="ghost" onClick={toggleMode}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;