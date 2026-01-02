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
    <div className="customer-login-page"> {/* GANTI DARI .login-page KE .customer-login-page */}
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <i className="fas fa-utensils"></i>
            <h1>Epicurean Haven</h1>
          </div>
          <h2>Customer Login</h2>
          <p>Welcome back! Please login to your account</p>
        </div>
        
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger">
                {error}
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
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="divider">
              <span>Or</span>
            </div>
            
            <button type="button" className="btn-register">
              <Link to="/register">
                <i className="fas fa-user-plus"></i> Create New Account
              </Link>
            </button>
          </form>
        </div>
        
        {/* Demo Accounts Section */}
        <div className="demo-accounts">
          <h3>Demo Accounts</h3>
          <div className="demo-cards">
            {demoAccounts.map((account, index) => (
              <div key={index} className="demo-card">
                <h4>{account.name}</h4>
                <p><strong>Email:</strong> {account.email}</p>
                <p><strong>Password:</strong> {account.password}</p>
                <button 
                  className="btn-use-demo"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                >
                  Use This Account
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
      
      <div className="login-sidebar">
        <div className="sidebar-content">
          <h2>Experience Culinary Excellence</h2>
          <p>
            Access your personalized dashboard, track orders, 
            save favorites, and enjoy exclusive member benefits.
          </p>
          <ul className="benefits-list">
            <li><i className="fas fa-check"></i> Fast & Secure Checkout</li>
            <li><i className="fas fa-check"></i> Order History & Tracking</li>
            <li><i className="fas fa-check"></i> Personalized Recommendations</li>
            <li><i className="fas fa-check"></i> Exclusive Member Discounts</li>
            <li><i className="fas fa-check"></i> Priority Customer Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;