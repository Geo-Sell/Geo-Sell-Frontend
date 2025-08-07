import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Rocket, 
  LogIn, 
  Users, 
  TrendingUp, 
  Brain, 
  Target, 
  BarChart3,
  MapPinned,
  Beaker,
  Star,
  Check,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import AuthModal from '../components/AuthModal'; // Uncommented the import
import './LandingPage.css';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const email = localStorage.getItem('userEmail');
      setIsLoggedIn(loggedIn);
      setUserEmail(email || '');
    };

    checkAuthStatus();

    // Listen for storage changes (for when user logs in/out in modal)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check every second for auth changes (for same-tab updates)
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <MapPin className="brand-icon" size={24} />
            <span className="brand-text">GeoSell</span>
          </div>
          
          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#features" onClick={() => scrollToSection('features')}>Features</a></li>
            <li><a href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
            <li><a href="#pricing" onClick={() => scrollToSection('pricing')}>Pricing</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>

          <div className="nav-buttons">
            {isLoggedIn ? (
              <>
                <span className="user-welcome">Welcome, {userEmail}</span>
                <button className="btn btn-primary" onClick={() => window.open('../../../freeTrail.html', '_blank')}>
                  Go to Dashboard
                </button>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => openAuthModal('signin')}>
                  Sign In
                </button>
                <button className="btn btn-primary" onClick={() => openAuthModal('signup')}>
                  Get Started
                </button>
              </>
            )}
          </div>

          <button 
            className="hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Make <span className="highlight">Smarter</span> Business Decisions with 
                <span className="highlight"> AI-Powered</span> Market Intelligence
              </h1>
              <p className="hero-subtitle">
                Discover what to sell, where to sell it, and why — using real-time market data, 
                competitor analysis, and AI-driven insights tailored to your region.
              </p>
              <div className="hero-buttons">
                {isLoggedIn ? (
                  <>
                    <button className="btn btn-primary btn-large" onClick={() => window.open('../../../freeTrail.html', '_blank')}>
                      <BarChart3 size={20} />
                      Go to Dashboard
                    </button>
                    <button className="btn btn-outline btn-large" onClick={handleLogout}>
                      <LogIn size={20} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary btn-large" onClick={() => openAuthModal('signup')}>
                      <Rocket size={20} />
                      Start Free Trial
                    </button>
                    <button className="btn btn-outline btn-large" onClick={() => openAuthModal('signin')}>
                      <LogIn size={20} />
                      Sign In
                    </button>
                  </>
                )}
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Businesses</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Cities</span>
                </div>
                <div className="stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="preview-header">
                  <div className="preview-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="preview-title">GeoSell Dashboard</div>
                </div>
                <div className="preview-content">
                  <div className="chart-container">
                    <div className="chart-bars">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '65%'}}></div>
                    </div>
                    <div className="chart-pulse"></div>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-icon">📊</div>
                      <div className="metric-value">73%</div>
                      <div className="metric-label">Demand Score</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">🎯</div>
                      <div className="metric-value">12</div>
                      <div className="metric-label">Competitors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features for Smart Business Decisions</h2>
            <p>Everything you need to analyze markets and make data-driven decisions</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <MapPinned size={24} />
              </div>
              <h3>Region Intelligence</h3>
              <p>Visualize demand heatmaps, competitor analysis, and market trends across different regions with interactive maps.</p>
              <div className="feature-highlight">Real-time data updates</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Brain size={24} />
              </div>
              <h3>AI Business Plans</h3>
              <p>Generate comprehensive business plans with market analysis, risk assessment, and growth strategies using advanced AI.</p>
              <div className="feature-highlight">Powered by GPT-4</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Sales Trend Analysis</h3>
              <p>Track product performance with detailed charts, growth metrics, and predictive analytics for better forecasting.</p>
              <div className="feature-highlight">Predictive insights</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3>Competitor Insights</h3>
              <p>Analyze competitor strategies, pricing, and market positioning to stay ahead of the competition.</p>
              <div className="feature-highlight">Live monitoring</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Beaker size={24} />
              </div>
              <h3>Scenario Simulator</h3>
              <p>Test different business scenarios with what-if analysis to minimize risks and maximize opportunities.</p>
              <div className="feature-highlight">Risk assessment</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Target size={24} />
              </div>
              <h3>Marketing Intelligence</h3>
              <p>Optimize your marketing campaigns with region-specific insights and performance tracking.</p>
              <div className="feature-highlight">ROI optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How GeoSell Works</h2>
            <p>Simple steps to transform your business intelligence</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Connect Your Data</h3>
                <p>Integrate with your existing systems or upload your data to get started instantly.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Analyze Markets</h3>
                <p>Our AI analyzes market trends, competitor data, and regional demand patterns.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Get Insights</h3>
                <p>Receive actionable recommendations and AI-generated business strategies.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Make Decisions</h3>
                <p>Execute data-driven decisions with confidence using our intelligent insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Plan</h2>
            <p>Flexible pricing for businesses of all sizes</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">29</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><Check size={16} /> 5 Region Analysis</li>
                <li><Check size={16} /> Basic Market Trends</li>
                <li><Check size={16} /> 10 AI Business Plans</li>
                <li><Check size={16} /> Email Support</li>
              </ul>
              <button 
                className="btn btn-outline pricing-btn"
                onClick={() => openAuthModal('signup')}
              >
                Get Started
              </button>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Professional</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">79</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><Check size={16} /> Unlimited Regions</li>
                <li><Check size={16} /> Advanced Analytics</li>
                <li><Check size={16} /> Unlimited AI Plans</li>
                <li><Check size={16} /> Scenario Simulator</li>
                <li><Check size={16} /> Priority Support</li>
              </ul>
              <button 
                className="btn btn-primary pricing-btn"
                onClick={() => openAuthModal('signup')}
              >
                Get Started
              </button>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">199</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><Check size={16} /> Everything in Pro</li>
                <li><Check size={16} /> Custom Integrations</li>
                <li><Check size={16} /> White-label Options</li>
                <li><Check size={16} /> Dedicated Support</li>
                <li><Check size={16} /> Custom Training</li>
              </ul>
              <button 
                className="btn btn-outline pricing-btn"
                onClick={() => openAuthModal('signup')}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Join thousands of entrepreneurs making smarter decisions with GeoSell</p>
            <div className="cta-buttons">
              {isLoggedIn ? (
                <>
                  <button className="btn btn-primary btn-large" onClick={() => window.open('../../../freeTrail.html', '_blank')}>
                    <BarChart3 size={20} />
                    Go to Dashboard
                  </button>
                  <button className="btn btn-outline btn-large" onClick={handleLogout}>
                    <LogIn size={20} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary btn-large" onClick={() => openAuthModal('signup')}>
                    <Rocket size={20} />
                    Start Free Trial
                  </button>
                  <button className="btn btn-outline btn-large" onClick={() => openAuthModal('signin')}>
                    <LogIn size={20} />
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-brand">
                <MapPin className="brand-icon" size={24} />
                <span className="brand-text">GeoSell</span>
              </div>
              <p>AI-powered business intelligence for smarter market decisions.</p>
              <div className="social-links">
                <a href="#"><span>Twitter</span></a>
                <a href="#"><span>LinkedIn</span></a>
                <a href="#"><span>GitHub</span></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 GeoSell. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;