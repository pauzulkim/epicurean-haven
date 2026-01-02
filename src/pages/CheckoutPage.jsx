import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, faWallet, faBuilding,
  faMoneyBill, faLock, faArrowLeft,
  faMapMarkerAlt, faUser, faPhone,
  faEnvelope, faCreditCard as faCreditCardIcon
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.scss';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Jakarta',
    postalCode: '',
    notes: '',
    
    // Payment Information
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Billing Information
    saveInfo: true,
    sameAsShipping: true
  });

  const [errors, setErrors] = useState({});

  const shippingFee = cartTotal > 500000 ? 0 : 25000;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + shippingFee + tax;

  const validateForm = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }
    
    if (step === 2 && formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) newErrors.cardNumber = 'Invalid card number';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to confirmation page
      navigate('/order-confirmation');
    }
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: faCreditCard, description: 'Pay with your credit card' },
    { id: 'gopay', name: 'GoPay', icon: faWallet, description: 'Pay using GoPay wallet' },
    { id: 'ovo', name: 'OVO', icon: faWallet, description: 'Pay using OVO wallet' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: faBuilding, description: 'Transfer to our bank account' },
    { id: 'cod', name: 'Cash on Delivery', icon: faMoneyBill, description: 'Pay when you receive the order' }
  ];

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Progress Steps */}
        <div className="checkout-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Shipping</div>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Payment</div>
          </div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Confirmation</div>
          </div>
        </div>

        <div className="row">
          {/* Left Column - Form */}
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="form-step">
                  <h2>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    Shipping Information
                  </h2>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="Enter your email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Postal Code *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                          placeholder="Enter postal code"
                        />
                        {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      placeholder="Enter your complete address"
                      rows="3"
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>City</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="Jakarta">Jakarta</option>
                          <option value="Bandung">Bandung</option>
                          <option value="Surabaya">Surabaya</option>
                          <option value="Medan">Medan</option>
                          <option value="Bali">Bali</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Delivery Notes (Optional)</label>
                        <input
                          type="text"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="e.g., Gate code, building, etc."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="form-check-input"
                      id="saveInfo"
                    />
                    <label className="form-check-label" htmlFor="saveInfo">
                      Save this information for next time
                    </label>
                  </div>

                  <div className="form-actions">
                    <Link to="/cart" className="btn btn-back">
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Back to Cart
                    </Link>
                    <button type="button" onClick={handleNext} className="btn btn-next">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div className="form-step">
                  <h2>
                    <FontAwesomeIcon icon={faCreditCardIcon} />
                    Payment Method
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="payment-methods">
                    {paymentMethods.map(method => (
                      <div 
                        key={method.id}
                        className={`payment-method ${formData.paymentMethod === method.id ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                      >
                        <div className="method-icon">
                          <FontAwesomeIcon icon={method.icon} />
                        </div>
                        <div className="method-info">
                          <h4>{method.name}</h4>
                          <p>{method.description}</p>
                        </div>
                        <div className="method-selector">
                          <div className="custom-radio"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Credit Card Form */}
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="credit-card-form">
                      <h4>Card Details</h4>
                      
                      <div className="form-group">
                        <label>Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length > 16) value = value.slice(0, 16);
                            value = value.replace(/(\d{4})/g, '$1 ').trim();
                            handleInputChange({ target: { name: 'cardNumber', value } });
                          }}
                          className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Cardholder Name *</label>
                            <input
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                              placeholder="Enter name on card"
                            />
                            {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                          </div>
                        </div>
                        
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Expiry Date *</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 4) value = value.slice(0, 4);
                                if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
                                handleInputChange({ target: { name: 'expiryDate', value } });
                              }}
                              className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                            {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                          </div>
                        </div>
                        
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>CVV *</label>
                            <input
                              type="password"
                              name="cvv"
                              value={formData.cvv}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 4) value = value.slice(0, 4);
                                handleInputChange({ target: { name: 'cvv', value } });
                              }}
                              className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                              placeholder="123"
                              maxLength="4"
                            />
                            {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          name="sameAsShipping"
                          checked={formData.sameAsShipping}
                          onChange={handleInputChange}
                          className="form-check-input"
                          id="sameAsShipping"
                        />
                        <label className="form-check-label" htmlFor="sameAsShipping">
                          Billing address is same as shipping address
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="security-note">
                    <FontAwesomeIcon icon={faLock} />
                    <span>Your payment information is secured with 256-bit SSL encryption</span>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handleBack} className="btn btn-back">
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Back to Shipping
                    </button>
                    <button type="button" onClick={handleNext} className="btn btn-next">
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="form-step">
                  <h2>Order Review</h2>

                  {/* Shipping Info Review */}
                  <div className="review-section">
                    <h4>Shipping Information</h4>
                    <div className="review-content">
                      <p><strong>Name:</strong> {formData.fullName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Address:</strong> {formData.address}, {formData.city} {formData.postalCode}</p>
                      {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
                    </div>
                  </div>

                  {/* Payment Info Review */}
                  <div className="review-section">
                    <h4>Payment Method</h4>
                    <div className="review-content">
                      <p><strong>Method:</strong> {
                        paymentMethods.find(m => m.id === formData.paymentMethod)?.name || 'Credit Card'
                      }</p>
                      {formData.paymentMethod === 'credit-card' && (
                        <>
                          <p><strong>Card:</strong> **** **** **** {formData.cardNumber.slice(-4)}</p>
                          <p><strong>Name on Card:</strong> {formData.cardName}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Order Items Review */}
                  <div className="review-section">
                    <h4>Order Items</h4>
                    <div className="order-items-review">
                      {cartItems.map(item => (
                        <div key={item.id} className="review-item">
                          <div className="item-info">
                            <h5>{item.name}</h5>
                            <p>Quantity: {item.quantity} × Rp {item.price.toLocaleString()}</p>
                          </div>
                          <div className="item-total">
                            Rp {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="terms-section">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handleBack} className="btn btn-back">
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Back to Payment
                    </button>
                    <button type="submit" className="btn btn-submit">
                      <FontAwesomeIcon icon={faLock} />
                      Place Order & Pay
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="order-items-preview">
                {cartItems.slice(0, 3).map(item => (
                  <div key={item.id} className="preview-item">
                    <div className="item-image">
                      <img 
                        src={`${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                        alt={item.name}
                      />
                    </div>
                    <div className="item-details">
                      <h5>{item.name}</h5>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <div className="more-items">
                    +{cartItems.length - 3} more items
                  </div>
                )}
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rp {cartTotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'free' : ''}>
                    {shippingFee === 0 ? 'FREE' : `Rp ${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>Rp {tax.toLocaleString()}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-amount">Rp {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="promo-section">
                <div className="promo-input">
                  <input type="text" placeholder="Enter promo code" />
                  <button className="btn-apply">Apply</button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="security-badge">
                <FontAwesomeIcon icon={faLock} />
                <div>
                  <h5>Secure Checkout</h5>
                  <p>Your payment information is protected</p>
                </div>
              </div>

              {/* Need Help */}
              <div className="help-section">
                <h5>Need Help?</h5>
                <p>Call us: (021) 1234-5678</p>
                <p>Email: support@epicureanhaven.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;