import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const paymentMethods = [
    'visa', 'mastercard', 'paypal', 'gopay', 'ovo', 'dana'
  ];

  const quickLinks = [
    { path: '/products', label: 'Our Menu' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/privacy', label: 'Privacy Policy' }
  ];

  const customerService = [
    { path: '/track-order', label: 'Track Order' },
    { path: '/returns', label: 'Returns & Refunds' },
    { path: '/shipping', label: 'Shipping Info' },
    { path: '/size-guide', label: 'Serving Guide' },
    { path: '/careers', label: 'Careers' },
    { path: '/wholesale', label: 'Wholesale' }
  ];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="row">
            {/* Brand Column */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand">
                <div className="brand-logo">
                  <span className="logo-icon">🍽️</span>
                  <h3>Epicurean Haven</h3>
                </div>
                <p className="brand-tagline">
                  Experience culinary excellence delivered to your doorstep. 
                  Premium ingredients, artisanal craftsmanship.
                </p>
                <div className="social-links">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Customer Service */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-links">
                <h4>Customer Service</h4>
                <ul>
                  {customerService.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-contact">
                <h4>Contact Us</h4>
                <ul className="contact-info">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      Jl. Gourmet No. 123<br />
                      Jakarta Selatan 12190
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <span>(021) 1234-5678</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>hello@epicureanhaven.com</span>
                  </li>
                </ul>
                
                <div className="business-hours">
                  <h5>Business Hours</h5>
                  <p>Monday - Sunday: 10:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge">
              <i className="fas fa-shield-alt"></i>
              <span>Secure Payment</span>
            </div>
            <div className="badge">
              <i className="fas fa-truck"></i>
              <span>Free Delivery*</span>
            </div>
            <div className="badge">
              <i className="fas fa-headset"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <div className="container">
          <h5>We Accept:</h5>
          <div className="payment-icons">
            {paymentMethods.map((method, index) => (
              <div key={index} className={`payment-icon ${method}`}>
                {method === 'visa' && 'VISA'}
                {method === 'mastercard' && 'MC'}
                {method === 'paypal' && 'PP'}
                {method === 'gopay' && 'GOPAY'}
                {method === 'ovo' && 'OVO'}
                {method === 'dana' && 'DANA'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © {currentYear} Epicurean Haven. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-extra">
                <p>
                  *Free delivery for orders above Rp 500.000 within Jakarta area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
};

export default Footer;