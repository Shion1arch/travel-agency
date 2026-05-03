import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/services')
      .then(r => setServices(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fallback = [
    { _id: 1, title: 'Flight Booking', icon: '✈️', description: 'Best deals on flights worldwide with 24/7 support and flexible booking options.', features: ['Best price guarantee', 'Flexible booking', '24/7 support', 'Group discounts'], price: 'From $29' },
    { _id: 2, title: 'Hotel Reservation', icon: '🏨', description: 'Handpicked hotels from budget to luxury across 200,000+ properties worldwide.', features: ['200,000+ hotels', 'Free cancellation', 'Instant confirmation', 'Loyalty rewards'], price: 'From $0 fee' },
    { _id: 3, title: 'Tour Packages', icon: '🗺️', description: 'All-inclusive tour packages to top destinations with expert local guides.', features: ['Expert guides', 'All-inclusive', 'Small groups', 'Custom itineraries'], price: 'From $499' },
    { _id: 4, title: 'Visa Assistance', icon: '📋', description: 'Hassle-free visa processing for any destination in the world.', features: ['100+ countries', 'Fast processing', 'Expert advice', 'Application support'], price: 'From $49' },
    { _id: 5, title: 'Travel Insurance', icon: '🛡️', description: 'Comprehensive coverage for worry-free travel with 24/7 emergency support.', features: ['Medical coverage', 'Trip cancellation', 'Lost luggage', 'Emergency support'], price: 'From $15' },
    { _id: 6, title: 'Car Rental', icon: '🚗', description: 'Wide selection of vehicles at every destination with no hidden fees.', features: ['No hidden fees', 'GPS included', 'Unlimited mileage', 'Road assistance'], price: 'From $25/day' },
  ];

  const displayServices = services.length > 0 ? services : fallback;

  return (
    <div className="services-page">
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="section-tag">🔧 What We Offer</div>
          <h1>Our <span style={{ color: 'var(--primary-light)' }}>Services</span></h1>
          <p>Everything you need for the perfect journey, all in one place</p>
        </div>
      </div>

      <div className="container">
        {/* Services Grid */}
        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : (
          <div className="services-grid">
            {displayServices.map((svc, i) => (
              <div key={svc._id} className="service-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="svc-card-icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                {svc.features && (
                  <ul className="svc-features">
                    {svc.features.map((f, idx) => (
                      <li key={idx}><span className="check">✓</span>{f}</li>
                    ))}
                  </ul>
                )}
                <div className="svc-footer">
                  <span className="svc-price-tag">{svc.price}</span>
                  <Link to="/contact" className="btn btn-primary btn-sm">Get Quote</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Process Section */}
        <div className="process-section">
          <div className="section-header">
            <div className="section-tag">🔄 How It Works</div>
            <h2 className="section-title">Book Your Trip in <span>4 Easy Steps</span></h2>
          </div>
          <div className="process-steps">
            {[
              { step: '01', icon: '🔍', title: 'Choose Destination', desc: 'Browse our curated list of amazing destinations worldwide' },
              { step: '02', icon: '📅', title: 'Pick Your Dates', desc: 'Select your preferred travel dates and trip duration' },
              { step: '03', icon: '💳', title: 'Book & Pay', desc: 'Secure your booking with our safe payment system' },
              { step: '04', icon: '✈️', title: 'Enjoy Your Trip', desc: 'Pack your bags and get ready for an amazing adventure' },
            ].map((s, i) => (
              <div key={i} className="process-step">
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                {i < 3 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="packages-section">
          <div className="section-header">
            <div className="section-tag">💼 Travel Plans</div>
            <h2 className="section-title">Choose Your <span>Package</span></h2>
          </div>
          <div className="packages-grid">
            {[
              { name: 'Starter', price: '$299', per: '/trip', color: 'var(--surface-2)', features: ['2 destinations', 'Economy flights', '3-star hotels', 'Basic transfers', 'Email support'], cta: 'Get Started', accent: false },
              { name: 'Explorer', price: '$899', per: '/trip', color: 'var(--primary)', features: ['5 destinations', 'Business class option', '4-star hotels', 'Private transfers', '24/7 phone support', 'Travel insurance', 'Guided tours'], cta: 'Most Popular', accent: true },
              { name: 'Elite', price: '$2,499', per: '/trip', color: 'var(--surface-2)', features: ['Unlimited destinations', 'Business class flights', '5-star luxury hotels', 'VIP transfers', 'Personal travel manager', 'Full insurance', 'Private tours', 'Spa & dining credits'], cta: 'Go Premium', accent: false },
            ].map((pkg, i) => (
              <div key={i} className={`pkg-card ${pkg.accent ? 'featured-pkg' : ''}`}>
                {pkg.accent && <div className="pkg-badge">⭐ Most Popular</div>}
                <h3>{pkg.name}</h3>
                <div className="pkg-price">
                  <span>{pkg.price}</span>
                  <small>{pkg.per}</small>
                </div>
                <ul className="pkg-features">
                  {pkg.features.map((f, j) => <li key={j}><span>✓</span>{f}</li>)}
                </ul>
                <Link to="/contact" className={`btn ${pkg.accent ? 'btn-accent' : 'btn-outline'} w-full`} style={{ justifyContent: 'center', width: '100%' }}>
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
