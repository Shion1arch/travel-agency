import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-logo">
              <span>✈</span>
              <h3>Wanderlust<span>Co.</span></h3>
            </div>
            <p>Your trusted travel partner for extraordinary adventures around the globe. We craft journeys that create lifetime memories.</p>
            <div className="socials">
              {['𝕏','in','f','▶'].map((s, i) => (
                <a key={i} href="#" className="social-btn">{s}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/places">Places & Tours</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#">Flight Booking</a></li>
              <li><a href="#">Hotel Reservation</a></li>
              <li><a href="#">Tour Packages</a></li>
              <li><a href="#">Visa Assistance</a></li>
              <li><a href="#">Travel Insurance</a></li>
              <li><a href="#">Car Rental</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="contact-list">
              <li><span>📍</span> 123 Explorer Lane, Mumbai, India</li>
              <li><span>📞</span> +91 98765 43210</li>
              <li><span>✉️</span> hello@wanderlustco.com</li>
              <li><span>🕐</span> Mon–Sat: 9am – 7pm IST</li>
            </ul>
            <div className="newsletter">
              <input type="email" placeholder="Your email address" />
              <button className="btn btn-primary btn-sm">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} WanderlustCo. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
