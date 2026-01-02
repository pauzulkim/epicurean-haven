import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const closeAllDropdowns = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">🍽️</span>
          <span className="brand-name">Epicurean Haven</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeAllDropdowns}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={closeAllDropdowns}>
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeAllDropdowns}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeAllDropdowns}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <button
              className="btn btn-search"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMobileMenuOpen(false);
                setUserDropdownOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>

            <Link 
              className="btn btn-cart" 
              to="/cart"
              onClick={closeAllDropdowns}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>

            {user ? (
              <div className={`dropdown ${userDropdownOpen ? 'show' : ''}`}>
                <button
                  className="btn btn-user"
                  type="button"
                  onClick={toggleUserDropdown}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="d-none d-md-inline"> {user.name}</span>
                </button>
                <div className={`dropdown-menu ${userDropdownOpen ? 'show' : ''}`}>
                  <Link 
                    className="dropdown-item" 
                    to="/profile"
                    onClick={() => {
                      closeAllDropdowns();
                      setUserDropdownOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                  <Link 
                    className="dropdown-item" 
                    to="/orders"
                    onClick={() => {
                      closeAllDropdowns();
                      setUserDropdownOpen(false);
                    }}
                  >
                    My Orders
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                className="btn btn-login" 
                to="/login"
                onClick={closeAllDropdowns}
              >
                <FontAwesomeIcon icon={faUser} />
                <span className="d-none d-md-inline"> Login</span>
              </Link>
            )}
          </div>
        </div>

        {searchOpen && (
          <div className="search-overlay">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                className="form-control"
                placeholder="Search dishes, drinks, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <button
                type="button"
                className="btn btn-close-search"
                onClick={() => setSearchOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;