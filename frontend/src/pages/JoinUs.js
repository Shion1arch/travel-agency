import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './JoinUs.css';

const PERKS = [
  { icon: '🎁', title: 'Exclusive Deals', desc: 'Members-only discounts up to 30% off on all tours' },
  { icon: '⭐', title: 'Priority Booking', desc: 'First access to new destinations and limited spots' },
  { icon: '🗺️', title: 'Trip Planning', desc: 'Free personalized itinerary from our expert planners' },
  { icon: '📱', title: 'Travel App', desc: 'Access our mobile app for real-time trip updates' },
  { icon: '🌐', title: 'Global Network', desc: 'Connect with 50,000+ fellow travel enthusiasts' },
  { icon: '🛡️', title: 'Travel Insurance', desc: 'Complimentary basic travel insurance on first trip' },
];

export default function JoinUs() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return setError('Please fill in all fields');
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true); setError('');
    try {
      await register({ name: form.name, email: form.email, password: form.password, phone: form.phone });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-page">
      <div className="join-left">
        <div className="join-left-content">
          <div className="join-brand">
            <span>✈</span>
            <h2>WanderlustCo.</h2>
          </div>
          <h1>Join Our <span>Explorer</span> Community</h1>
          <p>Create your free account and unlock a world of travel privileges, exclusive deals, and personalized adventures.</p>

          <div className="perks-grid">
            {PERKS.map((perk, i) => (
              <div key={i} className="perk-item">
                <div className="perk-icon">{perk.icon}</div>
                <div>
                  <strong>{perk.title}</strong>
                  <span>{perk.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="join-testimonial">
            <div className="test-avatar-join">P</div>
            <div>
              <p>"WanderlustCo turned my bucket list into reality. Best decision ever!"</p>
              <strong>— Priya S., Mumbai</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="join-right">
        <div className="join-form-wrap">
          {/* Steps indicator */}
          <div className="steps-indicator">
            <div className={`step-dot ${step >= 1 ? 'done' : ''}`}>1</div>
            <div className={`step-line ${step >= 2 ? 'done' : ''}`}></div>
            <div className={`step-dot ${step >= 2 ? 'done' : ''}`}>2</div>
          </div>
          <p className="step-label">{step === 1 ? 'Basic Info' : 'Set Password'}</p>

          <h3>{step === 1 ? 'Create Your Account' : 'Secure Your Account'}</h3>
          <p className="join-sub">{step === 1 ? 'Tell us a bit about yourself' : 'Choose a strong password'}</p>

          {error && <div className="auth-error">⚠ {error}</div>}

          {step === 1 && (
            <form onSubmit={handleStep1}>
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Continue →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Password *</label>
                <input name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Confirm Password *</label>
                <input name="confirmPassword" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={handleChange} required />
              </div>
              {form.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div className={`strength-fill ${form.password.length >= 8 ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak'}`}
                      style={{ width: `${Math.min(100, form.password.length * 12)}%` }}></div>
                  </div>
                  <span>{form.password.length >= 8 ? '💪 Strong' : form.password.length >= 6 ? '👍 Medium' : '⚠ Weak'}</span>
                </div>
              )}
              <div className="terms-check">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Creating Account...' : '🚀 Join WanderlustCo'}
                </button>
              </div>
            </form>
          )}

          <p className="join-login">Already have an account? <a href="/login">Sign in →</a></p>
        </div>
      </div>
    </div>
  );
}
