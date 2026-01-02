import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFire, faStar, faShippingFast, faShieldAlt, 
  faLeaf, faMugHot, faUtensils, faCheese
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/Product/ProductCard';
import { products } from '../data/products';
import './Home.scss';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Get featured products (with discounts)
    const featured = products
      .filter(product => product.discount > 0)
      .slice(0, 4);
    
    // Get trending products (highest rating)
    const trending = [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    
    setFeaturedProducts(featured);
    setTrendingProducts(trending);
  }, []);

  const categories = [
    { icon: faUtensils, name: 'Main Course', count: 4, color: '#8B4513' },
    { icon: faLeaf, name: 'Vegetarian', count: 3, color: '#2E7D32' },
    { icon: faMugHot, name: 'Beverage', count: 3, color: '#795548' },
    { icon: faCheese, name: 'Dessert', count: 4, color: '#FF8F00' },
  ];

  const features = [
    {
      icon: faShippingFast,
      title: 'Free Delivery',
      description: 'Free delivery for orders above Rp 500.000'
    },
    {
      icon: faShieldAlt,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: faStar,
      title: 'Premium Quality',
      description: 'Curated selection of premium ingredients'
    },
    {
      icon: faFire,
      title: 'Fast Preparation',
      description: 'Ready within 30-45 minutes'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="hero-content">
                  <h1 className="hero-title">
                    Savor the <span className="highlight">Finest</span> Culinary Experience
                  </h1>
                  <p className="hero-subtitle">
                    Discover artisanal food & beverages crafted with passion and 
                    served with elegance. Experience dining redefined.
                  </p>
                  <div className="hero-buttons">
                    <Link to="/products" className="btn btn-primary btn-lg">
                      Explore Menu
                    </Link>
                    <Link to="/login" className="btn btn-secondary btn-lg">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image">
                  <div className="floating-card card-1">
                    <img 
                      src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Gourmet Dish" 
                    />
                    <div className="card-label">Chef's Special</div>
                  </div>
                  <div className="floating-card card-2">
                    <img 
                      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w-300&q=80" 
                      alt="Artisan Pizza" 
                    />
                    <div className="card-label">Freshly Made</div>
                  </div>
                  <div className="floating-card card-3">
                    <img 
                      src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                      alt="Premium Dessert" 
                    />
                    <div className="card-label">Sweet Delight</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Epicurean Haven?</h2>
            <p>Experience premium service and quality that sets us apart</p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="feature-card">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explore Categories</h2>
            <p>Discover our curated selection of premium categories</p>
          </div>
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <Link to={`/products?category=${category.name}`} className="category-card">
                  <div 
                    className="category-icon"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <FontAwesomeIcon icon={category.icon} />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.count} items</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2>Featured Deals</h2>
                <p>Special discounts on premium selections</p>
              </div>
              <Link to="/products" className="btn-view-all">
                View All Products →
              </Link>
            </div>
          </div>
          <div className="row">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-lg-3 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>
              <FontAwesomeIcon icon={faFire} className="fire-icon" />
              Trending Now
            </h2>
            <p>Most loved by our customers</p>
          </div>
          <div className="row">
            {trendingProducts.map(product => (
              <div key={product.id} className="col-lg-3 col-md-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Culinary Excellence?</h2>
            <p>Join thousands of satisfied customers who trust us for premium dining experiences</p>
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary btn-lg">
                Order Now
              </Link>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Don't just take our word for it</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FontAwesomeIcon key={star} icon={faStar} className="star" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "The Wagyu steak was absolutely phenomenal! Best I've had outside of Japan."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">JD</div>
                  <div className="author-info">
                    <h4>John Doe</h4>
                    <p>Food Connoisseur</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FontAwesomeIcon key={star} icon={faStar} className="star" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "Exceptional quality and service. The truffle risotto is to die for!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">JS</div>
                  <div className="author-info">
                    <h4>Jane Smith</h4>
                    <p>Restaurant Critic</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <FontAwesomeIcon key={star} icon={faStar} className="star" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "Perfect for special occasions. The presentation and taste are always impeccable."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">RB</div>
                  <div className="author-info">
                    <h4>Robert Brown</h4>
                    <p>Regular Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;