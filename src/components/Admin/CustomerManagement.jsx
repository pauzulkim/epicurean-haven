import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faSearch, faEnvelope, 
  faPhone, faCalendar, faEdit,
  faTrash, faEye, faChartLine,
  faStar, faShoppingCart,
  faMoneyBillWave, faUser, faExclamationTriangle,
  faSave, faTimes, faUserPlus,
  faFilter, faSort, faDownload,
  faDatabase, faPrint, faCheck,
  faTimesCircle, faArrowUp, faArrowDown
} from '@fortawesome/free-solid-svg-icons';

const CustomerManagement = () => {
  // State untuk data pelanggan
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '081234567890',
      joinDate: '2023-01-15',
      orders: 12,
      totalSpent: 4500000,
      status: 'Active',
      tier: 'Gold',
      lastOrder: '2023-10-28',
      avgOrderValue: 375000
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      phone: '082345678901',
      joinDate: '2023-02-20',
      orders: 8,
      totalSpent: 2800000,
      status: 'Active',
      tier: 'Silver',
      lastOrder: '2023-10-25',
      avgOrderValue: 350000
    },
    { 
      id: 3, 
      name: 'Robert Brown', 
      email: 'robert@example.com', 
      phone: '083456789012',
      joinDate: '2023-03-10',
      orders: 5,
      totalSpent: 1500000,
      status: 'Active',
      tier: 'Bronze',
      lastOrder: '2023-10-20',
      avgOrderValue: 300000
    },
    { 
      id: 4, 
      name: 'Alice Johnson', 
      email: 'alice@example.com', 
      phone: '084567890123',
      joinDate: '2023-04-05',
      orders: 3,
      totalSpent: 900000,
      status: 'Inactive',
      tier: 'Bronze',
      lastOrder: '2023-08-15',
      avgOrderValue: 300000
    },
    { 
      id: 5, 
      name: 'Michael Chen', 
      email: 'michael@example.com', 
      phone: '085678901234',
      joinDate: '2023-05-12',
      orders: 15,
      totalSpent: 6200000,
      status: 'Active',
      tier: 'Platinum',
      lastOrder: '2023-10-30',
      avgOrderValue: 413333
    },
    { 
      id: 6, 
      name: 'Sarah Williams', 
      email: 'sarah@example.com', 
      phone: '086789012345',
      joinDate: '2023-06-18',
      orders: 7,
      totalSpent: 2450000,
      status: 'Active',
      tier: 'Gold',
      lastOrder: '2023-10-27',
      avgOrderValue: 350000
    },
    { 
      id: 7, 
      name: 'David Lee', 
      email: 'david@example.com', 
      phone: '087890123456',
      joinDate: '2023-07-22',
      orders: 2,
      totalSpent: 600000,
      status: 'Inactive',
      tier: 'Bronze',
      lastOrder: '2023-09-10',
      avgOrderValue: 300000
    },
    { 
      id: 8, 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      phone: '088901234567',
      joinDate: '2023-08-30',
      orders: 10,
      totalSpent: 4200000,
      status: 'Active',
      tier: 'Silver',
      lastOrder: '2023-10-29',
      avgOrderValue: 420000
    }
  ]);

  // State untuk operasi CRUD
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Bronze',
    status: 'Active'
  });

  // Fungsi CRUD
  const handleAddCustomer = () => {
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const customerToAdd = {
      ...newCustomer,
      id: newId,
      joinDate: new Date().toISOString().split('T')[0],
      orders: 0,
      totalSpent: 0,
      lastOrder: '-',
      avgOrderValue: 0
    };
    
    setCustomers([...customers, customerToAdd]);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      tier: 'Bronze',
      status: 'Active'
    });
    setShowAddForm(false);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer({...customer});
  };

  const handleUpdateCustomer = () => {
    if (!editingCustomer) return;
    
    setCustomers(customers.map(customer => 
      customer.id === editingCustomer.id ? editingCustomer : customer
    ));
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleViewCustomer = (customer) => {
    setViewingCustomer(customer);
  };

  const handleCloseView = () => {
    setViewingCustomer(null);
  };

  const handleSelectCustomer = (id) => {
    setSelectedCustomers(prev => 
      prev.includes(id) 
        ? prev.filter(customerId => customerId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  // Fungsi untuk menampilkan modal detail pelanggan
  const CustomerDetailModal = ({ customer, onClose }) => {
    if (!customer) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Customer Details</h3>
            <button className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="customer-detail-header">
              <div className="detail-avatar">
                {customer.name.charAt(0)}
              </div>
              <div className="detail-info">
                <h4>{customer.name}</h4>
                <div className="detail-badges">
                  <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                    {customer.status === 'Active' ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimesCircle} />}
                    {customer.status}
                  </span>
                  <span className={`tier-badge tier-${customer.tier.toLowerCase()}`}>
                    <FontAwesomeIcon icon={faStar} /> {customer.tier}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <label>Customer ID</label>
                <p>CUST-{customer.id.toString().padStart(3, '0')}</p>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <p>{customer.email}</p>
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <p>{customer.phone}</p>
              </div>
              <div className="detail-item">
                <label>Join Date</label>
                <p>{customer.joinDate}</p>
              </div>
              <div className="detail-item">
                <label>Last Order</label>
                <p>{customer.lastOrder}</p>
              </div>
              <div className="detail-item">
                <label>Total Orders</label>
                <p>{customer.orders} orders</p>
              </div>
              <div className="detail-item">
                <label>Total Spent</label>
                <p className="total-spent">Rp {customer.totalSpent.toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <label>Average Order Value</label>
                <p className="avg-order-value">Rp {customer.avgOrderValue.toLocaleString()}</p>
              </div>
            </div>

            <div className="customer-lifetime-value">
              <h5>Customer Lifetime Value (CLV)</h5>
              <div className="clv-stats">
                <div className="clv-item">
                  <span className="label">Total Value:</span>
                  <span className="value">Rp {customer.totalSpent.toLocaleString()}</span>
                </div>
                <div className="clv-item">
                  <span className="label">Months Active:</span>
                  <span className="value">{
                    Math.ceil((new Date() - new Date(customer.joinDate)) / (1000 * 60 * 60 * 24 * 30))
                  } months</span>
                </div>
                <div className="clv-item">
                  <span className="label">Monthly Value:</span>
                  <span className="value">Rp {Math.round(customer.totalSpent / (
                    Math.ceil((new Date() - new Date(customer.joinDate)) / (1000 * 60 * 60 * 24 * 30)) || 1
                  )).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  handleEditCustomer(customer);
                  onClose();
                }}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter customers
  const filteredCustomers = customers
    .filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm);
      
      const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
      const matchesTier = filterTier === 'all' || customer.tier === filterTier;
      
      return matchesSearch && matchesStatus && matchesTier;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.joinDate) - new Date(a.joinDate);
        case 'oldest':
          return new Date(a.joinDate) - new Date(b.joinDate);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'spent-high':
          return b.totalSpent - a.totalSpent;
        case 'spent-low':
          return a.totalSpent - b.totalSpent;
        case 'orders-high':
          return b.orders - a.orders;
        case 'orders-low':
          return a.orders - b.orders;
        default:
          return b.id - a.id;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  // Stats calculation
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'Active').length,
    totalOrders: customers.reduce((sum, c) => sum + c.orders, 0),
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                      customers.reduce((sum, c) => sum + c.orders, 0) || 0,
    topTierCustomers: customers.filter(c => c.tier === 'Platinum' || c.tier === 'Gold').length
  };

  const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze'];
  const statuses = ['Active', 'Inactive'];

  // Mobile Customer Card Component
  const CustomerMobileCard = ({ customer }) => (
    <div className="customer-card-mobile">
      <div className="card-header">
        <div className="customer-info-mobile">
          <div className="customer-avatar-mobile">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h6 className="card-title">{customer.name}</h6>
            <small className="text-muted">ID: CUST-{customer.id.toString().padStart(3, '0')}</small>
            <div className="mobile-badges">
              <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                {customer.status}
              </span>
              <span className={`tier-badge tier-${customer.tier.toLowerCase()}`}>
                <FontAwesomeIcon icon={faStar} /> {customer.tier}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-details">
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="label">Email:</span>
            <span className="value">{customer.email}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faPhone} />
            <span className="label">Phone:</span>
            <span className="value">{customer.phone}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faCalendar} />
            <span className="label">Joined:</span>
            <span className="value">{customer.joinDate}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="label">Orders:</span>
            <span className="value">{customer.orders}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <span className="label">Total Spent:</span>
            <span className="value total-spent">Rp {customer.totalSpent.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faChartLine} />
            <span className="label">Avg Order:</span>
            <span className="value">Rp {customer.avgOrderValue.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="customer-meta">
          <small>Last Order: {customer.lastOrder}</small>
        </div>
        <div className="card-actions">
          <button 
            className="btn btn-view" 
            title="View Details"
            onClick={() => handleViewCustomer(customer)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button 
            className="btn btn-edit" 
            title="Edit"
            onClick={() => handleEditCustomer(customer)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="btn btn-delete" 
            title="Delete"
            onClick={() => handleDeleteCustomer(customer.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );

  // Desktop Customer Row Component
  const CustomerDesktopRow = ({ customer }) => (
    <tr key={customer.id} className={selectedCustomers.includes(customer.id) ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={selectedCustomers.includes(customer.id)}
          onChange={() => handleSelectCustomer(customer.id)}
          className="row-checkbox"
        />
      </td>
      <td>CUST-{customer.id.toString().padStart(3, '0')}</td>
      <td>
        <div className="customer-info">
          <div className="customer-avatar">
            {customer.name.charAt(0)}
          </div>
          <div className="customer-details">
            <h6>{customer.name}</h6>
            <small>{customer.email}</small>
            <div className="customer-meta">
              <span className="phone">
                <FontAwesomeIcon icon={faPhone} /> {customer.phone}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="date-info">
          <FontAwesomeIcon icon={faCalendar} />
          <span>{customer.joinDate}</span>
        </div>
        <small>Last: {customer.lastOrder}</small>
      </td>
      <td>
        <div className="order-count">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>{customer.orders} orders</span>
        </div>
        <small>Avg: Rp {customer.avgOrderValue.toLocaleString()}</small>
      </td>
      <td>
        <div className="total-spent">
          <span className="amount">Rp {customer.totalSpent.toLocaleString()}</span>
        </div>
      </td>
      <td>
        <div className={`tier-badge tier-${customer.tier.toLowerCase()}`}>
          <FontAwesomeIcon icon={faStar} />
          <span>{customer.tier}</span>
        </div>
      </td>
      <td>
        <div className={`status-badge status-${customer.status.toLowerCase()}`}>
          {customer.status === 'Active' ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimesCircle} />}
          <span>{customer.status}</span>
        </div>
      </td>
      <td>
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-view" 
            title="View Details"
            onClick={() => handleViewCustomer(customer)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button 
            className="btn btn-sm btn-edit" 
            title="Edit"
            onClick={() => handleEditCustomer(customer)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="btn btn-sm btn-delete" 
            title="Delete"
            onClick={() => handleDeleteCustomer(customer.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );

  // Export function
  const handleExportCustomers = (format) => {
    const dataToExport = format === 'selected' && selectedCustomers.length > 0
      ? customers.filter(c => selectedCustomers.includes(c.id))
      : filteredCustomers;

    const csvData = dataToExport.map(customer => ({
      'Customer ID': `CUST-${customer.id.toString().padStart(3, '0')}`,
      'Name': customer.name,
      'Email': customer.email,
      'Phone': customer.phone,
      'Join Date': customer.joinDate,
      'Last Order': customer.lastOrder,
      'Total Orders': customer.orders,
      'Total Spent': customer.totalSpent,
      'Average Order Value': customer.avgOrderValue,
      'Tier': customer.tier,
      'Status': customer.status
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert(`${dataToExport.length} customers exported successfully!`);
  };

  return (
    <div className="customer-management">
      {/* Add Customer Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Customer</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tier</label>
                    <select
                      className="form-select"
                      value={newCustomer.tier}
                      onChange={(e) => setNewCustomer({...newCustomer, tier: e.target.value})}
                    >
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={newCustomer.status}
                      onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAddCustomer}
                  disabled={!newCustomer.name || !newCustomer.email || !newCustomer.phone}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Customer</h3>
              <button 
                className="close-btn"
                onClick={() => setEditingCustomer(null)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Tier</label>
                    <select
                      className="form-select"
                      value={editingCustomer.tier}
                      onChange={(e) => setEditingCustomer({...editingCustomer, tier: e.target.value})}
                    >
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={editingCustomer.status}
                      onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingCustomer(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateCustomer}
                  disabled={!editingCustomer.name || !editingCustomer.email || !editingCustomer.phone}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Update Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Customer Modal */}
      <CustomerDetailModal 
        customer={viewingCustomer} 
        onClose={handleCloseView}
      />

      {/* Header Section */}
      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Customer Management
        </h2>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            + Add Customer
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon total">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalCustomers}</h3>
                <p>Total Customers</p>
                <small className="positive">{stats.activeCustomers} active</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon active">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="stat-content">
                <h3>{stats.activeCustomers}</h3>
                <p>Active Customers</p>
                <small>{Math.round((stats.activeCustomers / stats.totalCustomers) * 100)}% active rate</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon revenue">
                <FontAwesomeIcon icon={faShoppingCart} />
              </div>
              <div className="stat-content">
                <h3>Rp {stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
                <small>Avg: Rp {Math.round(stats.averageOrderValue).toLocaleString()}/order</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon premium">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="stat-content">
                <h3>{stats.topTierCustomers}</h3>
                <p>Premium Customers</p>
                <small>Gold & Platinum tiers</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="bulk-actions-alert">
          <div className="alert alert-info">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <FontAwesomeIcon icon={faUsers} /> 
                {selectedCustomers.length} customer(s) selected
              </span>
              <div className="bulk-action-buttons">
                <button className="btn btn-sm btn-outline me-2">
                  Update Status
                </button>
                <button className="btn btn-sm btn-outline me-2">
                  Update Tier
                </button>
                <button className="btn btn-sm btn-outline me-2">
                  Send Email
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm(`Delete ${selectedCustomers.length} selected customers?`)) {
                      setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
                      setSelectedCustomers([]);
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
          <div className="col-md-3 col-sm-6">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
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
          <div className="col-md-3 col-sm-6">
            <div className="filter-group">
              <label>Tier</label>
              <select 
                className="form-select"
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
              >
                <option value="all">All Tiers</option>
                {tiers.map(tier => (
                  <option key={tier} value={tier}>{tier}</option>
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
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="spent-high">Total Spent: High to Low</option>
                <option value="spent-low">Total Spent: Low to High</option>
                <option value="orders-high">Orders: High to Low</option>
                <option value="orders-low">Orders: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Customers Table */}
      <div className="customers-table desktop-only">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onChange={handleSelectAll}
                    className="select-all-checkbox"
                  />
                </th>
                <th>Customer ID</th>
                <th>Customer</th>
                <th>Join Date</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Tier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map(customer => (
                <CustomerDesktopRow key={customer.id} customer={customer} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="9">
                  <div className="table-summary">
                    <div className="summary-stats">
                      <span>Showing {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers</span>
                      <span>Total Value: Rp {filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</span>
                      <span>Active: {filteredCustomers.filter(c => c.status === 'Active').length}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Mobile Customers Cards */}
      <div className="mobile-customers-cards mobile-only">
        <div className="mobile-cards">
          {currentCustomers.map(customer => (
            <CustomerMobileCard key={customer.id} customer={customer} />
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
                Showing {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers
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

      {/* Customer Insights */}
      <div className="insights-section">
        <div className="section-header">
          <h4>
            <FontAwesomeIcon icon={faChartLine} />
            Customer Insights
          </h4>
          <p className="section-subtitle">Analytics and customer distribution data</p>
        </div>
        
        <div className="insights-grid">
          {/* Top Customers Card */}
          <div className="insight-card">
            <div className="insight-card-header">
              <h5>
                <FontAwesomeIcon icon={faStar} />
                Top Customers by Revenue
              </h5>
              <div className="insight-stats">
                <span className="total-revenue">
                  Total: Rp {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="insight-card-body">
              <div className="top-customers-list">
                {customers
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={customer.id} className="top-customer-item">
                      <div className="customer-rank">
                        <div className={`rank-number rank-${index + 1}`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="customer-details">
                        <div className="customer-avatar-small">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="customer-info">
                          <div className="customer-name">{customer.name}</div>
                          <div className="customer-tier">
                            <span className={`tier-badge tier-${customer.tier.toLowerCase()}`}>
                              <FontAwesomeIcon icon={faStar} /> {customer.tier}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="customer-revenue">
                        <div className="revenue-amount">Rp {customer.totalSpent.toLocaleString()}</div>
                        <div className="order-count">{customer.orders} orders</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="insight-card-footer">
              <button className="btn btn-sm btn-outline" onClick={() => {
                const topCustomers = customers.sort((a, b) => b.totalSpent - a.totalSpent);
                alert(`Top 5 Customers:\n${topCustomers.slice(0, 5).map((c, i) => `${i+1}. ${c.name} - Rp ${c.totalSpent.toLocaleString()}`).join('\n')}`);
              }}>
                View All Top Customers
              </button>
            </div>
          </div>
          
          {/* Tier Distribution Card */}
          <div className="insight-card">
            <div className="insight-card-header">
              <h5>
                <FontAwesomeIcon icon={faUsers} />
                Customer Distribution by Tier
              </h5>
              <div className="insight-stats">
                <span className="total-customers">
                  Total: {customers.length} customers
                </span>
              </div>
            </div>
            
            <div className="insight-card-body">
              <div className="tier-distribution-chart">
                {tiers.map(tier => {
                  const count = customers.filter(c => c.tier === tier).length;
                  const percentage = (count / customers.length) * 100;
                  const tierColors = {
                    'Platinum': { bg: '#E5E4E2', color: '#333' },
                    'Gold': { bg: '#FFD700', color: '#856404' },
                    'Silver': { bg: '#C0C0C0', color: '#495057' },
                    'Bronze': { bg: '#CD7F32', color: '#fff' }
                  };
                  
                  return (
                    <div key={tier} className="tier-distribution-item">
                      <div className="tier-info">
                        <div 
                          className="tier-color" 
                          style={{ backgroundColor: tierColors[tier].bg }}
                        ></div>
                        <div className="tier-name">
                          <span className="tier-label">{tier}</span>
                          <span className="tier-count">{count} customers</span>
                        </div>
                      </div>
                      <div className="tier-progress">
                        <div 
                          className="progress-bar" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: tierColors[tier].bg 
                          }}
                        >
                          <span className="progress-percentage">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                <option>Bulk Actions</option>
                <option>Send Email</option>
                <option>Update Status</option>
                <option>Assign Tier</option>
                <option>Export Selected</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="export-buttons">
              <button 
                className="btn btn-outline me-2"
                onClick={() => handleExportCustomers('all')}
              >
                <FontAwesomeIcon icon={faDownload} />
                Export All
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleExportCustomers('selected')}
                disabled={selectedCustomers.length === 0}
              >
                <FontAwesomeIcon icon={faDatabase} />
                Export Selected ({selectedCustomers.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;