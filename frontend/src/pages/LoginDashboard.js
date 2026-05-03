import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginDashboard.css';

export default function LoginDashboard() {
  const { user, login, logout, isAdmin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLogin && form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      if (isLogin) {
        const u = await login(form.email, form.password);
        if (u.role === 'admin') navigate('/admin');
      } else {
        await login;
        const { useAuth: ua } = await import('../context/AuthContext');
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        await login(form.email, form.password);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Dashboard view for logged-in users
  if (user) {
    return (
      <div className="dashboard-page">
        <div className="dash-hero">
          <div className="container">
            <div className="dash-welcome">
              <div className="dash-avatar">{user.name[0].toUpperCase()}</div>
              <div>
                <h1>Welcome back, <span>{user.name}</span>!</h1>
                <p>{isAdmin ? '⚙ Admin Account' : '🌍 Explorer Account'} · {user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container dashboard-content">
          <div className="dash-grid">
            {/* Quick Stats */}
            <div className="dash-card">
              <h3>Your Account</h3>
              <div className="account-info">
                <div className="info-row"><span>Name</span><strong>{user.name}</strong></div>
                <div className="info-row"><span>Email</span><strong>{user.email}</strong></div>
                <div className="info-row"><span>Role</span><span className={`badge ${isAdmin ? 'badge-yellow' : 'badge-green'}`}>{user.role}</span></div>
                <div className="info-row"><span>Member since</span><strong>Active</strong></div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="dash-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <Link to="/places" className="action-btn">🗺 Browse Destinations</Link>
                <Link to="/services" className="action-btn">🔧 Our Services</Link>
                <Link to="/contact" className="action-btn">📞 Contact Us</Link>
                {isAdmin && <Link to="/admin" className="action-btn admin-action">⚙ Admin Dashboard</Link>}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="dash-card tips-card">
              <h3>✈ Travel Inspiration</h3>
              <div className="tips">
                {[
                  { img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300', title: 'Santorini, Greece', tag: 'Luxury' },
                  { img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300', title: 'Bali, Indonesia', tag: 'Cultural' },
                  { img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=300', title: 'Maldives', tag: 'Beach' },
                ].map((t, i) => (
                  <div key={i} className="tip-item">
                    <img src={t.img} alt={t.title} />
                    <div>
                      <strong>{t.title}</strong>
                      <span className="badge badge-green">{t.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/places" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>Explore All →</Link>
            </div>
          </div>

          <div className="dash-footer-actions">
            <button className="btn btn-outline" onClick={() => { logout(); navigate('/'); }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-overlay"></div>
      </div>
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-brand">
            <span>✈</span>
            <h2>WanderlustCo.</h2>
          </div>
          <h3>{isLogin ? 'Welcome back' : 'Join the adventure'}</h3>
          <p className="auth-sub">{isLogin ? 'Sign in to your account' : 'Create your free account'}</p>

          {error && <div className="auth-error">⚠ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            </div>
            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} required />
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-switch">
            <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>{isLogin ? 'Register' : 'Sign In'}</button>
          </div>
          <div className="auth-links">
            <Link to="/join">Join as Explorer →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
