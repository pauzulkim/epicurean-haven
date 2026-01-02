import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faBox, faUsers, faMoneyBillWave,
  faCog, faSignOutAlt, faBars, faTimes,
  faShoppingCart, faStar, faExclamationTriangle,
  faHome, faBell, faUserCog,
  faPlus, faDatabase, faFileInvoice
} from '@fortawesome/free-solid-svg-icons';
import ProductManagement from '../components/Admin/ProductManagement';
import SalesReport from '../components/Admin/SalesReport';
import CustomerManagement from '../components/Admin/CustomerManagement';
import OrderManagement from '../components/Admin/OrderManagement';
import Settings from '../components/Admin/Settings';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });

  // Responsive sidebar handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mark as admin page
  useEffect(() => {
    document.body.classList.add('admin-page', 'admin-dashboard-page');
    
    return () => {
      document.body.classList.remove('admin-page', 'admin-dashboard-page');
    };
  }, []);

  // Auto close mobile menu on route change
  useEffect(() => {
    if (window.innerWidth < 992) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  // Redirect jika bukan admin
  if (!isAdmin || !user) {
    return <Navigate to="/" replace />;
  };
  
  const handleLogout = () => {
    logout();
  };
  
  // Load stats
  useEffect(() => {
    // Simulasi data statistik
    setStats({
      totalSales: 28750000,
      totalOrders: 156,
      totalCustomers: 89,
      totalProducts: 45,
      pendingOrders: 12,
      lowStockProducts: 8
    });
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const StatCard = ({ icon, title, value, change, color }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: color + '20' }}>
        <FontAwesomeIcon icon={icon} style={{ color }} />
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {change && <small className="stat-change">{change}</small>}
      </div>
    </div>
  );

  // Check active route
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="admin-dashboard">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="menu-toggle"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="mobile-title">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="mobile-actions">
          <button className="btn-notification">
            <FontAwesomeIcon icon={faBell} />
            {stats.lowStockProducts > 0 && (
              <span className="notification-dot"></span>
            )}
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'show' : ''}`} onClick={closeMobileMenu}></div>
      
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-profile">
            <div className="avatar">
              {user.name.charAt(0)}
            </div>
            <div className="admin-info">
              <h4>{user.name}</h4>
              <span className="role-badge">{user.role}</span>
            </div>
          </div>
          <button 
            className="toggle-sidebar desktop-only"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
          <button 
            className="toggle-sidebar mobile-only"
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin/dashboard" 
            className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/dashboard/products" 
            className={`nav-item ${isActive('/products') ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faBox} />
            <span>Products</span>
          </Link>
          <Link 
            to="/admin/dashboard/orders" 
            className={`nav-item ${isActive('/orders') ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Orders</span>
            {stats.pendingOrders > 0 && (
              <span className="notification-badge">{stats.pendingOrders}</span>
            )}
          </Link>
          <Link 
            to="/admin/dashboard/customers" 
            className={`nav-item ${isActive('/customers') ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Customers</span>
          </Link>
          <Link 
            to="/admin/dashboard/reports" 
            className={`nav-item ${isActive('/reports') ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faChartLine} />
            <span>Reports</span>
          </Link>
          <Link 
            to="/admin/dashboard/settings" 
            className={`nav-item ${isActive('/settings') ? 'active' : ''}`} 
            onClick={closeMobileMenu}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header desktop-only">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <button className="btn-notification">
              <FontAwesomeIcon icon={faBell} />
              {stats.lowStockProducts > 0 && (
                <span className="notification-dot"></span>
              )}
            </button>
          </div>
        </header>
        
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={
              <>
                {/* Stats Overview */}
                <div className="stats-overview">
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <StatCard
                        icon={faMoneyBillWave}
                        title="Total Sales"
                        value={`Rp ${stats.totalSales.toLocaleString()}`}
                        change="+12.5% from last month"
                        color="#2E7D32"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <StatCard
                        icon={faShoppingCart}
                        title="Total Orders"
                        value={stats.totalOrders}
                        change="+8.2% from last month"
                        color="#1565C0"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <StatCard
                        icon={faUsers}
                        title="Total Customers"
                        value={stats.totalCustomers}
                        change="+15.3% from last month"
                        color="#6A1B9A"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <StatCard
                        icon={faBox}
                        title="Total Products"
                        value={stats.totalProducts}
                        change="+5 new products"
                        color="#EF6C00"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <StatCard
                        icon={faExclamationTriangle}
                        title="Pending Orders"
                        value={stats.pendingOrders}
                        change="Require attention"
                        color="#C62828"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <StatCard
                        icon={faStar}
                        title="Low Stock"
                        value={stats.lowStockProducts}
                        change="Need restocking"
                        color="#FF8F00"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="quick-actions">
                  <h2>Quick Actions</h2>
                  <div className="action-buttons">
                    <Link to="/admin/dashboard/products" className="action-btn" onClick={closeMobileMenu}>
                      <FontAwesomeIcon icon={faBox} />
                      <span>Manage Products</span>
                    </Link>
                    <Link to="/admin/dashboard/orders" className="action-btn" onClick={closeMobileMenu}>
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span>Process Orders</span>
                    </Link>
                    <Link to="/admin/dashboard/reports" className="action-btn" onClick={closeMobileMenu}>
                      <FontAwesomeIcon icon={faChartLine} />
                      <span>Generate Report</span>
                    </Link>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="recent-activity">
                  <h2>Recent Activity</h2>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon success">
                        <FontAwesomeIcon icon={faShoppingCart} />
                      </div>
                      <div className="activity-content">
                        <p>New order #ORD-157 received</p>
                        <small>2 minutes ago</small>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon warning">
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                      </div>
                      <div className="activity-content">
                        <p>Low stock alert for "Truffle Risotto"</p>
                        <small>1 hour ago</small>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon info">
                        <FontAwesomeIcon icon={faUsers} />
                      </div>
                      <div className="activity-content">
                        <p>New customer registration</p>
                        <small>3 hours ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            } />
            <Route path="products" element={<ProductManagement />} />
            <Route path="reports" element={<SalesReport />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;