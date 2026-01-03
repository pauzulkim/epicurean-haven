import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, faShoppingBag, faCalendarAlt,
  faMapMarkerAlt, faCreditCard, faTruck, 
  faHome, faPrint, faEnvelope, faPhone
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addOrder } from '../data/orders';
import './OrderConfirmation.scss';

const OrderConfirmation = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderNumber] = useState(`ORD-${Date.now().toString().slice(-6)}`);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    // Simulate order processing
    const processOrder = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create order object
      const order = {
        id: orderNumber,
        customerId: user?.id || 0,
        customerName: user?.name || 'Guest',
        customerEmail: user?.email || '',
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: cartTotal,
        shippingFee: cartTotal > 500000 ? 0 : 25000,
        tax: cartTotal * 0.1,
        grandTotal: cartTotal + (cartTotal > 500000 ? 0 : 25000) + (cartTotal * 0.1),
        status: 'processing',
        paymentMethod: 'Credit Card',
        paymentStatus: 'completed',
        shippingAddress: user?.address || 'Jl. Contoh No. 123, Jakarta',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString() // 45 minutes from now
      };
      
      // Add to orders database (simulated)
      addOrder(order);
      
      // Clear cart
      clearCart();
      
      setOrderDetails(order);
      setLoading(false);
    };

    processOrder();
  }, []);

  if (loading) {
    return (
      <div className="order-confirmation loading">
        <div className="container">
          <div className="loading-content">
            <div className="spinner-border text-brown" role="status">
              <span className="visually-hidden">Processing your order...</span>
            </div>
            <h3>Processing your order...</h3>
            <p>Please wait while we confirm your purchase</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="container">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <h1>Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your purchase, <strong>{user?.name}</strong>! 
            Your order has been successfully placed.
          </p>
          <div className="order-number">
            Order Number: <span>{orderNumber}</span>
          </div>
        </div>

        <div className="row">
          {/* Order Summary */}
          <div className="col-lg-8">
            <div className="order-details">
              <h2>
                <FontAwesomeIcon icon={faShoppingBag} />
                Order Details
              </h2>
              
              <div className="order-items">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      Rp {item.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rp {orderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={orderDetails.shippingFee === 0 ? 'free' : ''}>
                    {orderDetails.shippingFee === 0 ? 'FREE' : `Rp ${orderDetails.shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>Rp {orderDetails.tax.toLocaleString()}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span className="total-amount">Rp {orderDetails.grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="order-timeline">
                <h3>Order Status</h3>
                <div className="timeline">
                  <div className="timeline-step active">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className="step-content">
                      <h4>Order Placed</h4>
                      <p>Order confirmed and payment received</p>
                      <small>Just now</small>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="step-content">
                      <h4>Preparing</h4>
                      <p>Chefs are preparing your order</p>
                      <small>Estimated: 15-20 minutes</small>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="step-content">
                      <h4>Out for Delivery</h4>
                      <p>Your order is on the way</p>
                      <small>Estimated: 30-45 minutes</small>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="step-icon">
                      <FontAwesomeIcon icon={faHome} />
                    </div>
                    <div className="step-content">
                      <h4>Delivered</h4>
                      <p>Order delivered successfully</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="col-lg-4">
            <div className="info-cards">
              {/* Shipping Info */}
              <div className="info-card">
                <h3>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  Shipping Information
                </h3>
                <div className="info-content">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Address:</strong> {orderDetails.shippingAddress}</p>
                  <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="info-card">
                <h3>
                  <FontAwesomeIcon icon={faCreditCard} />
                  Payment Information
                </h3>
                <div className="info-content">
                  <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> 
                    <span className="status-completed"> {orderDetails.paymentStatus}</span>
                  </p>
                  <p><strong>Total Paid:</strong> Rp {orderDetails.grandTotal.toLocaleString()}</p>
                  <p><strong>Transaction ID:</strong> TXN-{Date.now().toString().slice(-8)}</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="info-card">
                <h3>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  Delivery Information
                </h3>
                <div className="info-content">
                  <p><strong>Order Date:</strong> {new Date(orderDetails.orderDate).toLocaleString()}</p>
                  <p><strong>Estimated Delivery:</strong> {new Date(orderDetails.estimatedDelivery).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <p><strong>Delivery Time:</strong> 30-45 minutes</p>
                  <p><strong>Status:</strong> 
                    <span className="status-processing"> {orderDetails.status}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons - FIXED */}
              <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => window.print()}>
                  <FontAwesomeIcon icon={faPrint} />
                  Print Receipt
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/products')}>
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Continue Shopping
                </button>
                <button className="btn btn-outline">
                  <FontAwesomeIcon icon={faEnvelope} />
                  Email Receipt
                </button>
              </div>

              {/* Support Info */}
              <div className="support-info">
                <h4>Need Help?</h4>
                <p>
                  <FontAwesomeIcon icon={faPhone} />
                  Call us: (021) 1234-5678
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} />
                  Email: support@epicureanhaven.com
                </p>
                <p className="note">
                  *You will receive an email confirmation shortly. 
                  For order tracking, please check your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;