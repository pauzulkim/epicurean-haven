import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faDownload, faCalendar,
  faFilter, faMoneyBillWave, faShoppingCart,
  faCaretUp, faCaretDown, faBox, faUsers,
  faArrowUp, faArrowDown, faFire, faFileExcel,
  faFilePdf, faPrint, faExternalLinkAlt,
  faEye, faEdit, faTrash, faPlus
} from '@fortawesome/free-solid-svg-icons';

const SalesReport = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('sales');
  const [isMobile, setIsMobile] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [exporting, setExporting] = useState(false);
  const [showSalesData, setShowSalesData] = useState(true);
  const [showTopProducts, setShowTopProducts] = useState(true);
  const [salesData, setSalesData] = useState([
    { id: 1, date: '2023-10-01', orders: 15, revenue: 4500000, average: 300000, profit: 1800000, cost: 2700000 },
    { id: 2, date: '2023-10-02', orders: 18, revenue: 5200000, average: 288888, profit: 2080000, cost: 3120000 },
    { id: 3, date: '2023-10-03', orders: 12, revenue: 3800000, average: 316666, profit: 1520000, cost: 2280000 },
    { id: 4, date: '2023-10-04', orders: 22, revenue: 6500000, average: 295454, profit: 2600000, cost: 3900000 },
    { id: 5, date: '2023-10-05', orders: 25, revenue: 7200000, average: 288000, profit: 2880000, cost: 4320000 },
    { id: 6, date: '2023-10-06', orders: 20, revenue: 5800000, average: 290000, profit: 2320000, cost: 3480000 },
    { id: 7, date: '2023-10-07', orders: 28, revenue: 8200000, average: 292857, profit: 3280000, cost: 4920000 },
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: 'Wagyu Steak A5', sales: 15, revenue: 18750000, growth: '+12%', trend: 'up' },
    { id: 2, name: 'Truffle Risotto', sales: 28, revenue: 12600000, growth: '+8%', trend: 'up' },
    { id: 3, name: 'Tiramisu Classico', sales: 35, revenue: 5250000, growth: '+15%', trend: 'up' },
    { id: 4, name: 'Salmon Gravadlax', sales: 22, revenue: 6160000, growth: '+5%', trend: 'up' },
    { id: 5, name: 'Burrata Salad', sales: 18, revenue: 3960000, growth: '+10%', trend: 'up' },
  ]);

  // CRUD Functions for Sales Data
  const handleAddSalesData = () => {
    const newId = salesData.length > 0 ? Math.max(...salesData.map(d => d.id)) + 1 : 1;
    const newData = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      orders: Math.floor(Math.random() * 30) + 5,
      revenue: Math.floor(Math.random() * 10000000) + 1000000,
      average: Math.floor(Math.random() * 500000) + 100000,
      profit: Math.floor(Math.random() * 5000000) + 500000,
      cost: Math.floor(Math.random() * 7000000) + 1000000
    };
    setSalesData([...salesData, newData]);
  };

  const handleEditSalesData = (id) => {
    const data = salesData.find(d => d.id === id);
    if (data) {
      const newRevenue = prompt('Enter new revenue:', data.revenue);
      if (newRevenue) {
        const updatedData = salesData.map(d => 
          d.id === id ? { ...d, revenue: parseInt(newRevenue) } : d
        );
        setSalesData(updatedData);
      }
    }
  };

  const handleDeleteSalesData = (id) => {
    if (window.confirm('Are you sure you want to delete this sales data?')) {
      setSalesData(salesData.filter(d => d.id !== id));
    }
  };

  // CRUD Functions for Top Products
  const handleAddTopProduct = () => {
    const newId = topProducts.length > 0 ? Math.max(...topProducts.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      name: `New Product ${newId}`,
      sales: Math.floor(Math.random() * 40) + 1,
      revenue: Math.floor(Math.random() * 20000000) + 1000000,
      growth: '+5%',
      trend: 'up'
    };
    setTopProducts([...topProducts, newProduct]);
  };

  const handleEditTopProduct = (id) => {
    const product = topProducts.find(p => p.id === id);
    if (product) {
      const newName = prompt('Enter new product name:', product.name);
      if (newName) {
        const updatedProducts = topProducts.map(p => 
          p.id === id ? { ...p, name: newName } : p
        );
        setTopProducts(updatedProducts);
      }
    }
  };

  const handleDeleteTopProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setTopProducts(topProducts.filter(p => p.id !== id));
    }
  };

  // Export function
  const handleExportReport = () => {
    setExporting(true);
    
    setTimeout(() => {
      let exportContent = '';
      
      if (exportFormat === 'excel') {
        // Generate CSV content for sales data
        const headers = ['Date', 'Orders', 'Revenue', 'Cost', 'Profit', 'Margin', 'Avg Order'];
        const rows = salesData.map(day => {
          const margin = ((day.profit / day.revenue) * 100).toFixed(1);
          return [
            day.date,
            day.orders,
            day.revenue,
            day.cost,
            day.profit,
            `${margin}%`,
            day.average
          ];
        });
        
        // Add totals row
        const totals = calculateTotals();
        rows.push([
          'TOTAL',
          totals.totalOrders,
          totals.totalRevenue,
          totals.totalRevenue - totals.totalProfit,
          totals.totalProfit,
          `${((totals.totalProfit / totals.totalRevenue) * 100).toFixed(1)}%`,
          Math.round(totals.totalRevenue / totals.totalOrders)
        ]);
        
        exportContent = [
          headers.join(','),
          ...rows.map(row => row.join(','))
        ].join('\n');
        
        // Download CSV file
        const blob = new Blob([exportContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales_report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        
      } else if (exportFormat === 'pdf') {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>Sales Report ${new Date().toISOString().split('T')[0]}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; }
                .total-row { font-weight: bold; background-color: #e8f4ff; }
                .profit { color: #28a745; }
                .revenue { color: #007bff; }
              </style>
            </head>
            <body>
              <h1>Sales Report - ${dateRange === 'week' ? 'Last 7 Days' : dateRange}</h1>
              <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
              <h2>Sales Data</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Cost</th>
                    <th>Profit</th>
                    <th>Margin</th>
                    <th>Avg Order</th>
                  </tr>
                </thead>
                <tbody>
                  ${salesData.map(day => {
                    const margin = ((day.profit / day.revenue) * 100).toFixed(1);
                    return `
                      <tr>
                        <td>${day.date}</td>
                        <td>${day.orders}</td>
                        <td class="revenue">Rp ${day.revenue.toLocaleString()}</td>
                        <td>Rp ${day.cost.toLocaleString()}</td>
                        <td class="profit">Rp ${day.profit.toLocaleString()}</td>
                        <td>${margin}%</td>
                        <td>Rp ${day.average.toLocaleString()}</td>
                      </tr>
                    `;
                  }).join('')}
                  <tr class="total-row">
                    <td><strong>TOTAL</strong></td>
                    <td><strong>${calculateTotals().totalOrders}</strong></td>
                    <td class="revenue"><strong>Rp ${calculateTotals().totalRevenue.toLocaleString()}</strong></td>
                    <td><strong>Rp ${(calculateTotals().totalRevenue - calculateTotals().totalProfit).toLocaleString()}</strong></td>
                    <td class="profit"><strong>Rp ${calculateTotals().totalProfit.toLocaleString()}</strong></td>
                    <td><strong>${((calculateTotals().totalProfit / calculateTotals().totalRevenue) * 100).toFixed(1)}%</strong></td>
                    <td><strong>Rp ${Math.round(calculateTotals().totalRevenue / calculateTotals().totalOrders).toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </table>
              
              <h2>Top Products</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  ${topProducts.map(product => `
                    <tr>
                      <td>${product.name}</td>
                      <td>${product.sales}</td>
                      <td class="revenue">Rp ${product.revenue.toLocaleString()}</td>
                      <td><span style="color: #28a745">${product.growth}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
      
      setExporting(false);
      alert(`Report exported successfully as ${exportFormat.toUpperCase()}!`);
    }, 1500);
  };

  const calculateTotals = () => {
    const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
    const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
    const totalProfit = salesData.reduce((sum, day) => sum + day.profit, 0);
    return { totalRevenue, totalOrders, totalProfit };
  };

  const { totalRevenue, totalOrders, totalProfit } = calculateTotals();

  const metrics = [
    { label: 'Total Revenue', value: `Rp ${totalRevenue.toLocaleString()}`, change: '+12.5%', trend: 'up', icon: faMoneyBillWave, color: 'success' },
    { label: 'Total Orders', value: totalOrders.toString(), change: '+8.2%', trend: 'up', icon: faShoppingCart, color: 'primary' },
    { label: 'Avg Order Value', value: `Rp ${Math.round(totalRevenue / totalOrders).toLocaleString()}`, change: '+4.3%', trend: 'up', icon: faChartLine, color: 'info' },
    { label: 'Total Profit', value: `Rp ${totalProfit.toLocaleString()}`, change: '+15.1%', trend: 'up', icon: faMoneyBillWave, color: 'warning' },
  ];

  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' 
      ? <FontAwesomeIcon icon={faCaretUp} className="text-success" /> 
      : <FontAwesomeIcon icon={faCaretDown} className="text-danger" />;
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
          <button 
            className="btn btn-primary"
            onClick={handleExportReport}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Exporting...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faDownload} />
                Export Report
              </>
            )}
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

      {/* Main Content Area */}
      <div className="reports-content">
        {/* Sales Data Section */}
        <div className="sales-data-section">
          <div className="section-header">
            <div className="header-left">
              <h4>
                <FontAwesomeIcon icon={faChartLine} />
                Sales Data
              </h4>
              <div className="section-controls">
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => setShowSalesData(!showSalesData)}
                >
                  {showSalesData ? 'Hide' : 'Show'} Data
                </button>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={handleAddSalesData}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Data
                </button>
              </div>
            </div>
          </div>

          {showSalesData && (
            <div className="sales-data-content">
              {/* Desktop Table */}
              <div className="table-responsive desktop-only">
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((day, index) => {
                      const margin = ((day.profit / day.revenue) * 100).toFixed(1);
                      const trend = index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'stable';
                      
                      return (
                        <tr key={day.id}>
                          <td><strong>{day.date}</strong></td>
                          <td>
                            <div className="orders-cell">
                              <FontAwesomeIcon icon={faBox} />
                              <span>{day.orders}</span>
                            </div>
                          </td>
                          <td>
                            <strong className="revenue-text">{formatCurrency(day.revenue)}</strong>
                          </td>
                          <td className="cost-text">{formatCurrency(day.cost)}</td>
                          <td>
                            <strong className="profit-text">{formatCurrency(day.profit)}</strong>
                          </td>
                          <td>
                            <span className={`margin-badge ${margin > 30 ? 'high' : margin > 20 ? 'medium' : 'low'}`}>
                              {margin}%
                            </span>
                          </td>
                          <td>{formatCurrency(day.average)}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-view"
                                onClick={() => alert(`Details for ${day.date}\nOrders: ${day.orders}\nRevenue: ${formatCurrency(day.revenue)}`)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                              <button 
                                className="btn btn-sm btn-edit"
                                onClick={() => handleEditSalesData(day.id)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button 
                                className="btn btn-sm btn-delete"
                                onClick={() => handleDeleteSalesData(day.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="mobile-cards mobile-only">
                {salesData.map((day, index) => {
                  const margin = ((day.profit / day.revenue) * 100).toFixed(1);
                  const trend = index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'stable';
                  
                  return (
                    <div key={day.id} className="sales-card">
                      <div className="card-header">
                        <div className="date">
                          {day.date}
                        </div>
                        <div className="card-badges">
                          <div className={`trend-badge ${trend}`}>
                            {trend === 'up' ? '+8%' : trend === 'down' ? '-3%' : '+0.5%'}
                          </div>
                          <span className={`margin-badge ${margin > 30 ? 'high' : margin > 20 ? 'medium' : 'low'}`}>
                            {margin}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="card-details">
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faBox} />
                          <div className="detail-content">
                            <div className="label">Orders</div>
                            <div className="value">{day.orders}</div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                          <div className="detail-content">
                            <div className="label">Revenue</div>
                            <div className="value revenue">{formatCurrency(day.revenue)}</div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                          <div className="detail-content">
                            <div className="label">Profit</div>
                            <div className="value profit">{formatCurrency(day.profit)}</div>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FontAwesomeIcon icon={faChartLine} />
                          <div className="detail-content">
                            <div className="label">Avg Order</div>
                            <div className="value">{formatCurrency(day.average)}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-footer">
                        <div className="cost-text">
                          Cost: {formatCurrency(day.cost)}
                        </div>
                        <div className="card-actions">
                          <button 
                            className="btn btn-view"
                            onClick={() => alert(`Details for ${day.date}\nOrders: ${day.orders}\nRevenue: ${formatCurrency(day.revenue)}`)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button 
                            className="btn btn-edit"
                            onClick={() => handleEditSalesData(day.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button 
                            className="btn btn-delete"
                            onClick={() => handleDeleteSalesData(day.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Top Products Section */}
        <div className="top-products-section">
          <div className="section-header">
            <div className="header-left">
              <h4>
                <FontAwesomeIcon icon={faFire} />
                Top Selling Products
              </h4>
              <div className="section-controls">
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => setShowTopProducts(!showTopProducts)}
                >
                  {showTopProducts ? 'Hide' : 'Show'} Products
                </button>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={handleAddTopProduct}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Product
                </button>
              </div>
            </div>
          </div>

          {showTopProducts && (
            <div className="top-products-content">
              <div className="products-grid">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="product-card">
                    <div className="product-card-header">
                      <div className="product-rank">
                        <span className={`rank-badge rank-${index + 1}`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="product-badges">
                        <span className={`growth-badge ${product.trend}`}>
                          {product.growth}
                        </span>
                      </div>
                    </div>
                    
                    <div className="product-card-body">
                      <div className="product-info">
                        <div className="product-name">{product.name}</div>
                        <div className="product-stats">
                          <div className="stat-item">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span>{product.sales} sold</span>
                          </div>
                          <div className="stat-item">
                            <FontAwesomeIcon icon={faMoneyBillWave} />
                            <span>{formatCurrency(product.revenue)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="product-card-footer">
                      <div className="product-revenue">
                        <div className="revenue-label">Revenue per item</div>
                        <div className="revenue-value">
                          {formatCurrency(product.revenue / product.sales)}
                        </div>
                      </div>
                      <div className="product-actions">
                        <button 
                          className="btn btn-sm btn-view"
                          onClick={() => alert(`Product: ${product.name}\nSales: ${product.sales}\nRevenue: ${formatCurrency(product.revenue)}`)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button 
                          className="btn btn-sm btn-edit"
                          onClick={() => handleEditTopProduct(product.id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="btn btn-sm btn-delete"
                          onClick={() => handleDeleteTopProduct(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div className="export-section">
          <div className="section-header">
            <h4>
              <FontAwesomeIcon icon={faDownload} />
              Export Report
            </h4>
            <p className="section-subtitle">Generate and download reports in various formats</p>
          </div>
          
          <div className="export-options">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Date Range</label>
                  <select className="form-control" defaultValue="week">
                    <option value="week">Last 7 Days</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Export Format</label>
                  <select 
                    className="form-control"
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                  >
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV (.csv)</option>
                    <option value="pdf">PDF (.pdf)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Include Data</label>
                  <div className="checkboxes">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="includeSales" 
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="includeSales">
                        Sales Data
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="includeProducts" 
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="includeProducts">
                        Top Products
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="includeCharts" 
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="includeCharts">
                        Charts & Graphs
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Report Options</label>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="includeSummary" 
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="includeSummary">
                      Include Executive Summary
                    </label>
                  </div>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="includeRecommendations" 
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="includeRecommendations">
                      Include Recommendations
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="export-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleExportReport}
                disabled={exporting}
              >
                {exporting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faDownload} />
                    Generate & Download Report
                  </>
                )}
              </button>
              <button className="btn btn-outline btn-lg">
                <FontAwesomeIcon icon={faPrint} />
                Print Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;