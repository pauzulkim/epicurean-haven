import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faEdit, faTrash, faSearch,
  faBox, faTag, faDollarSign, faSort,
  faChartLine, faExclamationTriangle,
  faSave, faTimes, faImage, faInfoCircle,
  faStar, faShoppingCart, faDatabase,
  faPrint, faDownload, faFilter,
  faArrowUp, faArrowDown, faBoxOpen,
  faCheckCircle, faTimesCircle, faClock, faPercent
} from '@fortawesome/free-solid-svg-icons';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Truffle Risotto', 
      category: 'Main Course', 
      price: 450000, 
      stock: 25, 
      status: 'Active',
      description: 'Authentic Italian risotto with black truffle',
      sku: 'PROD-001',
      sales: 42,
      revenue: 18900000,
      cost: 200000,
      profit: 18700000,
      margin: 92.6,
      createdAt: '2023-10-01'
    },
    { 
      id: 2, 
      name: 'Wagyu Steak A5', 
      category: 'Main Course', 
      price: 1250000, 
      stock: 12, 
      status: 'Active',
      description: 'Premium Japanese Wagyu A5 grade steak',
      sku: 'PROD-002',
      sales: 28,
      revenue: 35000000,
      cost: 3000000,
      profit: 32000000,
      margin: 91.4,
      createdAt: '2023-10-05'
    },
    { 
      id: 3, 
      name: 'Salmon Gravadlax', 
      category: 'Appetizer', 
      price: 280000, 
      stock: 30, 
      status: 'Active',
      description: 'Cured salmon with dill and mustard sauce',
      sku: 'PROD-003',
      sales: 56,
      revenue: 15680000,
      cost: 500000,
      profit: 15180000,
      margin: 96.8,
      createdAt: '2023-10-10'
    },
    { 
      id: 4, 
      name: 'Tiramisu Classico', 
      category: 'Dessert', 
      price: 150000, 
      stock: 18, 
      status: 'Active',
      description: 'Classic Italian coffee-flavored dessert',
      sku: 'PROD-004',
      sales: 67,
      revenue: 10050000,
      cost: 200000,
      profit: 9850000,
      margin: 98.0,
      createdAt: '2023-10-15'
    },
    { 
      id: 5, 
      name: 'Burrata Salad', 
      category: 'Appetizer', 
      price: 220000, 
      stock: 8, 
      status: 'Low Stock',
      description: 'Fresh burrata cheese with cherry tomatoes',
      sku: 'PROD-005',
      sales: 39,
      revenue: 8580000,
      cost: 100000,
      profit: 8480000,
      margin: 98.8,
      createdAt: '2023-10-20'
    },
    { 
      id: 6, 
      name: 'Craft Cocktail', 
      category: 'Beverage', 
      price: 180000, 
      stock: 0, 
      status: 'Out of Stock',
      description: 'Signature craft cocktail with premium spirits',
      sku: 'PROD-006',
      sales: 45,
      revenue: 8100000,
      cost: 150000,
      profit: 7950000,
      margin: 98.1,
      createdAt: '2023-10-25'
    },
    { 
      id: 7, 
      name: 'Foie Gras Terrine', 
      category: 'Appetizer', 
      price: 650000, 
      stock: 6, 
      status: 'Low Stock',
      description: 'Luxurious foie gras terrine with truffle',
      sku: 'PROD-007',
      sales: 18,
      revenue: 11700000,
      cost: 800000,
      profit: 10900000,
      margin: 93.2,
      createdAt: '2023-11-01'
    },
    { 
      id: 8, 
      name: 'Lobster Bisque', 
      category: 'Appetizer', 
      price: 320000, 
      stock: 15, 
      status: 'Active',
      description: 'Creamy lobster soup with cognac',
      sku: 'PROD-008',
      sales: 32,
      revenue: 10240000,
      cost: 300000,
      profit: 9940000,
      margin: 97.1,
      createdAt: '2023-11-05'
    }
  ]);

  // State untuk operasi CRUD
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Main Course',
    price: 0,
    cost: 0,
    stock: 0,
    status: 'Active',
    description: '',
    sku: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fungsi CRUD untuk Products
  const handleAddProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      sku: newProduct.sku || `PROD-${newId.toString().padStart(3, '0')}`,
      sales: 0,
      revenue: 0,
      profit: 0,
      margin: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      category: 'Main Course',
      price: 0,
      cost: 0,
      stock: 0,
      status: 'Active',
      description: '',
      sku: ''
    });
    setShowAddForm(false);
    alert('Product added successfully!');
  };

  const handleEditProduct = (product) => {
    setEditingProduct({...product});
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    setProducts(products.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    ));
    setEditingProduct(null);
    alert('Product updated successfully!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(productId => productId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  // Modal untuk melihat detail produk
  const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Product Details</h3>
            <button className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="modal-body">
            <div className="product-detail-header">
              <div className="product-image-placeholder-large">
                {product.name.charAt(0)}
              </div>
              <div className="product-detail-info">
                <h4>{product.name}</h4>
                <div className="product-detail-meta">
                  <span className="category-badge">{product.category}</span>
                  <span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
                    {product.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="product-detail-grid">
              <div className="detail-item">
                <label>SKU:</label>
                <p>{product.sku}</p>
              </div>
              <div className="detail-item">
                <label>Product ID:</label>
                <p>#{product.id.toString().padStart(3, '0')}</p>
              </div>
              <div className="detail-item">
                <label>Created Date:</label>
                <p>{product.createdAt}</p>
              </div>
              <div className="detail-item">
                <label>Price:</label>
                <p className="price">Rp {product.price.toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <label>Cost:</label>
                <p>Rp {product.cost.toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <label>Stock:</label>
                <p>{product.stock} units</p>
              </div>
              <div className="detail-item">
                <label>Stock Status:</label>
                <p>
                  {product.stock > 20 ? 'High Stock' : 
                   product.stock > 10 ? 'Medium Stock' : 
                   product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="detail-item">
                <label>Total Sales:</label>
                <p>{product.sales} items</p>
              </div>
              <div className="detail-item">
                <label>Total Revenue:</label>
                <p className="revenue">Rp {product.revenue.toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <label>Profit:</label>
                <p className="profit">Rp {product.profit.toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <label>Margin:</label>
                <p className="margin">{product.margin.toFixed(1)}%</p>
              </div>
            </div>

            <div className="product-description">
              <label>Description:</label>
              <p>{product.description}</p>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  handleEditProduct(product);
                  onClose();
                }}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'stock-high':
          return b.stock - a.stock;
        case 'stock-low':
          return a.stock - b.stock;
        case 'sales-high':
          return b.sales - a.sales;
        case 'sales-low':
          return a.sales - b.sales;
        case 'revenue-high':
          return b.revenue - a.revenue;
        case 'revenue-low':
          return a.revenue - b.revenue;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return b.id - a.id;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Stats calculation
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'Active').length,
    lowStockProducts: products.filter(p => p.stock < 10 && p.stock > 0).length,
    outOfStockProducts: products.filter(p => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    totalProfit: products.reduce((sum, p) => sum + p.profit, 0),
    averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length || 0,
    averageMargin: products.reduce((sum, p) => sum + p.margin, 0) / products.length || 0
  };

  const categories = [...new Set(products.map(p => p.category))];
  const statuses = [...new Set(products.map(p => p.status))];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile Product Card Component
  const ProductMobileCard = ({ product }) => (
    <div className="product-card-mobile">
      <div className="card-header">
        <div className="product-info-mobile">
          <div className="product-image-mobile">
            <div className="product-image-placeholder">
              {product.name.charAt(0)}
            </div>
          </div>
          <div>
            <h6 className="card-title">{product.name}</h6>
            <small className="text-muted">SKU: {product.sku}</small>
            <div className="mobile-badges">
              <span className="category-badge-small">{product.category}</span>
              <span className={`status-badge-small ${product.status.toLowerCase().replace(' ', '-')}`}>
                {product.status}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-details">
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faDollarSign} />
            <span className="label">Price:</span>
            <span className="value">Rp {product.price.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faBoxOpen} />
            <span className="label">Stock:</span>
            <span className={`value ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
              {product.stock} units
            </span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="label">Sales:</span>
            <span className="value">{product.sales}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faChartLine} />
            <span className="label">Revenue:</span>
            <span className="value">Rp {product.revenue.toLocaleString()}</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <FontAwesomeIcon icon={faArrowUp} />
            <span className="label">Profit:</span>
            <span className="value profit">Rp {product.profit.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faPercent} />
            <span className="label">Margin:</span>
            <span className={`value margin ${product.margin > 90 ? 'high' : product.margin > 70 ? 'medium' : 'low'}`}>
              {product.margin.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="inventory-value">
          <small>Inventory Value: Rp {(product.price * product.stock).toLocaleString()}</small>
        </div>
        <div className="card-actions">
          <button 
            className="btn btn-view" 
            title="View Details"
            onClick={() => handleViewProduct(product)}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          <button 
            className="btn btn-edit" 
            title="Edit"
            onClick={() => handleEditProduct(product)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="btn btn-delete" 
            title="Delete"
            onClick={() => handleDeleteProduct(product.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );

  // Desktop Product Row Component
  const ProductDesktopRow = ({ product }) => (
    <tr key={product.id} className={selectedProducts.includes(product.id) ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={selectedProducts.includes(product.id)}
          onChange={() => handleSelectProduct(product.id)}
          className="row-checkbox"
        />
      </td>
      <td>#{product.id.toString().padStart(3, '0')}</td>
      <td>
        <div className="product-info">
          <div className="product-image-placeholder">
            {product.name.charAt(0)}
          </div>
          <div className="product-details">
            <h6>{product.name}</h6>
            <small>SKU: {product.sku}</small>
            <div className="product-meta">
              <span className="created-date">
                <FontAwesomeIcon icon={faClock} /> {product.createdAt}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="category-badge">{product.category}</span>
      </td>
      <td>
        <div className="price">
          <FontAwesomeIcon icon={faDollarSign} />
          <span>Rp {product.price.toLocaleString()}</span>
        </div>
        <small className="text-muted">Cost: Rp {product.cost.toLocaleString()}</small>
      </td>
      <td>
        <div className="stock-info">
          <div className={`stock-badge ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
            {product.stock} units
          </div>
          <div className="inventory-value">
            <small>Value: Rp {(product.price * product.stock).toLocaleString()}</small>
          </div>
        </div>
      </td>
      <td>
        <span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
          {product.status === 'Active' && <FontAwesomeIcon icon={faCheckCircle} />}
          {product.status === 'Inactive' && <FontAwesomeIcon icon={faTimesCircle} />}
          {product.status === 'Low Stock' && <FontAwesomeIcon icon={faExclamationTriangle} />}
          {product.status === 'Out of Stock' && <FontAwesomeIcon icon={faBoxOpen} />}
          {product.status}
        </span>
      </td>
      <td>
        <div className="sales-info">
          <div className="sales-count">{product.sales} sold</div>
          <div className="revenue-info">
            <small>Rp {product.revenue.toLocaleString()}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="profit-info">
          <div className="profit-amount">Rp {product.profit.toLocaleString()}</div>
          <div className={`margin-badge ${product.margin > 90 ? 'high' : product.margin > 70 ? 'medium' : 'low'}`}>
            {product.margin.toFixed(1)}%
          </div>
        </div>
      </td>
      <td>
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-view"
            onClick={() => handleViewProduct(product)}
            title="View Details"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          <button 
            className="btn btn-sm btn-edit"
            onClick={() => handleEditProduct(product)}
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="btn btn-sm btn-delete"
            onClick={() => handleDeleteProduct(product.id)}
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );

  // Export function
  const handleExportProducts = (format) => {
    const dataToExport = format === 'selected' && selectedProducts.length > 0
      ? products.filter(p => selectedProducts.includes(p.id))
      : filteredProducts;

    const csvData = dataToExport.map(product => ({
      'Product ID': product.id,
      'Name': product.name,
      'SKU': product.sku,
      'Category': product.category,
      'Price': product.price,
      'Cost': product.cost,
      'Stock': product.stock,
      'Status': product.status,
      'Sales': product.sales,
      'Revenue': product.revenue,
      'Profit': product.profit,
      'Margin': `${product.margin}%`,
      'Description': product.description,
      'Created Date': product.createdAt
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert(`${dataToExport.length} products exported successfully!`);
  };

  return (
    <div className="product-management">
      {/* Add Product Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      className="form-select"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="Main Course">Main Course</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>SKU (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      placeholder="e.g., PROD-001"
                    />
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Price *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                      placeholder="Selling price"
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Cost</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newProduct.cost}
                      onChange={(e) => setNewProduct({...newProduct, cost: parseInt(e.target.value) || 0})}
                      placeholder="Production cost"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Stock *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                      placeholder="Initial stock quantity"
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={newProduct.status}
                      onChange={(e) => setNewProduct({...newProduct, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                  rows="3"
                />
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
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || newProduct.price <= 0}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Product - {editingProduct.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setEditingProduct(null)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      className="form-select"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    >
                      <option value="Main Course">Main Course</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>SKU</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct.sku}
                      onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Price *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Cost</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct.cost}
                      onChange={(e) => setEditingProduct({...editingProduct, cost: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Stock *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-select"
                      value={editingProduct.status}
                      onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Low Stock">Low Stock</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  rows="3"
                />
              </div>
              
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProduct}
                  disabled={!editingProduct.name || editingProduct.price <= 0}
                >
                  <FontAwesomeIcon icon={faSave} />
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      <ProductDetailModal 
        product={viewingProduct} 
        onClose={() => setViewingProduct(null)}
      />

      {/* Header Section */}
      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faBox} />
          Product Management
        </h2>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            + Add Product
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon total">
                <FontAwesomeIcon icon={faBox} />
              </div>
              <div className="stat-content">
                <h3>{stats.totalProducts}</h3>
                <p>Total Products</p>
                <small className="positive">{stats.activeProducts} active</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon warning">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <div className="stat-content">
                <h3>{stats.lowStockProducts}</h3>
                <p>Low Stock</p>
                <small className="warning">{stats.outOfStockProducts} out of stock</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon revenue">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <div className="stat-content">
                <h3>Rp {stats.totalValue.toLocaleString()}</h3>
                <p>Inventory Value</p>
                <small>Avg: Rp {Math.round(stats.averagePrice).toLocaleString()}</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="stat-card">
              <div className="stat-icon profit">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="stat-content">
                <h3>Rp {stats.totalRevenue.toLocaleString()}</h3>
                <p>Total Revenue</p>
                <small>Profit: Rp {stats.totalProfit.toLocaleString()}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bulk-actions-alert">
          <div className="alert alert-info">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <FontAwesomeIcon icon={faInfoCircle} /> 
                {selectedProducts.length} product(s) selected
              </span>
              <div className="bulk-action-buttons">
                <button className="btn btn-sm btn-outline me-2">
                  Update Status
                </button>
                <button className="btn btn-sm btn-outline me-2">
                  Update Price
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm(`Delete ${selectedProducts.length} selected products?`)) {
                      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
                      setSelectedProducts([]);
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="filter-group">
              <label>Category</label>
              <select 
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
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
              <label>Sort By</label>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="stock-high">Stock: High to Low</option>
                <option value="stock-low">Stock: Low to High</option>
                <option value="sales-high">Sales: High to Low</option>
                <option value="sales-low">Sales: Low to High</option>
                <option value="revenue-high">Revenue: High to Low</option>
                <option value="revenue-low">Revenue: Low to High</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Products Table */}
      <div className="products-table desktop-only">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="select-all-checkbox"
                  />
                </th>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price & Cost</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Sales & Revenue</th>
                <th>Profit & Margin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <ProductDesktopRow key={product.id} product={product} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="10">
                  <div className="table-summary">
                    <div className="summary-stats">
                      <span>Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products</span>
                      <span>Total Value: Rp {filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</span>
                      <span>Total Revenue: Rp {filteredProducts.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Mobile Products Cards */}
      <div className="mobile-products-cards mobile-only">
        <div className="mobile-cards">
          {currentProducts.map(product => (
            <ProductMobileCard key={product.id} product={product} />
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
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
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
                <option>Bulk Actions</option>
                <option>Update Status</option>
                <option>Update Price</option>
                <option>Update Stock</option>
                <option>Assign Category</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <div className="export-buttons">
              <button 
                className="btn btn-outline me-2"
                onClick={() => handleExportProducts('all')}
              >
                <FontAwesomeIcon icon={faDownload} />
                Export All
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleExportProducts('selected')}
                disabled={selectedProducts.length === 0}
              >
                <FontAwesomeIcon icon={faDatabase} />
                Export Selected ({selectedProducts.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;