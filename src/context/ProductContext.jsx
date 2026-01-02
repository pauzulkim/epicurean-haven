import React, { createContext, useState, useContext, useEffect } from 'react';
import { products, categories } from '../data/products';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Initialize products
  useEffect(() => {
    try {
      setAllProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    filtered = sortProducts(filtered, sortBy);
    
    setFilteredProducts(filtered);
  }, [allProducts, searchQuery, selectedCategory, sortBy]);

  const sortProducts = (productsArray, sortOption) => {
    const sorted = [...productsArray];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'featured':
      default:
        // Default: featured products first (with discounts)
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }
  };

  const getProductById = (id) => {
    return allProducts.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (category === 'All') return allProducts;
    return allProducts.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return allProducts
      .filter(product => product.discount > 0)
      .slice(0, 8);
  };

  const getTrendingProducts = () => {
    return [...allProducts]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  };

  const getRelatedProducts = (currentProduct) => {
    if (!currentProduct) return [];
    
    return allProducts
      .filter(product => 
        product.id !== currentProduct.id && 
        product.category === currentProduct.category
      )
      .slice(0, 4);
  };

  const searchProducts = (query) => {
    setSearchQuery(query);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
  };

  // For admin - product management
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 1,
      createdAt: new Date().toISOString()
    };
    
    setAllProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setAllProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setAllProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductStats = () => {
    const stats = {
      totalProducts: allProducts.length,
      totalCategories: categories.length,
      totalValue: allProducts.reduce((sum, product) => sum + (product.price * product.stock), 0),
      lowStockProducts: allProducts.filter(product => product.stock < 10).length,
      outOfStockProducts: allProducts.filter(product => product.stock === 0).length,
      averagePrice: allProducts.length > 0 
        ? allProducts.reduce((sum, product) => sum + product.price, 0) / allProducts.length 
        : 0,
      categoryDistribution: {}
    };

    // Calculate category distribution
    categories.forEach(category => {
      if (category !== 'All') {
        stats.categoryDistribution[category] = 
          allProducts.filter(product => product.category === category).length;
      }
    });

    return stats;
  };

  return (
    <ProductContext.Provider value={{
      // State
      allProducts,
      filteredProducts,
      selectedProduct,
      loading,
      error,
      searchQuery,
      selectedCategory,
      sortBy,
      categories,
      
      // Actions
      setSelectedProduct,
      searchProducts,
      filterByCategory,
      setSortBy,
      clearFilters,
      
      // Getters
      getProductById,
      getProductsByCategory,
      getFeaturedProducts,
      getTrendingProducts,
      getRelatedProducts,
      getProductStats,
      
      // Admin actions
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};