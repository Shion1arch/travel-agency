import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const FAQ = [
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 4-6 weeks in advance for peak season travel. However, we can often arrange trips with as little as 1-2 weeks notice.' },
  { q: 'Do you offer payment plans?', a: 'Yes! We offer flexible payment options including EMI plans for packages above ₹50,000. A 20% deposit secures your booking.' },
  { q: 'What happens if I need to cancel?', a: 'Our flexible cancellation policy allows full refunds up to 30 days before departure. Please refer to specific tour terms for details.' },
  { q: 'Can you arrange custom itineraries?', a: 'Absolutely! Custom itineraries are our specialty. Contact us with your dream trip idea and we\'ll craft something perfect for you.' },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await axios.post('/api/contacts', form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="section-tag">📞 Get In Touch</div>
          <h1>Contact <span style={{ color: 'var(--primary-light)' }}>Us</span></h1>
          <p>We're here to help plan your perfect adventure</p>
        </div>
      </div>

      <div className="container">
        {/* Info Cards */}
        <div className="contact-info-cards">
          {[
            { icon: '📍', title: 'Our Office', lines: ['123 Explorer Lane', 'Mumbai, Maharashtra 400001'] },
            { icon: '📞', title: 'Phone', lines: ['+91 98765 43210', '+91 22 4567 8901'] },
            { icon: '✉️', title: 'Email', lines: ['hello@wanderlustco.com', 'support@wanderlustco.com'] },
            { icon: '🕐', title: 'Working Hours', lines: ['Mon – Sat: 9am – 7pm', 'Sunday: 10am – 4pm'] },
          ].map((card, i) => (
            <div key={i} className="info-card">
              <div className="info-card-icon">{card.icon}</div>
              <div>
                <h4>{card.title}</h4>
                {card.lines.map((l, j) => <p key={j}>{l}</p>)}
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="contact-main">
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <p>Fill out the form and our team will get back to you within 24 hours.</p>

            {success && (
              <div className="form-success">
                <span>✅</span>
                <div>
                  <strong>Message sent successfully!</strong>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {error && <div className="auth-error">⚠ {error}</div>}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a subject</option>
                    <option>Tour Enquiry</option>
                    <option>Custom Itinerary</option>
                    <option>Booking Assistance</option>
                    <option>Visa & Documents</option>
                    <option>Cancellation / Refund</option>
                    <option>General Query</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Your Message *</label>
                <textarea name="message" rows="5" placeholder="Tell us about your dream destination, travel dates, group size, and any special requirements..." value={form.message} onChange={handleChange} required style={{ resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Sending...' : '✉ Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-sidebar">
            {/* Map Placeholder */}
            <div className="map-placeholder">
              <div className="map-pin">📍</div>
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9853!2d72.8697!3d18.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU4JzAwLjAiTiA3MsKwNTInMTAuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="260" style={{ border: 0, borderRadius: '12px' }} allowFullScreen loading="lazy"
              ></iframe>
            </div>

            {/* Social Links */}
            <div className="sidebar-card">
              <h4>Follow Our Adventures</h4>
              <div className="social-links">
                {[
                  { icon: '𝕏', name: 'Twitter / X', handle: '@wanderlustco' },
                  { icon: '📸', name: 'Instagram', handle: '@wanderlustco.travel' },
                  { icon: '💼', name: 'LinkedIn', handle: 'WanderlustCo' },
                  { icon: '▶', name: 'YouTube', handle: 'WanderlustCo Travels' },
                ].map((s, i) => (
                  <a key={i} href="#" className="social-link-item">
                    <div className="s-icon">{s.icon}</div>
                    <div>
                      <strong>{s.name}</strong>
                      <span>{s.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <div className="section-header">
            <div className="section-tag">❓ FAQ</div>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          </div>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-arrow">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
