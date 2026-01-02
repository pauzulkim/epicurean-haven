import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, faTrash, faPlus, faMinus,
  faArrowLeft, faCreditCard, faTag
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.scss';

const CartPage = () => {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Add some delicious items to get started!</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shippingFee = cartTotal > 500000 ? 0 : 25000;
  const tax = cartTotal * 0.1; // 10% tax
  const grandTotal = cartTotal + shippingFee + tax;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>
            <FontAwesomeIcon icon={faShoppingCart} />
            Shopping Cart ({cartCount} items)
          </h1>
          <button className="btn-clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={`${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                      alt={item.name}
                    />
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    {item.tags?.includes('Vegetarian') && (
                      <span className="veg-badge">Vegetarian</span>
                    )}
                  </div>
                  <div className="item-price">
                    <div className="price">Rp {item.price.toLocaleString()}</div>
                    {item.discount > 0 && (
                      <div className="discount">
                        Save {item.discount}%
                      </div>
                    )}
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="item-total">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </div>
                  <button 
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button className="btn-continue-shopping" onClick={() => navigate('/products')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-item">
                <span>Subtotal</span>
                <span>Rp {cartTotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-item">
                <span>Shipping</span>
                <span className={shippingFee === 0 ? 'free' : ''}>
                  {shippingFee === 0 ? 'FREE' : `Rp ${shippingFee.toLocaleString()}`}
                </span>
              </div>
              
              <div className="summary-item">
                <span>Tax (10%)</span>
                <span>Rp {tax.toLocaleString()}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-total">
                <span>Total</span>
                <span className="total-amount">Rp {grandTotal.toLocaleString()}</span>
              </div>

              {/* Promo Code */}
              <div className="promo-section">
                <div className="promo-header">
                  <FontAwesomeIcon icon={faTag} />
                  <span>Have a promo code?</span>
                </div>
                <div className="promo-input">
                  <input type="text" placeholder="Enter promo code" />
                  <button className="btn-apply">Apply</button>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                className="btn-checkout"
                onClick={() => navigate('/checkout')}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Proceed to Checkout
              </button>

              {/* Shipping Info */}
              <div className="shipping-info">
                <h4>Delivery Information</h4>
                <p>
                  <strong>Customer:</strong> {user?.name || 'Guest'}
                </p>
                <p>
                  <strong>Address:</strong> {user?.address || 'Please add shipping address'}
                </p>
                <p>
                  <strong>Est. Delivery:</strong> 30-45 minutes
                </p>
              </div>

              {/* Security Info */}
              <div className="security-info">
                <p>
                  🔒 Secure checkout • 100% satisfaction guarantee • 
                  Easy returns within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;