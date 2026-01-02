import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faLeaf, faAward, faUsers,
  faStar, faTruck, faShieldAlt, faClock
} from '@fortawesome/free-solid-svg-icons';
import './About.scss';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1>Our Story</h1>
              <p className="lead">
                Epicurean Haven was born from a passion for exceptional food and 
                a desire to bring restaurant-quality dining to your home.
              </p>
              <p>
                Founded in 2020 by master chef Giovanni Rossi, we've grown from 
                a small kitchen in Jakarta to serving thousands of satisfied 
                customers across the city.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Chef preparing food"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="card mission-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To redefine premium food delivery by combining artisanal 
                  craftsmanship with modern convenience, delivering unforgettable 
                  culinary experiences to every home.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card vision-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To become Indonesia's most trusted gourmet food platform, 
                  setting new standards in quality, service, and customer 
                  satisfaction in the food delivery industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faLeaf} />
                </div>
                <h4>Quality First</h4>
                <p>We use only the finest ingredients, sourced from trusted suppliers.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faAward} />
                </div>
                <h4>Excellence</h4>
                <p>Every dish is crafted with precision and attention to detail.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h4>Customer Focus</h4>
                <p>Your satisfaction is our priority. We listen and improve continuously.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faShieldAlt} />
                </div>
                <h4>Integrity</h4>
                <p>We maintain transparency and honesty in all our operations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Master Chefs</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Chef Giovanni"
                  />
                </div>
                <div className="team-info">
                  <h4>Chef Giovanni Rossi</h4>
                  <p className="position">Founder & Executive Chef</p>
                  <p className="bio">
                    Trained in Michelin-starred restaurants in Italy and France. 
                    20+ years of culinary experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1595475038784-bbe439ff41e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Chef Maria"
                  />
                </div>
                <div className="team-info">
                  <h4>Chef Maria Chen</h4>
                  <p className="position">Head Pastry Chef</p>
                  <p className="bio">
                    Award-winning pastry chef specializing in French and Asian 
                    fusion desserts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Chef Ahmad"
                  />
                </div>
                <div className="team-info">
                  <h4>Chef Ahmad Wijaya</h4>
                  <p className="position">Sous Chef</p>
                  <p className="bio">
                    Expert in Indonesian and Southeast Asian cuisine. 
                    15 years of experience in luxury hotels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="stat-item">
                <h3>5000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-item">
                <h3>150+</h3>
                <p>Menu Items</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-item">
                <h3>98%</h3>
                <p>Positive Reviews</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-item">
                <h3>45min</h3>
                <p>Average Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Experience Culinary Excellence?</h2>
          <p>Join our community of food lovers and discover a new world of flavors.</p>
          <div className="cta-buttons">
            <a href="/products" className="btn btn-primary btn-lg">Explore Menu</a>
            <a href="/contact" className="btn btn-secondary btn-lg">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;