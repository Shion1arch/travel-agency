import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Places from './pages/Places';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import JoinUs from './pages/JoinUs';
import LoginDashboard from './pages/LoginDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddPlace from './pages/adminAddPlaces';
import './index.css';

const ProtectedAdmin = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
};

const AppShell = () => {
  const { user } = useAuth();
  const location = useLocation();
  const hideSiteChrome = location.pathname === '/join' || (location.pathname === '/login' && !user);

  return (
    <>
      {!hideSiteChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/login" element={<LoginDashboard />} />
        <Route path="/admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
        <Route path="/admin/add-place" element={<ProtectedAdmin><AdminAddPlace /></ProtectedAdmin>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!hideSiteChrome && <Footer />}
    </>
  );
};

const AppContent = () => {
  return (
    <Router>
      <AppShell />
    </Router>
  );
};

export default function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}
