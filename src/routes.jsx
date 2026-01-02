import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import semua halaman
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import CustomerLoginPage from './pages/CustomerLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

import Profile from './pages/Profile/Profile';
import Orders from './pages/Orders/Orders'; // Kamu perlu membuat ini juga

// Private Route untuk customer
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Admin Route
const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/new" element={<div>Add New Product Page</div>} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<CustomerLoginPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Secret Admin Login Route */}
      <Route path="/admin-secret-login" element={<AdminLoginPage />} />
      
      {/* Protected Customer Routes */}
      <Route 
        path="/cart" 
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/order-confirmation" 
        element={
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard/*" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;