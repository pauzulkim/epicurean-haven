import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, faSearch, faFilter,
  faEye, faCheck, faTimes, faClock,
  faTruck, faBoxOpen, faMoneyBillWave,
  faUser, faCalendar, faMapMarkerAlt,
  faPrint, faDownload, faSort,
  faExclamationCircle, faCheckCircle,
  faShippingFast, faHome, faList
} from '@fortawesome/free-solid-svg-icons';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      date: '2023-10-01',
      items: 3,
      total: 1450000,
      status: 'Pending',
      payment: 'Paid',
      shipping: 'Standard',
      itemsList: [
        { name: 'Wagyu Steak A5', quantity: 1, price: 1250000 },
        { name: 'Truffle Risotto', quantity: 2, price: 200000 }
      ]
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      date: '2023-10-01',
      items: 2,
      total: 3200000,
      status: 'Processing',
      payment: 'Paid',
      shipping: 'Express',
      itemsList: [
        { name: 'Salmon Gravadlax', quantity: 1, price: 280000 },
        { name: 'Burrata Salad', quantity: 1, price: 220000 }
      ]
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: 'Robert Brown',
      date: '2023-10-02',
      items: 1,
      total: 850000,
      status: 'Shipped',
      payment: 'Paid',
      shipping: 'Standard',
      itemsList: [
        { name: 'Tiramisu Classico', quantity: 1, price: 150000 }
      ]
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: 'Alice Johnson',
      date: '2023-10-02',
      items: 4,
      total: 2100000,
      status: 'Delivered',
      payment: 'Paid',
      shipping: 'Express',
      itemsList: [
        { name: 'Truffle Risotto', quantity: 2, price: 900000 },
        { name: 'Salmon Gravadlax', quantity: 2, price: 560000 }
      ]
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customer: 'Michael Chen',
      date: '2023-10-03',
      items: 2,
      total: 1250000,
      status: 'Pending',
      payment: 'Pending',
      shipping: 'Standard',
      itemsList: [
        { name: 'Burrata Salad', quantity: 1, price: 220000 },
        { name: 'Tiramisu Classico', quantity: 1, price: 150000 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.total - a.total;
        case 'lowest':
          return a.total - b.total;
        default:
          return 0;
      }
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FontAwesomeIcon icon={faClock} className="text-warning" />;
      case 'Processing':
        return <FontAwesomeIcon icon={faBoxOpen} className="text-info" />;
      case 'Shipped':
        return <FontAwesomeIcon icon={faShippingFast} className="text-primary" />;
      case 'Delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
      default:
        return <FontAwesomeIcon icon={faClock} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    processingOrders: orders.filter(o => o.status === 'Processing').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  // Function untuk render mobile cards - INI YANG DIPERBAIKI
  const renderMobileOrderCards = () => {
    return filteredOrders.map(order => (
      <div key={order.id} className="order-card-mobile">
        <div className="order-header-mobile">
          <div className="order-info">
            <div className="order-number">{order.orderNumber}</div>
            <div className="customer-name">
              <FontAwesomeIcon icon={faUser} />
              <span>{order.customer}</span>
            </div>
          </div>
          <div className="order-status-mobile">
            <div className={`status-badge status-${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)} {order.status}
            </div>
            <div className={`payment-badge ${order.payment === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
              {order.payment}
            </div>
          </div>
        </div>
        
        <div className="order-details-mobile">
          <div className="detail-item-mobile">
            <FontAwesomeIcon icon={faCalendar} />
            <div className="detail-content">
              <div className="label">Date</div>
              <div className="value">{order.date}</div>
            </div>
          </div>
          <div className="detail-item-mobile">
            <FontAwesomeIcon icon={faBoxOpen} />
            <div className="detail-content">
              <div className="label">Items</div>
              <div className="value">{order.items} items</div>
            </div>
          </div>
          <div className="detail-item-mobile">
            <FontAwesomeIcon icon={faTruck} />
            <div className="detail-content">
              <div className="label">Shipping</div>
              <div className="value">{order.shipping}</div>
            </div>
          </div>
          <div className="detail-item-mobile">
            <FontAwesomeIcon icon={faList} />
            <div className="detail-content">
              <div className="label">Items List</div>
              <div className="value">
                {order.itemsList.map((item, idx) => (
                  <div key={idx} className="item-row">
                    {item.quantity}x {item.name} - Rp {item.price.toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-footer-mobile">
          <div className="total-amount">
            Total: Rp {order.total.toLocaleString()}
          </div>
          <div className="order-actions-mobile">
            <button className="btn btn-view" title="View Details">
              <FontAwesomeIcon icon={faEye} />
            </button>
            {order.status === 'Pending' && (
              <button 
                className="btn btn-success"
                onClick={() => updateOrderStatus(order.id, 'Processing')}
                title="Start Processing"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            )}
            {order.status === 'Processing' && (
              <button 
                className="btn btn-primary"
                onClick={() => updateOrderStatus(order.id, 'Shipped')}
                title="Mark as Shipped"
              >
                <FontAwesomeIcon icon={faTruck} />
              </button>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="order-management">
      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} />
          Order Management
        </h2>
        <div className="header-actions">
          <button className="btn btn-primary">
            + New Order
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="row">
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon total">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalOrders}</h3>
                <p>Total Orders</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon pending">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="stat-content">
                <h3>{stats.pendingOrders}</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon processing">
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>
              <div className="stat-content">
                <h3>{stats.processingOrders}</h3>
                <p>Processing</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="stat-card">
              <div className="stat-icon revenue">
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </div>
              <div className="stat-content">
                <h3>Rp {stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="filter-group">
              <label>Status</label>
              <select 
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="filter-group">
              <label>Sort By</label>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Orders Table - Hanya tampil di desktop */}
      <div className="orders-table desktop-only">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Payment</th>
                <th>Shipping</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderNumber}</strong>
                  </td>
                  <td>
                    <div className="customer-info">
                      <FontAwesomeIcon icon={faUser} />
                      <span>{order.customer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <FontAwesomeIcon icon={faCalendar} />
                      <span>{order.date}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark">
                      {order.items} items
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${order.payment === 'Paid' ? 'success' : 'warning'}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-info">
                      <FontAwesomeIcon icon={faTruck} /> {order.shipping}
                    </span>
                  </td>
                  <td>
                    <strong className="text-primary">
                      Rp {order.total.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <div className={`status-badge status-${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-view"
                        title="View Details"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      {order.status === 'Pending' && (
                        <button 
                          className="btn btn-sm btn-success"
                          onClick={() => updateOrderStatus(order.id, 'Processing')}
                          title="Start Processing"
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                      {order.status === 'Processing' && (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => updateOrderStatus(order.id, 'Shipped')}
                          title="Mark as Shipped"
                        >
                          <FontAwesomeIcon icon={faTruck} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View - Hanya tampil di mobile */}
      <div className="mobile-cards mobile-only">
        {renderMobileOrderCards()}
      </div>

      {/* Export Options */}
      <div className="export-section">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <select className="form-select">
                <option>Select date range...</option>
                <option>Last 7 days</option>
                <option>This month</option>
                <option>Last month</option>
                <option>Custom range</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="export-buttons">
              <button className="btn btn-outline">
                <FontAwesomeIcon icon={faPrint} />
                Print Report
              </button>
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faDownload} />
                Export to Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;