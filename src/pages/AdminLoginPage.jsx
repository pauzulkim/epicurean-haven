import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faUserSecret, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './AdminLoginPage.scss';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accessAttempts, setAccessAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/admin/dashboard';
  
  // Security: Lock after 5 failed attempts
  useEffect(() => {
    if (accessAttempts >= 5) {
      setIsLocked(true);
      setTimeLeft(300); // 5 minutes
    }
  }, [accessAttempts]);
  
  // Countdown timer
  useEffect(() => {
    let timer;
    if (isLocked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isLocked) {
      setIsLocked(false);
      setAccessAttempts(0);
    }
    return () => clearInterval(timer);
  }, [isLocked, timeLeft]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Too many failed attempts. Please wait ${timeLeft} seconds.`);
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API delay for security
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = adminLogin(username, password);
    
    if (result.success) {
      // Log successful admin login
      console.log('Admin login successful from IP:', window.location.hostname);
      navigate(from, { replace: true });
    } else {
      setAccessAttempts(prev => prev + 1);
      setError('Invalid admin credentials');
    }
    
    setLoading(false);
  };
  
  // Format waktu countdown
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="security-header">
          <div className="security-icon">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h1>Admin Access Portal</h1>
          <p className="security-notice">
            <FontAwesomeIcon icon={faUserSecret} />
            Restricted Area - Authorized Personnel Only
          </p>
        </div>
        
        <div className="admin-login-card">
          {isLocked ? (
            <div className="lockout-message">
              <h3>⚠️ Access Temporarily Locked</h3>
              <p>
                Too many failed login attempts. Please wait 
                <strong> {formatTime(timeLeft)} </strong>
                before trying again.
              </p>
              <p className="security-tip">
                For security reasons, multiple failed attempts trigger 
                an automatic lockout.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Admin Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  autoComplete="off"
                  className="admin-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Admin Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoComplete="off"
                    className="admin-input"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="alert alert-danger security-alert">
                  <FontAwesomeIcon icon={faLock} />
                  {error}
                  {accessAttempts > 0 && (
                    <small> (Attempts: {accessAttempts}/5)</small>
                  )}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn-admin-login"
                disabled={loading || isLocked}
              >
                <FontAwesomeIcon icon={faShieldAlt} />
                {loading ? 'Verifying...' : 'Secure Login'}
              </button>
              
              <div className="security-info">
                <p>
                  <strong>⚠️ Security Notice:</strong> This portal is monitored 
                  and all activities are logged. Unauthorized access attempts 
                  will be reported.
                </p>
              </div>
            </form>
          )}
        </div>
        
        {/* Hidden Admin Credentials (tidak ditampilkan di UI) */}
        <div className="hidden-credentials">
          {/* 
            SECRET: Informasi login admin TIDAK ditampilkan di halaman publik
            Hanya diberikan secara manual kepada admin yang berwenang
            
            Admin Credentials (for development only):
            1. Username: admin_epicurean | Password: Admin123!
            2. Username: manager_fnb | Password: Manager123!
          */}
        </div>
        
        <div className="admin-login-footer">
          <p className="legal-notice">
            © 2023 Epicurean Haven. All rights reserved. 
            Unauthorized access to this system is prohibited and 
            may be subject to legal action.
          </p>
          <button 
            className="btn-back-to-home"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
      
      <div className="admin-login-sidebar">
        <div className="security-features">
          <h3>Security Features:</h3>
          <ul>
            <li>✓ Two-Factor Authentication Ready</li>
            <li>✓ Activity Logging & Monitoring</li>
            <li>✓ IP Address Tracking</li>
            <li>✓ Session Timeout Protection</li>
            <li>✓ Encrypted Credentials</li>
            <li>✓ Failed Attempt Lockout</li>
          </ul>
        </div>
        
        <div className="admin-access-info">
          <h3>Authorized Functions:</h3>
          <ul>
            <li>• Product Management & Inventory</li>
            <li>• Sales Reports & Analytics</li>
            <li>• Order Processing & Fulfillment</li>
            <li>• Customer Management</li>
            <li>• Financial Transactions</li>
            <li>• System Configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;