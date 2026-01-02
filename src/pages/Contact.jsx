import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, faPhone, faEnvelope, faClock,
  faPaperPlane, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p className="lead">
            Have questions, feedback, or special requests? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="row">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <h3>Visit Us</h3>
                <p>
                  Jl. Gourmet No. 123<br />
                  Kebayoran Baru<br />
                  Jakarta Selatan 12190
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <h3>Call Us</h3>
                <p>
                  Customer Service: (021) 1234-5678<br />
                  Catering Inquiries: (021) 1234-5679<br />
                  WhatsApp: +62 812-3456-7890
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3>Email Us</h3>
                <p>
                  General: hello@epicureanhaven.com<br />
                  Support: support@epicureanhaven.com<br />
                  Careers: careers@epicureanhaven.com
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <h3>Business Hours</h3>
                <p>
                  Monday - Sunday: 10:00 - 22:00<br />
                  Delivery: 10:00 - 21:30<br />
                  Closed on National Holidays
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Issue</option>
                          <option value="feedback">Feedback</option>
                          <option value="catering">Catering Inquiry</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-submit">
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </button>
                  </div>
                </form>
              )}

              {/* FAQ Section */}
              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  <div className="faq-item">
                    <h4>What areas do you deliver to?</h4>
                    <p>We currently deliver to all areas within Jakarta. Delivery fees vary based on location.</p>
                  </div>
                  <div className="faq-item">
                    <h4>How long does delivery take?</h4>
                    <p>Standard delivery takes 30-45 minutes. Express delivery (20-30 minutes) is available for an additional fee.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Can I modify or cancel my order?</h4>
                    <p>Orders can be modified or cancelled within 5 minutes of placement. Contact customer service for assistance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <h4>Epicurean Haven Headquarters</h4>
              <p>Jl. Gourmet No. 123, Jakarta Selatan</p>
              <p>Parking available | Wheelchair accessible</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;