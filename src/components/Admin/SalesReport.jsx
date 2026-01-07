import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, faSearch, faFilter,
  faEye, faCheck, faTimes, faClock,
  faTruck, faBoxOpen, faMoneyBillWave,
  faUser, faCalendar, faMapMarkerAlt,
  faPrint, faDownload, faSort,
  faExclamationCircle, faCheckCircle,
  faShippingFast, faHome, faList,
  faPlus, faEdit, faTrash, faSave,
  faFileInvoice
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
      address: 'Jl. Sudirman No. 123, Jakarta',
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
      address: 'Jl. Thamrin No. 456, Jakarta',
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
      address: 'Jl. Gatot Subroto No. 789, Jakarta',
      itemsList: [
        { name: 'Tiramisu Classico', quantity: 1, price: 150000 }
      ]
    }
  ]);

  // State untuk operasi CRUD
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isMobile, setIsMobile] = useState(false);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    itemsList: [{ name: '', quantity: 1, price: 0 }],
    payment: 'Pending',
    shipping: 'Standard',
    address: ''
  });

  // Filter dan sort orders - HARUS dideklarasikan SEBELUM digunakan
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

  // Stats calculation
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    processingOrders: orders.filter(o => o.status === 'Processing').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  // Fungsi CRUD untuk Orders
  const handleAddOrder = () => {
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const orderToAdd = {
      id: newId,
      orderNumber: `ORD-${newId.toString().padStart(3, '0')}`,
      customer: newOrder.customer,
      date: new Date().toISOString().split('T')[0],
      items: newOrder.itemsList.reduce((sum, item) => sum + item.quantity, 0),
      total: newOrder.itemsList.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'Pending',
      payment: newOrder.payment,
      shipping: newOrder.shipping,
      address: newOrder.address,
      itemsList: [...newOrder.itemsList]
    };
    
    setOrders([...orders, orderToAdd]);
    setNewOrder({
      customer: '',
      itemsList: [{ name: '', quantity: 1, price: 0 }],
      payment: 'Pending',
      shipping: 'Standard',
      address: ''
    });
    setShowAddOrder(false);
    alert('Order added successfully!');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleViewOrder = (order) => {
    setViewingOrder(order);
  };

  const handleEditOrder = (order) => {
    setEditingOrder({...order});
  };

  const handleUpdateOrder = () => {
    if (!editingOrder) return;
    
    setOrders(orders.map(order => 
      order.id === editingOrder.id ? editingOrder : order
    ));
    setEditingOrder(null);
    alert('Order updated successfully!');
  };

  const handleAddOrderItem = () => {
    setNewOrder({
      ...newOrder,
      itemsList: [...newOrder.itemsList, { name: '', quantity: 1, price: 0 }]
    });
  };

  const handleRemoveOrderItem = (index) => {
    const newItems = [...newOrder.itemsList];
    newItems.splice(index, 1);
    setNewOrder({...newOrder, itemsList: newItems});
  };

  const handleUpdateOrderItem = (index, field, value) => {
    const newItems = [...newOrder.itemsList];
    newItems[index] = {...newItems[index], [field]: value};
    setNewOrder({...newOrder, itemsList: newItems});
  };

  // Function untuk render mobile order cards
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
            <div className={`status-badge status-${order.status.toLowerCase()}`}>
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
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <div className="detail-content">
              <div className="label">Total</div>
              <div className="value">Rp {order.total.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="order-footer-mobile">
          <div className="order-actions-mobile">
            <button 
              className="btn btn-view"
              onClick={() => handleViewOrder(order)}
              title="View Details"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button 
              className="btn btn-edit"
              onClick={() => handleEditOrder(order)}
              title="Edit Order"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button 
              className="btn btn-delete"
              onClick={() => handleDeleteOrder(order.id)}
              title="Delete Order"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            {order.status === 'Pending' && (
              <button 
                className="btn btn-success"
                onClick={() => handleUpdateOrderStatus(order.id, 'Processing')}
                title="Start Processing"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            )}
            {order.status === 'Processing' && (
              <button 
                className="btn btn-primary"
                onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="order-management">
      {/* ... (modal components tetap sama) ... */}

      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} />
          Order Management
        </h2>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddOrder(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
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

      {/* Desktop Orders Table */}
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
                        onClick={() => handleViewOrder(order)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button 
                        className="btn btn-sm btn-edit"
                        title="Edit"
                        onClick={() => handleEditOrder(order)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="btn btn-sm btn-delete"
                        title="Delete"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View */}
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
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const csvData = orders.map(order => ({
                    'Order ID': order.orderNumber,
                    'Customer': order.customer,
                    'Date': order.date,
                    'Total': order.total,
                    'Status': order.status,
                    'Payment': order.payment
                  }));
                  
                  const csvContent = [
                    Object.keys(csvData[0]).join(','),
                    ...csvData.map(row => Object.values(row).join(','))
                  ].join('\n');
                  
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                }}
              >
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