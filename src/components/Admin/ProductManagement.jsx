import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faEdit, faTrash, faSearch,
  faBox, faTag, faDollarSign, faSort,
  faChartLine, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const ProductManagement = () => {
  const [products] = useState([
    { id: 1, name: 'Truffle Risotto', category: 'Main Course', price: 450000, stock: 25, status: 'Active' },
    { id: 2, name: 'Wagyu Steak A5', category: 'Main Course', price: 1250000, stock: 12, status: 'Active' },
    { id: 3, name: 'Salmon Gravadlax', category: 'Appetizer', price: 280000, stock: 30, status: 'Active' },
    { id: 4, name: 'Tiramisu Classico', category: 'Dessert', price: 150000, stock: 40, status: 'Active' },
    { id: 5, name: 'Burrata Salad', category: 'Appetizer', price: 220000, stock: 35, status: 'Active' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Function untuk render mobile cards
  const renderMobileProductCards = () => {
    return filteredProducts.map(product => (
      <div key={product.id} className="product-card-mobile">
        <div className="product-header-mobile">
          <div className="product-image-mobile">
            <div className="product-image-placeholder">
              {product.name.charAt(0)}
            </div>
          </div>
          <div className="product-info-main">
            <div className="product-name">{product.name}</div>
            <div className="product-category">{product.category}</div>
          </div>
          <div className="product-badges-mobile">
            <div className={`status-badge ${product.status.toLowerCase()}`}>
              {product.status}
            </div>
            <div className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
              {product.stock} in stock
            </div>
          </div>
        </div>
        
        <div className="product-details-mobile">
          <div className="detail-item">
            <div className="detail-label">SKU:</div>
            <div className="detail-value">PROD-{product.id}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Price:</div>
            <div className="detail-value price">Rp {product.price.toLocaleString()}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Category:</div>
            <div className="detail-value">{product.category}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Stock Status:</div>
            <div className="detail-value">
              {product.stock > 20 ? 'High Stock' : product.stock > 10 ? 'Medium Stock' : 'Low Stock'}
            </div>
          </div>
        </div>
        
        <div className="product-footer-mobile">
          <div className="product-actions-mobile">
            <button className="btn btn-sm btn-edit">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className="btn btn-sm btn-delete">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="product-management">
      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faBox} />
          Product Management
        </h2>
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} />
          Add New Product
        </button>
      </div>

      <div className="admin-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <select 
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Main Course">Main Course</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Dessert">Dessert</option>
          </select>
          <select className="form-select">
            <option>Sort by: Newest</option>
            <option>Sort by: Price</option>
            <option>Sort by: Name</option>
          </select>
        </div>
      </div>

      {/* Desktop Table - Hanya tampil di desktop */}
      <div className="table-responsive desktop-only">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>
                  <div className="product-info">
                    <div className="product-image-placeholder">
                      {product.name.charAt(0)}
                    </div>
                    <div className="product-details">
                      <h6>{product.name}</h6>
                      <small>SKU: PROD-{product.id}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td>
                  <div className="price">
                    <FontAwesomeIcon icon={faDollarSign} />
                    Rp {product.price.toLocaleString()}
                  </div>
                </td>
                <td>
                  <div className="stock-info">
                    <div className={`stock-badge ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                      {product.stock} units
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-sm btn-delete">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View - Hanya tampil di mobile */}
      <div className="mobile-cards mobile-only">
        {renderMobileProductCards()}
      </div>

      <div className="pagination-section">
        <div className="pagination-info">
          Showing 1-{filteredProducts.length} of {filteredProducts.length} products
        </div>
        <div className="pagination">
          <button className="btn btn-sm">Previous</button>
          <span className="page-current">1</span>
          <button className="btn btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;