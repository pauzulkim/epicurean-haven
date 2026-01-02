import React from 'react';
import { useLocation } from 'react-router-dom'; // KEEP THIS
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

// HAPUS AppLayout component, gabung langsung ke App

function App() {
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
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
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
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;