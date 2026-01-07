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
  faFileInvoice, faDatabase, faArrowUp,
  faArrowDown, faPercent, faTag,
  faCheckSquare, faSquare, faBolt,
  faPercent as faPercentSolid, faDollarSign
} from '@fortawesome/free-solid-svg-icons';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      customerId: 1,
      date: '2023-10-28',
      items: 3,
      total: 1450000,
      status: 'Pending',
      payment: 'Paid',
      shipping: 'Standard',
      address: 'Jl. Sudirman No. 123, Jakarta',
      itemsList: [
        { name: 'Wagyu Steak A5', quantity: 1, price: 1250000, total: 1250000 },
        { name: 'Truffle Risotto', quantity: 2, price: 100000, total: 200000 }
      ],
      shippingCost: 50000,
      tax: 145000,
      discount: 0,
      netTotal: 1500000,
      profit: 1200000,
      margin: 80.0,
      notes: 'Customer requested extra sauce'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      customerId: 2,
      date: '2023-10-27',
      items: 2,
      total: 3200000,
      status: 'Processing',
      payment: 'Paid',
      shipping: 'Express',
      address: 'Jl. Thamrin No. 456, Jakarta',
      itemsList: [
        { name: 'Salmon Gravadlax', quantity: 1, price: 280000, total: 280000 },
        { name: 'Burrata Salad', quantity: 1, price: 220000, total: 220000 }
      ],
      shippingCost: 100000,
      tax: 320000,
      discount: 100000,
      netTotal: 3420000,
      profit: 2800000,
      margin: 81.9,
      notes: 'Gift wrapping requested'
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: 'Robert Brown',
      customerId: 3,
      date: '2023-10-26',
      items: 1,
      total: 850000,
      status: 'Shipped',
      payment: 'Paid',
      shipping: 'Standard',
      address: 'Jl. Gatot Subroto No. 789, Jakarta',
      itemsList: [
        { name: 'Tiramisu Classico', quantity: 1, price: 150000, total: 150000 }
      ],
      shippingCost: 50000,
      tax: 85000,
      discount: 0,
      netTotal: 905000,
      profit: 700000,
      margin: 77.4,
      notes: ''
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: 'Michael Chen',
      customerId: 5,
      date: '2023-10-25',
      items: 5,
      total: 2150000,
      status: 'Delivered',
      payment: 'Paid',
      shipping: 'Express',
      address: 'Jl. Rasuna Said No. 10, Jakarta',
      itemsList: [
        { name: 'Foie Gras Terrine', quantity: 1, price: 650000, total: 650000 },
        { name: 'Lobster Bisque', quantity: 2, price: 320000, total: 640000 },
        { name: 'Craft Cocktail', quantity: 2, price: 180000, total: 360000 }
      ],
      shippingCost: 100000,
      tax: 215000,
      discount: 50000,
      netTotal: 2305000,
      profit: 1850000,
      margin: 80.3,
      notes: 'VIP customer - special handling'
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customer: 'Sarah Williams',
      customerId: 6,
      date: '2023-10-24',
      items: 2,
      total: 900000,
      status: 'Delivered',
      payment: 'Paid',
      shipping: 'Standard',
      address: 'Jl. Kuningan No. 20, Jakarta',
      itemsList: [
        { name: 'Truffle Risotto', quantity: 1, price: 450000, total: 450000 },
        { name: 'Burrata Salad', quantity: 1, price: 220000, total: 220000 }
      ],
      shippingCost: 50000,
      tax: 90000,
      discount: 0,
      netTotal: 950000,
      profit: 750000,
      margin: 78.9,
      notes: ''
    },
    {
      id: 6,
      orderNumber: 'ORD-006',
      customer: 'Emily Davis',
      customerId: 8,
      date: '2023-10-23',
      items: 4,
      total: 1280000,
      status: 'Pending',
      payment: 'Pending',
      shipping: 'Standard',
      address: 'Jl. Senopati No. 30, Jakarta',
      itemsList: [
        { name: 'Salmon Gravadlax', quantity: 2, price: 280000, total: 560000 },
        { name: 'Tiramisu Classico', quantity: 2, price: 150000, total: 300000 }
      ],
      shippingCost: 50000,
      tax: 128000,
      discount: 0,
      netTotal: 1358000,
      profit: 1050000,
      margin: 77.3,
      notes: 'Payment due in 3 days'
    },
    {
      id: 7,
      orderNumber: 'ORD-007',
      customer: 'Alice Johnson',
      customerId: 4,
      date: '2023-10-22',
      items: 1,
      total: 220000,
      status: 'Cancelled',
      payment: 'Refunded',
      shipping: 'Standard',
      address: 'Jl. Panglima Polim No. 40, Jakarta',
      itemsList: [
        { name: 'Burrata Salad', quantity: 1, price: 220000, total: 220000 }
      ],
      shippingCost: 0,
      tax: 22000,
      discount: 0,
      netTotal: 242000,
      profit: 180000,
      margin: 74.4,
      notes: 'Customer cancelled order'
    },
    {
      id: 8,
      orderNumber: 'ORD-008',
      customer: 'David Lee',
      customerId: 7,
      date: '2023-10-21',
      items: 3,
      total: 960000,
      status: 'Processing',
      payment: 'Paid',
      shipping: 'Express',
      address: 'Jl. Kebon Sirih No. 50, Jakarta',
      itemsList: [
        { name: 'Lobster Bisque', quantity: 1, price: 320000, total: 320000 },
        { name: 'Craft Cocktail', quantity: 2, price: 180000, total: 360000 }
      ],
      shippingCost: 100000,
      tax: 96000,
      discount: 0,
      netTotal: 1166000,
      profit: 900000,
      margin: 77.2,
      notes: 'Urgent delivery requested'
    }
  ]);

  // State untuk operasi CRUD
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    customerId: '',
    itemsList: [{ name: '', quantity: 1, price: 0, total: 0 }],
    payment: 'Pending',
    shipping: 'Standard',
    address: '',
    notes: '',
    shippingCost: 50000,
    tax: 0,
    discount: 0
  });

  // Fungsi CRUD untuk Orders
  const handleAddOrder = () => {
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    
    // Calculate totals
    const subtotal = newOrder.itemsList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax
    const netTotal = subtotal + newOrder.shippingCost + tax - newOrder.discount;
    
    const orderToAdd = {
      id: newId,
      orderNumber: `ORD-${newId.toString().padStart(3, '0')}`,
      customer: newOrder.customer,
      customerId: newOrder.customerId || newId,
      date: new Date().toISOString().split('T')[0],
      items: newOrder.itemsList.reduce((sum, item) => sum + item.quantity, 0),
      total: subtotal,
      status: 'Pending',
      payment: newOrder.payment,
      shipping: newOrder.shipping,
      address: newOrder.address,
      itemsList: [...newOrder.itemsList],
      shippingCost: newOrder.shippingCost,
      tax: tax,
      discount: newOrder.discount,
      netTotal: netTotal,
      profit: Math.round(netTotal * 0.8), // 80% profit margin
      margin: 80.0,
      notes: newOrder.notes
    };
    
    setOrders([...orders, orderToAdd]);
    setNewOrder({
      customer: '',
      customerId: '',
      itemsList: [{ name: '', quantity: 1, price: 0, total: 0 }],
      payment: 'Pending',
      shipping: 'Standard',
      address: '',
      notes: '',
      shippingCost: 50000,
      tax: 0,
      discount: 0
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
      itemsList: [...newOrder.itemsList, { name: '', quantity: 1, price: 0, total: 0 }]
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
    newItems[index].total = newItems[index].quantity * newItems[index].price;
    setNewOrder({...newOrder, itemsList: newItems});
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) 
        ? prev.filter(orderId => orderId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length && filteredOrders.length > 0) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id));
    }
  };

  // Modal untuk melihat detail order
  const OrderDetailModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Order Details - {order.orderNumber}</h3>
            <button className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="order-info-grid">
              <div className="info-item">
                <label>Order Number:</label>
                <p><strong>{order.orderNumber}</strong></p>
              </div>
              <div className="info-item">
                <label>Customer:</label>
                <p>{order.customer}</p>
              </div>
              <div className="info-item">
                <label>Order Date:</label>
                <p>{order.date}</p>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                  {order.status === 'Pending' && <FontAwesomeIcon icon={faClock} />}
                  {order.status === 'Processing' && <FontAwesomeIcon icon={faBoxOpen} />}
                  {order.status === 'Shipped' && <FontAwesomeIcon icon={faTruck} />}
                  {order.status === 'Delivered' && <FontAwesomeIcon icon={faCheckCircle} />}
                  {order.status === 'Cancelled' && <FontAwesomeIcon icon={faTimes} />}
                  {order.status}
                </span>
              </div>
              <div className="info-item">
                <label>Payment:</label>
                <span className={`badge ${order.payment === 'Paid' ? 'bg-success' : order.payment === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
                  {order.payment === 'Paid' && <FontAwesomeIcon icon={faCheck} />}
                  {order.payment === 'Pending' && <FontAwesomeIcon icon={faClock} />}
                  {order.payment === 'Refunded' && <FontAwesomeIcon icon={faTimes} />}
                  {order.payment}
                </span>
              </div>
              <div className="info-item">
                <label>Shipping:</label>
                <p>
                  <FontAwesomeIcon icon={faShippingFast} /> {order.shipping}
                </p>
              </div>
              <div className="info-item full-width">
                <label>Address:</label>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {order.address}</p>
              </div>
            </div>

            <div className="order-items-section">
              <h4>Order Items</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.itemsList.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>Rp {item.price.toLocaleString()}</td>
                        <td>Rp {item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>Rp {order.total.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping Cost:</span>
                <span>Rp {order.shippingCost.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>Rp {order.tax.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Discount:</span>
                <span className="discount">- Rp {order.discount.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Net Total:</span>
                <span><strong>Rp {order.netTotal.toLocaleString()}</strong></span>
              </div>
              <div className="summary-row profit">
                <span>Profit:</span>
                <span className="profit-amount">Rp {order.profit.toLocaleString()}</span>
              </div>
              <div className="summary-row margin">
                <span>Margin:</span>
                <span className={`margin-badge ${order.margin > 80 ? 'high' : order.margin > 70 ? 'medium' : 'low'}`}>
                  {order.margin.toFixed(1)}%
                </span>
              </div>
            </div>

            {order.notes && (
              <div className="order-notes">
                <h5>Notes:</h5>
                <p>{order.notes}</p>
              </div>
            )}

            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  handleEditOrder(order);
                  onClose();
                }}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter dan sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      const matchesPayment = filterPayment === 'all' || order.payment === filterPayment;
      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'amount-high':
          return b.netTotal - a.netTotal;
        case 'amount-low':
          return a.netTotal - b.netTotal;
        case 'profit-high':
          return b.profit - a.profit;
        case 'profit-low':
          return a.profit - b.profit;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FontAwesomeIcon icon={faClock} className="text-warning" />;
      case 'Processing':
        return <FontAwesomeIcon icon={faBoxOpen} className="text-info" />;
      case 'Shipped':
        return <FontAwesomeIcon icon={faTruck} className="text-primary" />;
      case 'Delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
      case 'Cancelled':
        return <FontAwesomeIcon icon={faTimes} className="text-danger" />;
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

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    processingOrders: orders.filter(o => o.status === 'Processing').length,
    shippedOrders: orders.filter(o => o.status === 'Shipped').length,
    deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.netTotal, 0),
    totalProfit: orders.reduce((sum, o) => sum + o.profit, 0),
    averageOrderValue: orders.reduce((sum, o) => sum + o.netTotal, 0) / orders.length || 0,
    averageMargin: orders.reduce((sum, o) => sum + o.margin, 0) / orders.length || 0
  };

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const paymentStatuses = ['Paid', 'Pending', 'Refunded'];

  // Mobile Order Card Component
  const OrderMobileCard = ({ order }) => (
    <div className="order-card-mobile">
      <div className="card-header">
        <div className="order-info-mobile">
          <div className="order-number">
            <h6>{order.orderNumber}</h6>
            <small className="text-muted">{order.date}</small>
          </div>
          <div className="customer-info">
            <FontAwesomeIcon icon={faUser} />
            <span>{order.customer}</span>
          </div>
        </div>
        <div className="order-status-mobile">
          <span className={`status-badge status-${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            {order.status}
          </span>
          <span className={`badge ${order.payment === 'Paid' ? 'bg-success' : order.payment === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
            {order.payment}
          </span>
        </div>
      </div>
      
      <div className="card-details">
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faBoxOpen} />
            <span className="label">Items:</span>
            <span className="value">{order.items}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faShippingFast} />
            <span className="label">Shipping:</span>
            <span className="value">{order.shipping}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <span className="label">Total:</span>
            <span className="value total-amount">Rp {order.netTotal.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faArrowUp} />
            <span className="label">Profit:</span>
            <span className="value profit-amount">Rp {order.profit.toLocaleString()}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item full-width">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="label">Address:</span>
            <span className="value address">{order.address}</span>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="order-meta">
          <div className="margin-info">
            <span className={`margin-badge ${order.margin > 80 ? 'high' : order.margin > 70 ? 'medium' : 'low'}`}>
              {order.margin.toFixed(1)}% margin
            </span>
          </div>
        </div>
        <div className="card-actions">
          <button 
            className="btn btn-view" 
            title="View Details"
            onClick={() => handleViewOrder(order)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button 
            className="btn btn-edit" 
            title="Edit"
            onClick={() => handleEditOrder(order)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          {order.status === 'Pending' && (
            <button 
              className="btn btn-success" 
              title="Process Order"
              onClick={() => handleUpdateOrderStatus(order.id, 'Processing')}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
          {order.status === 'Processing' && (
            <button 
              className="btn btn-primary" 
              title="Ship Order"
              onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
            >
              <FontAwesomeIcon icon={faTruck} />
            </button>
          )}
          <button 
            className="btn btn-delete" 
            title="Delete"
            onClick={() => handleDeleteOrder(order.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );

  // Desktop Order Row Component
  const OrderDesktopRow = ({ order }) => (
    <tr key={order.id} className={selectedOrders.includes(order.id) ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={selectedOrders.includes(order.id)}
          onChange={() => handleSelectOrder(order.id)}
          className="row-checkbox"
        />
      </td>
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
        <span className={`badge ${order.payment === 'Paid' ? 'bg-success' : order.payment === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
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
          Rp {order.netTotal.toLocaleString()}
        </strong>
        <div className="profit-info">
          <small className="text-success">Profit: Rp {order.profit.toLocaleString()}</small>
        </div>
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
          {order.status === 'Pending' && (
            <button 
              className="btn btn-sm btn-success"
              title="Process Order"
              onClick={() => handleUpdateOrderStatus(order.id, 'Processing')}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
          {order.status === 'Processing' && (
            <button 
              className="btn btn-sm btn-primary"
              title="Ship Order"
              onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
            >
              <FontAwesomeIcon icon={faTruck} />
            </button>
          )}
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
  );

  // Export function
  const handleExportOrders = (format) => {
    const dataToExport = format === 'selected' && selectedOrders.length > 0
      ? orders.filter(o => selectedOrders.includes(o.id))
      : filteredOrders;

    const csvData = dataToExport.map(order => ({
      'Order Number': order.orderNumber,
      'Customer': order.customer,
      'Date': order.date,
      'Items': order.items,
      'Subtotal': order.total,
      'Shipping Cost': order.shippingCost,
      'Tax': order.tax,
      'Discount': order.discount,
      'Net Total': order.netTotal,
      'Profit': order.profit,
      'Margin': `${order.margin}%`,
      'Payment Status': order.payment,
      'Order Status': order.status,
      'Shipping Method': order.shipping,
      'Address': order.address,
      'Notes': order.notes
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert(`${dataToExport.length} orders exported successfully!`);
  };

  return (
    <div className="order-management">
      {/* Add Order Modal */}
      {showAddOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Order</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddOrder(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              
              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  className="form-control"
                  value={newOrder.address}
                  onChange={(e) => setNewOrder({...newOrder, address: e.target.value})}
                  placeholder="Enter shipping address"
                  rows="3"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      className="form-select"
                      value={newOrder.payment}
                      onChange={(e) => setNewOrder({...newOrder, payment: e.target.value})}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Shipping Method</label>
                    <select
                      className="form-select"
                      value={newOrder.shipping}
                      onChange={(e) => setNewOrder({...newOrder, shipping: e.target.value})}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Shipping Cost</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newOrder.shippingCost}
                      onChange={(e) => setNewOrder({...newOrder, shippingCost: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newOrder.discount}
                      onChange={(e) => setNewOrder({...newOrder, discount: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="order-items-section">
                <div className="section-header">
                  <h5>Order Items</h5>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={handleAddOrderItem}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Item
                  </button>
                </div>
                
                {newOrder.itemsList.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) => handleUpdateOrderItem(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(e) => handleUpdateOrderItem(index, 'quantity', parseInt(e.target.value) || 0)}
                          min="1"
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) => handleUpdateOrderItem(index, 'price', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-md-2">
                        <div className="item-total">
                          <span>Rp {item.total.toLocaleString()}</span>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRemoveOrderItem(index)}
                            disabled={newOrder.itemsList.length === 1}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="order-subtotal">
                  <strong>Subtotal: Rp {newOrder.itemsList.reduce((sum, item) => sum + item.total, 0).toLocaleString()}</strong>
                </div>
              </div>
              
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  className="form-control"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                  placeholder="Order notes..."
                  rows="2"
                />
              </div>
              
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddOrder(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddOrder}
                  disabled={!newOrder.customer || newOrder.itemsList.some(item => !item.name || item.price <= 0)}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Order Modal */}
      <OrderDetailModal 
        order={viewingOrder} 
        onClose={() => setViewingOrder(null)}
      />

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Order - {editingOrder.orderNumber}</h3>
              <button 
                className="close-btn"
                onClick={() => setEditingOrder(null)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Customer</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingOrder.customer}
                      onChange={(e) => setEditingOrder({...editingOrder, customer: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={editingOrder.status}
                      onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Payment Status</label>
                    <select
                      className="form-select"
                      value={editingOrder.payment}
                      onChange={(e) => setEditingOrder({...editingOrder, payment: e.target.value})}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Shipping Method</label>
                    <select
                      className="form-select"
                      value={editingOrder.shipping}
                      onChange={(e) => setEditingOrder({...editingOrder, shipping: e.target.value})}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingOrder(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateOrder}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Update Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
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
          <div className="col-md-2 col-6">
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
          <div className="col-md-2 col-6">
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
          <div className="col-md-2 col-6">
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
          <div className="col-md-3 col-6">
            <div className="stat-card">
              <div className="stat-icon revenue">
                <FontAwesomeIcon icon={faMoneyBillWave} />
              </div>
              <div className="stat-content">
                <h3>Rp {stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
                <small>Profit: Rp {stats.totalProfit.toLocaleString()}</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="stat-card">
              <div className="stat-icon margin">
                <FontAwesomeIcon icon={faPercent} />
              </div>
              <div className="stat-content">
                <h3>{stats.averageMargin.toFixed(1)}%</h3>
                <p>Average Margin</p>
                <small>Avg Order: Rp {Math.round(stats.averageOrderValue).toLocaleString()}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="bulk-actions-alert">
          <div className="alert alert-info">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <FontAwesomeIcon icon={faShoppingCart} /> 
                {selectedOrders.length} order(s) selected
              </span>
              <div className="bulk-action-buttons">
                <button className="btn btn-sm btn-outline me-2">
                  Update Status
                </button>
                <button className="btn btn-sm btn-outline me-2">
                  Update Payment
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm(`Delete ${selectedOrders.length} selected orders?`)) {
                      setOrders(orders.filter(o => !selectedOrders.includes(o.id)));
                      setSelectedOrders([]);
                    }
                  }}
                >
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
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
          <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
            <div className="filter-group">
              <label>Status</label>
              <select 
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 mb-md-0">
            <div className="filter-group">
              <label>Payment</label>
              <select 
                className="form-select"
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
              >
                <option value="all">All Payments</option>
                {paymentStatuses.map(payment => (
                  <option key={payment} value={payment}>{payment}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="filter-group">
              <label>Sort By</label>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
                <option value="profit-high">Profit: High to Low</option>
                <option value="profit-low">Profit: Low to High</option>
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
                <th>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="select-all-checkbox"
                  />
                </th>
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
              {currentOrders.map(order => (
                <OrderDesktopRow key={order.id} order={order} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="10">
                  <div className="table-summary">
                    <div className="summary-stats">
                      <span>Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders</span>
                      <span>Total Revenue: Rp {filteredOrders.reduce((sum, o) => sum + o.netTotal, 0).toLocaleString()}</span>
                      <span>Total Profit: Rp {filteredOrders.reduce((sum, o) => sum + o.profit, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Mobile Orders Cards */}
      <div className="mobile-orders-cards mobile-only">
        <div className="mobile-cards">
          {currentOrders.map(order => (
            <OrderMobileCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-section">
        <div className="row">
          <div className="col-md-6">
            <div className="pagination-info">
              <div className="form-group">
                <select 
                  className="form-select"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                </select>
              </div>
              <div className="showing-info">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pagination">
              <button 
                className="btn btn-outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`btn ${currentPage === pageNum ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="btn btn-outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
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
              <button 
                className="btn btn-outline me-2"
                onClick={() => {
                  const printContent = document.querySelector('.orders-table').innerHTML;
                  const printWindow = window.open('', '_blank');
                  printWindow.document.write('<html><head><title>Print Orders</title>');
                  printWindow.document.write('<link rel="stylesheet" href="styles.css">');
                  printWindow.document.write('</head><body>');
                  printWindow.document.write(printContent);
                  printWindow.document.write('</body></html>');
                  printWindow.document.close();
                  printWindow.print();
                }}
              >
                <FontAwesomeIcon icon={faPrint} />
                Print Report
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleExportOrders('selected')}
                disabled={selectedOrders.length === 0}
              >
                <FontAwesomeIcon icon={faDatabase} />
                Export Selected ({selectedOrders.length})
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => handleExportOrders('all')}
              >
                <FontAwesomeIcon icon={faDownload} />
                Export All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;