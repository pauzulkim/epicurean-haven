import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faDownload, faCalendar,
  faFilter, faMoneyBillWave, faShoppingCart,
  faCaretUp, faCaretDown, faBox, faUsers,
  faArrowUp, faArrowDown, faFire
} from '@fortawesome/free-solid-svg-icons';

const SalesReport = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('sales');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const salesData = [
    { date: '2023-10-01', orders: 15, revenue: 4500000, average: 300000, profit: 1800000 },
    { date: '2023-10-02', orders: 18, revenue: 5200000, average: 288888, profit: 2080000 },
    { date: '2023-10-03', orders: 12, revenue: 3800000, average: 316666, profit: 1520000 },
    { date: '2023-10-04', orders: 22, revenue: 6500000, average: 295454, profit: 2600000 },
    { date: '2023-10-05', orders: 25, revenue: 7200000, average: 288000, profit: 2880000 },
    { date: '2023-10-06', orders: 20, revenue: 5800000, average: 290000, profit: 2320000 },
    { date: '2023-10-07', orders: 28, revenue: 8200000, average: 292857, profit: 3280000 },
  ];

  const topProducts = [
    { name: 'Wagyu Steak A5', sales: 15, revenue: 18750000, growth: '+12%', trend: 'up' },
    { name: 'Truffle Risotto', sales: 28, revenue: 12600000, growth: '+8%', trend: 'up' },
    { name: 'Tiramisu Classico', sales: 35, revenue: 5250000, growth: '+15%', trend: 'up' },
    { name: 'Salmon Gravadlax', sales: 22, revenue: 6160000, growth: '+5%', trend: 'up' },
    { name: 'Burrata Salad', sales: 18, revenue: 3960000, growth: '+10%', trend: 'up' },
  ];

  const metrics = [
    { label: 'Total Revenue', value: 'Rp 41,200,000', change: '+12.5%', trend: 'up', icon: faMoneyBillWave, color: 'success' },
    { label: 'Total Orders', value: '140', change: '+8.2%', trend: 'up', icon: faShoppingCart, color: 'primary' },
    { label: 'Avg Order Value', value: 'Rp 294,286', change: '+4.3%', trend: 'up', icon: faChartLine, color: 'info' },
    { label: 'Customer Growth', value: '+23%', change: '+5.1%', trend: 'up', icon: faUsers, color: 'warning' },
  ];

  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' 
      ? <FontAwesomeIcon icon={faCaretUp} className="text-success" /> 
      : <FontAwesomeIcon icon={faCaretDown} className="text-danger" />;
  };

  const calculateTotals = () => {
    const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
    const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
    const totalProfit = salesData.reduce((sum, day) => sum + day.profit, 0);
    return { totalRevenue, totalOrders, totalProfit };
  };

  const { totalRevenue, totalOrders, totalProfit } = calculateTotals();

  // Function untuk render table rows
  const renderTableRows = () => {
    return salesData.map((day, index) => {
      const cost = day.revenue - day.profit;
      const margin = ((day.profit / day.revenue) * 100).toFixed(1);
      
      return (
        <tr key={index}>
          <td data-label="Date">
            <strong>{day.date}</strong>
          </td>
          <td data-label="Orders">
            <div className="orders-cell">
              <FontAwesomeIcon icon={faBox} />
              <span>{day.orders}</span>
            </div>
          </td>
          <td data-label="Revenue">
            <strong className="revenue-text">{formatCurrency(day.revenue)}</strong>
          </td>
          <td data-label="Cost" className="cost-text">{formatCurrency(cost)}</td>
          <td data-label="Profit">
            <strong className="profit-text">{formatCurrency(day.profit)}</strong>
          </td>
          <td data-label="Margin">
            <span className={`margin-badge ${margin > 30 ? 'high' : margin > 20 ? 'medium' : 'low'}`}>
              {margin}%
            </span>
          </td>
          <td data-label="Avg Order">{formatCurrency(day.average)}</td>
          <td data-label="Trend">
            <div className="trend-cell">
              {index % 3 === 0 ? (
                <FontAwesomeIcon icon={faArrowUp} className="text-success" />
              ) : index % 3 === 1 ? (
                <FontAwesomeIcon icon={faArrowDown} className="text-danger" />
              ) : (
                <FontAwesomeIcon icon={faChartLine} className="text-warning" />
              )}
              <span className={`trend-${index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'stable'}`}>
                {index % 3 === 0 ? '+8%' : index % 3 === 1 ? '-3%' : '+0.5%'}
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  // Function untuk render mobile sales cards
  const renderMobileSalesCards = () => {
    return salesData.map((day, index) => {
      const cost = day.revenue - day.profit;
      const margin = ((day.profit / day.revenue) * 100).toFixed(1);
      const trend = index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'stable';
      
      return (
        <div key={index} className="sales-card">
          <div className="card-header">
            <div className="date">
              {day.date}
            </div>
            <div className={`trend-badge ${trend}`}>
              {trend === 'up' ? '+8%' : trend === 'down' ? '-3%' : '+0.5%'}
            </div>
          </div>
          
          <div className="card-body">
            <div className="metric-item">
              <div className="label">Orders</div>
              <div className="value">{day.orders}</div>
            </div>
            <div className="metric-item">
              <div className="label">Revenue</div>
              <div className="value revenue">{formatCurrency(day.revenue)}</div>
            </div>
            <div className="metric-item">
              <div className="label">Profit</div>
              <div className="value profit">{formatCurrency(day.profit)}</div>
            </div>
            <div className="metric-item">
              <div className="label">Avg Order</div>
              <div className="value">{formatCurrency(day.average)}</div>
            </div>
          </div>
          
          <div className="card-footer">
            <div className={`margin ${margin > 30 ? 'high' : margin > 20 ? 'medium' : 'low'}`}>
              Margin: {margin}%
            </div>
            <div className="cost-text">
              Cost: {formatCurrency(cost)}
            </div>
          </div>
        </div>
      );
    });
  };

  // Function untuk render top products
  const renderTopProducts = () => {
    return topProducts.map((product, index) => (
      <div key={index} className="product-item">
        <div className="product-rank">
          <span className={`rank-badge rank-${index + 1}`}>
            {index + 1}
          </span>
        </div>
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-meta">
            <span className="sales-count">
              <FontAwesomeIcon icon={faFire} />
              <span>{product.sales} sold</span>
            </span>
            <span className={`growth ${product.trend}`}>
              {product.growth}
            </span>
          </div>
        </div>
        <div className="product-revenue">
          <strong>{formatCurrency(product.revenue)}</strong>
          <div className="revenue-per-item">
            Avg: {formatCurrency(product.revenue / product.sales)}/item
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="sales-report">
      <div className="admin-header">
        <div className="header-left">
          <h2>
            <FontAwesomeIcon icon={faChartLine} />
            Sales Analytics Dashboard
          </h2>
          <div className="date-indicator">
            <FontAwesomeIcon icon={faCalendar} />
            <span>October 1-7, 2023</span>
          </div>
        </div>
        <div className="header-actions">
          <div className="dropdown">
            <select 
              className="form-select" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="btn btn-outline">
            <FontAwesomeIcon icon={faFilter} />
            Filter
          </button>
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faDownload} />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-header">
              <div className={`metric-icon ${metric.color}`}>
                <FontAwesomeIcon icon={metric.icon} />
              </div>
              <div className="metric-trend">
                {getTrendIcon(metric.trend)}
                <span className={`trend-${metric.trend}`}>{metric.change}</span>
              </div>
            </div>
            <div className="metric-body">
              <h3>{metric.value}</h3>
              <p>{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section - Tanpa Revenue Trends */}
      <div className="charts-section">
        {/* Top Products Section yang sekarang lebih menonjol */}
        <div className="top-products expanded">
          <div className="top-products-header">
            <h4>Top Selling Products</h4>
            <div className="header-description">
              <p>Best performing products based on revenue and sales volume</p>
            </div>
            <button className="btn btn-sm btn-outline">View All Products</button>
          </div>
          <div className="products-list">
            {renderTopProducts()}
          </div>
        </div>
      </div>

      {/* Mobile Sales Cards */}
      <div className="mobile-sales-cards mobile-only">
        {renderMobileSalesCards()}
      </div>

      {/* Detailed Table - Desktop */}
      <div className="detailed-table desktop-only">
        <div className="table-header">
          <h4>Daily Sales Breakdown</h4>
          <div className="table-actions">
            <select 
              className="form-select" 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="products">Product Report</option>
              <option value="customers">Customer Report</option>
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Cost</th>
                <th>Profit</th>
                <th>Margin</th>
                <th>Avg Order</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
            <tfoot>
              <tr className="table-footer">
                <td><strong>Totals</strong></td>
                <td><strong>{totalOrders}</strong></td>
                <td><strong className="revenue-text">{formatCurrency(totalRevenue)}</strong></td>
                <td><strong className="cost-text">{formatCurrency(totalRevenue - totalProfit)}</strong></td>
                <td><strong className="profit-text">{formatCurrency(totalProfit)}</strong></td>
                <td>
                  <span className="margin-badge high">
                    {((totalProfit / totalRevenue) * 100).toFixed(1)}%
                  </span>
                </td>
                <td><strong>{formatCurrency(Math.round(totalRevenue / totalOrders))}</strong></td>
                <td>
                  <div className="trend-cell">
                    <FontAwesomeIcon icon={faArrowUp} className="text-success" />
                    <span className="trend-up">+9.7%</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Report Generator */}
      <div className="report-generator">
        <div className="generator-header">
          <h4>Generate Custom Report</h4>
          <p>Export detailed reports in various formats</p>
        </div>
        <div className="generator-form">
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" className="form-control" defaultValue="2023-10-01" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>End Date</label>
                <input type="date" className="form-control" defaultValue="2023-10-07" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Report Type</label>
                <select className="form-control">
                  <option>Sales Report</option>
                  <option>Product Performance</option>
                  <option>Customer Analytics</option>
                  <option>Revenue Analysis</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Format</label>
                <select className="form-control">
                  <option>PDF Document</option>
                  <option>Excel Spreadsheet</option>
                  <option>CSV File</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <button className="btn btn-primary btn-lg w-100">
                  <FontAwesomeIcon icon={faDownload} />
                  Generate & Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;