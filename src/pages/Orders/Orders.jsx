import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Orders.scss';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Contoh data orders (nanti bisa ganti dengan API)
  const sampleOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: [
        { name: 'Spaghetti Carbonara', quantity: 2, price: 15.99 },
        { name: 'Caesar Salad', quantity: 1, price: 8.99 },
      ],
      total: 40.97,
      status: 'completed',
      deliveryAddress: '123 Main St, Jakarta'
    },
    {
      id: 'ORD-002',
      date: '2024-01-14',
      items: [
        { name: 'Beef Burger', quantity: 3, price: 12.99 },
        { name: 'French Fries', quantity: 2, price: 4.99 },
        { name: 'Coke', quantity: 3, price: 2.99 },
      ],
      total: 57.92,
      status: 'processing',
      deliveryAddress: '456 Oak Ave, Bandung'
    },
    {
      id: 'ORD-003',
      date: '2024-01-13',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
        { name: 'Garlic Bread', quantity: 1, price: 5.99 },
      ],
      total: 24.98,
      status: 'delivered',
      deliveryAddress: '789 Pine Rd, Surabaya'
    },
  ];

  useEffect(() => {
    // Simulasi loading data dari API
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeFilter);

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'processing':
        return 'status-badge-processing';
      case 'completed':
        return 'status-badge-completed';
      case 'delivered':
        return 'status-badge-delivered';
      case 'cancelled':
        return 'status-badge-cancelled';
      default:
        return 'status-badge-pending';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  if (!user) {
    return (
      <div className="orders-container">
        <div className="not-logged-in">
          <h2>Please login to view your orders</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your food orders</p>
      </div>

      <div className="orders-content">
        <div className="filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'processing' ? 'active' : ''}`}
            onClick={() => setActiveFilter('processing')}
          >
            Processing
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'delivered' ? 'active' : ''}`}
            onClick={() => setActiveFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="empty-icon">📦</div>
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/products'}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <span className="order-date">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="order-items">
                    <h4>Items:</h4>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${(order.total * 0.9).toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery:</span>
                      <span>$2.99</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>${(order.total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <button className="btn btn-outline">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="btn btn-primary">
                      Rate Order
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button className="btn btn-danger">
                      Cancel Order
                    </button>
                  )}
                  <button className="btn btn-secondary">
                    Reorder
                  </button>
                </div>

                <div className="order-footer">
                  <div className="delivery-info">
                    <strong>Delivery to:</strong> {order.deliveryAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;