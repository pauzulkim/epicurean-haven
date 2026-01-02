import React, { createContext, useState, useContext, useEffect } from 'react';
import { customers, admins } from '../data/users';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek session storage saat pertama load
    const storedUser = sessionStorage.getItem('epicurean_user');
    const storedAdmin = sessionStorage.getItem('epicurean_admin');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedAdmin) {
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  const customerLogin = (email, password) => {
    const customer = customers.find(
      c => c.email === email && c.password === password
    );
    
    if (customer) {
      const userData = { ...customer, role: 'customer' };
      setUser(userData);
      sessionStorage.setItem('epicurean_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  const adminLogin = (username, password) => {
    const admin = admins.find(
      a => a.username === username && a.password === password
    );
    
    if (admin) {
      const adminData = { ...admin, role: 'admin' };
      setUser(adminData);
      setIsAdmin(true);
      sessionStorage.setItem('epicurean_admin', JSON.stringify(adminData));
      return { success: true, user: adminData };
    }
    
    return { success: false, message: 'Invalid admin credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    sessionStorage.removeItem('epicurean_user');
    sessionStorage.removeItem('epicurean_admin');
  };

  const updateProfile = async (profileData) => {
  try {
    // Simpan ke localStorage atau API
    const updatedUser = {
      ...user,
      ...profileData,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    return updatedUser;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      customerLogin,
      adminLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};