import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faSearch, faEnvelope, 
  faPhone, faCalendar, faEdit,
  faTrash, faEye, faChartLine,
  faStar, faShoppingCart,
  faMoneyBillWave, faUser, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const CustomerManagement = () => {
  const [customers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      phone: '081234567890',
      joinDate: '2023-01-15',
      orders: 12,
      totalSpent: 4500000,
      status: 'Active',
      tier: 'Gold'
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
      tier: 'Silver'
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
      tier: 'Bronze'
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
      tier: 'Bronze'
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
      tier: 'Platinum'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    const matchesTier = filterTier === 'all' || customer.tier === filterTier;
    
    return matchesSearch && matchesStatus && matchesTier;
  });

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'Active').length,
    totalOrders: customers.reduce((sum, c) => sum + c.orders, 0),
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                      customers.reduce((sum, c) => sum + c.orders, 0) || 0
  };

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  

  return (
    <div className="customer-management">
      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Customer Management
        </h2>
        <div className="header-actions">
          <button className="btn btn-primary">
            + Add Customer
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="row">
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-icon total">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalCustomers}</h3>
                <p>Total Customers</p>
                <small className="positive">+8 this month</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
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
          <div className="col-md-4">
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
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="row">
          <div className="col-md-4">
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
          <div className="col-md-4">
            <div className="filter-group">
              <label>Status</label>
              <select 
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="filter-group">
              <label>Tier</label>
              <select 
                className="form-select"
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
              >
                <option value="all">All Tiers</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="customers-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Join Date</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Tier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="customer-details">
                        <h6>{customer.name}</h6>
                        <small>ID: CUST-{customer.id.toString().padStart(3, '0')}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="contact-item">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>{customer.email}</span>
                      </div>
                      <div className="contact-item">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <FontAwesomeIcon icon={faCalendar} />
                      <span>{customer.joinDate}</span>
                    </div>
                  </td>
                  <td>
                    <div className="order-count">
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span>{customer.orders} orders</span>
                    </div>
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
                      {customer.status}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-view" title="View Details">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="btn btn-sm btn-edit" title="Edit">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-sm btn-delete" title="Delete">
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
            .slice(0, 3)
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
        <button className="btn btn-sm btn-outline">
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
          {['Platinum', 'Gold', 'Silver', 'Bronze'].map(tier => {
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
      
      <div className="insight-card-footer">
        <div className="tier-summary">
          <div className="tier-summary-item">
            <span className="label">Highest Tier:</span>
            <span className="value">Platinum</span>
          </div>
          <div className="tier-summary-item">
            <span className="label">Most Common:</span>
            <span className="value">Gold</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      

 {/* Mobile Cards View - Replace existing mobile-cards div */}
    <div className="mobile-cards">
      {filteredCustomers.map(customer => (
        <div key={customer.id} className="card">
          <div className="card-header">
            <div className="customer-info-mobile">
              <div className="customer-avatar-mobile">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h6 className="card-title">{customer.name}</h6>
                <small className="text-muted">ID: CUST-{customer.id.toString().padStart(3, '0')}</small>
              </div>
            </div>
            <div className="card-badges">
              <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                {customer.status}
              </span>
              <span className={`tier-badge tier-${customer.tier.toLowerCase()}`}>
                <FontAwesomeIcon icon={faStar} /> {customer.tier}
              </span>
            </div>
          </div>
          
          <div className="card-details">
            <div className="detail-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{customer.email}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faPhone} />
              <span>{customer.phone}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faCalendar} />
              <span>{customer.joinDate}</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>{customer.orders} orders</span>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faMoneyBillWave} />
              <span>Rp {customer.totalSpent.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="card-footer">
            <div className="revenue-info">
              Total: Rp {customer.totalSpent.toLocaleString()}
            </div>
            <div className="card-actions">
              <button className="btn btn-view" title="View Details">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="btn btn-edit" title="Edit">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
      
      {/* Bulk Actions */}
      <div className="bulk-actions">
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
          <div className="col-md-6 text-end">
            <button className="btn btn-outline me-2">Export All</button>
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;