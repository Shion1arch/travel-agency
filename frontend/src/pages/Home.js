import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';
import './Home.css';

const STATS = [
  { value: '50K+', label: 'Happy Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'WanderlustCo made our Bali trip unforgettable! Every detail was perfect.', rating: 5, avatar: 'P' },
  { name: 'Arjun Mehta', location: 'Delhi', text: 'The Serengeti safari exceeded all expectations. Truly a life-changing experience!', rating: 5, avatar: 'A' },
  { name: 'Sneha Patel', location: 'Bangalore', text: 'Professional, reliable, and incredibly knowledgeable. Will travel with them again!', rating: 5, avatar: 'S' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/places/featured').then(r => setFeatured(r.data)).catch(() => {});
    axios.get('/api/services').then(r => setServices(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/places?search=${search}`);
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-particles">
            {[...Array(6)].map((_, i) => <div key={i} className={`particle p${i+1}`}></div>)}
          </div>
        </div>
        <div className="container hero-content">
          <div className="hero-tag fade-in">🌍 Discover the World with Us</div>
          <h1 className="hero-title fade-in">
            Your Next <span>Adventure</span><br />Starts Here
          </h1>
          <p className="hero-subtitle fade-in">
            From hidden gems to iconic landmarks — we craft unforgettable journeys tailored just for you.
          </p>
          <form className="hero-search fade-in" onSubmit={handleSearch}>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-accent">Search</button>
            </div>
            <div className="search-tags">
              {['Bali', 'Maldives', 'Santorini', 'Safari', 'Peru'].map(t => (
                <button key={t} type="button" className="tag-btn" onClick={() => navigate(`/places?search=${t}`)}>{t}</button>
              ))}
            </div>
          </form>
          <div className="hero-ctas fade-in">
            <Link to="/places" className="btn btn-primary btn-lg">Explore Tours</Link>
            <Link to="/about" className="btn btn-outline btn-lg">Our Story</Link>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-dot"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLACES */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-tag">✈ Top Destinations</div>
              <h2 className="section-title">Featured <span>Tours & Places</span></h2>
              <p className="section-desc">Handpicked experiences loved by thousands of travelers</p>
            </div>
            <div className="grid-3">
              {featured.map(place => (
                <PlaceCard key={place._id} place={place} onBook={() => navigate('/places')} />
              ))}
            </div>
            <div className="section-cta">
              <Link to="/places" className="btn btn-primary btn-lg">View All Destinations →</Link>
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section className="section why-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-content">
              <div className="section-tag">🏆 Why Choose Us</div>
              <h2 className="section-title">Travel Smarter,<br /><span>Live Better</span></h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: 16 }}>
                With over 15 years of experience, we've helped thousands of travelers discover the world's most extraordinary destinations.
              </p>
              <div className="why-features">
                {[
                  { icon: '🛡️', title: 'Safe & Secure', desc: 'All trips are fully insured and supported 24/7' },
                  { icon: '💰', title: 'Best Price', desc: 'Guaranteed best rates with no hidden fees' },
                  { icon: '🎯', title: 'Personalized', desc: 'Custom itineraries built around your preferences' },
                  { icon: '⚡', title: 'Fast Booking', desc: 'Instant confirmation within minutes' },
                ].map((f, i) => (
                  <div key={i} className="why-feature">
                    <div className="why-icon">{f.icon}</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/services" className="btn btn-primary">Our Services →</Link>
            </div>
            <div className="why-visual">
              <div className="why-img-card main-img">
                <img src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=600" alt="Travel" />
              </div>
              <div className="why-img-card secondary-img">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" alt="Mountain" />
              </div>
              <div className="why-badge-float">
                <span>🌟</span>
                <div>
                  <strong>4.9/5 Rating</strong>
                  <span>50K+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      {services.length > 0 && (
        <section className="section services-preview">
          <div className="container">
            <div className="section-header">
              <div className="section-tag">🔧 What We Offer</div>
              <h2 className="section-title">Our <span>Services</span></h2>
              <p className="section-desc">Everything you need for your perfect trip, all in one place</p>
            </div>
            <div className="grid-3">
              {services.map(svc => (
                <div key={svc._id} className="service-preview-card">
                  <div className="svc-icon">{svc.icon}</div>
                  <h3>{svc.title}</h3>
                  <p>{svc.description}</p>
                  <div className="svc-price">{svc.price}</div>
                </div>
              ))}
            </div>
            <div className="section-cta">
              <Link to="/services" className="btn btn-outline btn-lg">See All Services →</Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">💬 Testimonials</div>
            <h2 className="section-title">What Our <span>Travelers Say</span></h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="test-stars">{'★'.repeat(t.rating)}</div>
                <p className="test-text">"{t.text}"</p>
                <div className="test-author">
                  <div className="test-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for Your Dream Trip?</h2>
            <p>Join thousands of happy travelers. Book today and save up to 30% on select packages.</p>
            <div className="cta-buttons">
              <Link to="/places" className="btn btn-accent btn-lg">Browse Destinations</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
