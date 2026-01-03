import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CustomerLoginPage.scss';

const CustomerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { customerLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = customerLogin(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };
  
  // DEMO ACCOUNT INFO (bisa dilihat user biasa)
  const demoAccounts = [
    { email: 'customer1@example.com', password: 'password123', name: 'John Doe' },
    { email: 'customer2@example.com', password: 'password456', name: 'Jane Smith' }
  ];

  return (
    <div className="customer-login-page">
      <div className="login-container">
        {/* LEFT SIDE - LOGIN FORM */}
        <div className="login-left">
          <div className="login-header">
            <div className="logo">
              <i className="fas fa-utensils"></i>
              <div>
                <h1>Epicurean Haven</h1>
                <p className="tagline">Fine Dining Experience</p>
              </div>
            </div>
            <h2>Customer Login</h2>
            <p className="subtitle">Welcome back! Please login to your account</p>
          </div>
          
          <div className="login-card">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-circle"></i> {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i> Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="btn-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </>
                )}
              </button>
              
              <div className="divider">
                <span>Or</span>
              </div>
              
              <Link to="/register" className="btn-register">
                <i className="fas fa-user-plus"></i> Create New Account
              </Link>
            </form>
          </div>
          
          {/* Demo Accounts Section */}
          <div className="demo-accounts">
            <h3>
              <i className="fas fa-users"></i> Demo Accounts
            </h3>
            <div className="demo-cards">
              {demoAccounts.map((account, index) => (
                <div key={index} className="demo-card">
                  <div className="demo-header">
                    <i className="fas fa-user-circle"></i>
                    <h4>{account.name}</h4>
                  </div>
                  <p><strong>Email:</strong> {account.email}</p>
                  <p><strong>Password:</strong> {account.password}</p>
                  <button 
                    className="btn-use-demo"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                  >
                    <i className="fas fa-magic"></i> Use This Account
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="login-footer">
            <p>
              By logging in, you agree to our 
              <Link to="/terms"> Terms of Service</Link> and 
              <Link to="/privacy"> Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - HERO/SIDEBAR */}
        <div className="login-right">
          <div className="sidebar-content">
            <h2>Experience Culinary Excellence</h2>
            <p>
              Access your personalized dashboard, track orders, 
              save favorites, and enjoy exclusive member benefits.
            </p>
            <ul className="benefits-list">
              <li><i className="fas fa-check-circle"></i> Fast & Secure Checkout</li>
              <li><i className="fas fa-check-circle"></i> Order History & Tracking</li>
              <li><i className="fas fa-check-circle"></i> Personalized Recommendations</li>
              <li><i className="fas fa-check-circle"></i> Exclusive Member Discounts</li>
              <li><i className="fas fa-check-circle"></i> Priority Customer Support</li>
              <li><i className="fas fa-check-circle"></i> Early Access to New Menus</li>
            </ul>
            
            <div className="testimonial">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="quote">"The best dining experience I've ever had! The food is exceptional and the service is impeccable."</p>
              <p className="author">- Sarah Johnson, Food Critic</p>
            </div>
            
            <div className="stats">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat-item">
                <h3>4.9</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat-item">
                <h3>45min</h3>
                <p>Avg Delivery Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;