import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faFilter, faTimes, faSortAmountDown, 
  faSortAmountUp, faStar, faFire, faTag
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/Product/ProductCard';
import { products, categories } from '../data/products';
import './Products.scss';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [allProducts, setAllProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    if (queryParams.get('search')) {
      setSearchQuery(queryParams.get('search'));
    }
    if (queryParams.get('category')) {
      setSelectedCategory(queryParams.get('category'));
    }
  }, [location.search]);

  // Filter and sort products
  useEffect(() => {
    setLoading(true);
    
    let filtered = [...allProducts];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - default sorting
        break;
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);
    
  }, [searchQuery, selectedCategory, priceRange, sortBy, allProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    navigate(`/products?${params.toString()}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    params.set('category', category);
    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 2000000]);
    setSortBy('featured');
    navigate('/products');
  };

  const getDiscountCount = () => {
    return allProducts.filter(p => p.discount > 0).length;
  };

  const getPremiumCount = () => {
    return allProducts.filter(p => p.tags?.includes('Premium')).length;
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Our Premium Menu</h1>
          <p>Discover our curated selection of artisanal food & beverages</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-bar">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search dishes, ingredients, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-lg-3">
            <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
              <div className="sidebar-header">
                <h3>
                  <FontAwesomeIcon icon={faFilter} />
                  Filters
                </h3>
                <button 
                  className="btn-close-filters"
                  onClick={() => setShowFilters(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Category Filter */}
              <div className="filter-section">
                <h4>Categories</h4>
                <div className="category-list">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                      <span className="category-count">
                        {category === 'All' 
                          ? allProducts.length 
                          : allProducts.filter(p => p.category === category).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-filter">
                  <div className="price-display">
                    <span>Rp {priceRange[0].toLocaleString()}</span>
                    <span>Rp {priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="100000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="form-range"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="form-range"
                  />
                </div>
              </div>

              {/* Special Filters */}
              <div className="filter-section">
                <h4>Special Offers</h4>
                <div className="special-filters">
                  <button 
                    className={`special-filter-btn ${sortBy === 'discount' ? 'active' : ''}`}
                    onClick={() => setSortBy(sortBy === 'discount' ? 'featured' : 'discount')}
                  >
                    <FontAwesomeIcon icon={faTag} />
                    <span>Discounted Items ({getDiscountCount()})</span>
                  </button>
                  <button 
                    className={`special-filter-btn ${sortBy === 'rating' ? 'active' : ''}`}
                    onClick={() => setSortBy(sortBy === 'rating' ? 'featured' : 'rating')}
                  >
                    <FontAwesomeIcon icon={faStar} />
                    <span>Top Rated</span>
                  </button>
                  <button 
                    className={`special-filter-btn`}
                    onClick={() => {
                      const premiumProducts = allProducts.filter(p => p.tags?.includes('Premium'));
                      setFilteredProducts(premiumProducts);
                    }}
                  >
                    <FontAwesomeIcon icon={faFire} />
                    <span>Premium Only ({getPremiumCount()})</span>
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="filter-actions">
                <button 
                  className="btn-clear-filters"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button 
              className="btn-mobile-filters"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* Sort Bar */}
            <div className="sort-bar">
              <div className="results-count">
                {loading ? (
                  <span>Searching...</span>
                ) : (
                  <span>{filteredProducts.length} products found</span>
                )}
              </div>
              <div className="sort-options">
                <span>Sort by:</span>
                <select 
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="sort-icons">
                  <button 
                    className={`sort-icon ${sortBy === 'price-low' ? 'active' : ''}`}
                    onClick={() => setSortBy('price-low')}
                    title="Price: Low to High"
                  >
                    <FontAwesomeIcon icon={faSortAmountDown} />
                  </button>
                  <button 
                    className={`sort-icon ${sortBy === 'price-high' ? 'active' : ''}`}
                    onClick={() => setSortBy('price-high')}
                    title="Price: High to Low"
                  >
                    <FontAwesomeIcon icon={faSortAmountUp} />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="loading-products">
                <div className="spinner-border text-brown" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading delicious products...</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="products-grid">
                    <div className="row">
                      {filteredProducts.map(product => (
                        <div key={product.id} className="col-xl-4 col-lg-6 col-md-6">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // No Results
                  <div className="no-results">
                    <div className="no-results-icon">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <button 
                      className="btn btn-primary"
                      onClick={clearFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Category Highlights */}
            {!loading && filteredProducts.length > 0 && (
              <div className="category-highlights">
                <h3>Browse by Category</h3>
                <div className="highlight-cards">
                  {categories.slice(1).map(category => {
                    const count = allProducts.filter(p => p.category === category).length;
                    if (count === 0) return null;
                    
                    return (
                      <button
                        key={category}
                        className="highlight-card"
                        onClick={() => handleCategorySelect(category)}
                      >
                        <h4>{category}</h4>
                        <p>{count} items</p>
                        <span className="view-link">View All →</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;