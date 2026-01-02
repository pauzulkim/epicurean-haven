import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar, faFire, faLeaf, faTag } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img 
            src={`${product.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`} 
            alt={product.name}
            loading="lazy"
          />
        </Link>
        
        {product.discount > 0 && (
          <div className="discount-badge">
            <FontAwesomeIcon icon={faTag} />
            <span>{product.discount}% OFF</span>
          </div>
        )}
        
        {product.tags?.includes('Premium') && (
          <div className="premium-badge">
            <FontAwesomeIcon icon={faStar} />
            <span>Premium</span>
          </div>
        )}
        
        {product.tags?.includes('Vegetarian') && (
          <div className="veg-badge">
            <FontAwesomeIcon icon={faLeaf} />
            <span>Vegetarian</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <FontAwesomeIcon icon={faStar} className="star-icon" />
          <span>{product.rating}</span>
          <span className="rating-count">(120+)</span>
        </div>
        
        <div className="product-price">
          {product.discount > 0 && (
            <span className="original-price">
              Rp {product.price.toLocaleString()}
            </span>
          )}
          <span className="current-price">
            Rp {Math.round(discountedPrice).toLocaleString()}
          </span>
        </div>
        
        <div className="product-stock">
          {product.stock > 10 ? (
            <span className="in-stock">In Stock ({product.stock})</span>
          ) : product.stock > 0 ? (
            <span className="low-stock">
              <FontAwesomeIcon icon={faFire} />
              Low Stock ({product.stock})
            </span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            className="btn-add-to-cart"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Add to Cart
          </button>
          
          <Link 
            to={`/product/${product.id}`}
            className="btn-view-details"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;