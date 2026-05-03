import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/places', label: 'Places & Tours' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">✈</span>
          <span className="brand-name">Wanderlust<span>Co.</span></span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={isActive(to) ? 'active' : ''}>{label}</Link>
            </li>
          ))}
          {isAdmin && (
            <li><Link to="/admin" className={`admin-link ${isActive('/admin') ? 'active' : ''}`}>⚙ Admin</Link></li>
          )}
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-avatar">{user.name[0].toUpperCase()}</div>
              <div className="user-dropdown">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  {isAdmin && <span className="admin-badge">Admin</span>}
                </div>
                <Link to="/login">My Dashboard</Link>
                {isAdmin && <Link to="/admin">Admin Panel</Link>}
                <button onClick={handleLogout} className="logout-btn">Sign Out</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/join" className="btn btn-primary btn-sm">Join Us</Link>
            </>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
