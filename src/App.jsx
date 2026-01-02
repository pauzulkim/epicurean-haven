import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

// Import Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import BackToTop from './components/Layout/BackToTop';

// Import Routes
import AppRoutes from './routes.jsx';

// Import semua styles
import './styles/App.scss';
import './styles/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Komponen wrapper untuk conditional layout
const AppLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // List of routes where Navbar & Footer should be HIDDEN
  const hideLayoutRoutes = [
    '/admin-secret-login',
    '/admin/dashboard',
    '/admin/dashboard/', // Root admin dashboard
  ];
  
  // Check if current route starts with admin dashboard (including sub-routes)
  const isAdminDashboard = currentPath.startsWith('/admin/dashboard');
  
  // Should we show Navbar & Footer?
  const shouldShowLayout = !hideLayoutRoutes.includes(currentPath) && !isAdminDashboard;

  return (
    <div className="App">
      {/* Conditional Navbar */}
      {shouldShowLayout && <Navbar />}
      
      <main className={`main-content ${!shouldShowLayout ? 'no-layout' : ''}`}>
        <AppRoutes />
      </main>
      
      {/* Conditional Footer */}
      {shouldShowLayout && <Footer />}
      
      {/* BackToTop - show everywhere except admin pages */}
      {shouldShowLayout && <BackToTop />}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;