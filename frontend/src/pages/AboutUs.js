import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const TEAM = [
  { name: 'Rohan Kapoor', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', bio: '15+ years in travel industry' },
  { name: 'Meera Sharma', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', bio: 'Expert in luxury travel experiences' },
  { name: 'Aryan Patel', role: 'Lead Travel Designer', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', bio: 'Crafts bespoke itineraries' },
  { name: 'Ananya Singh', role: 'Customer Experience', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', bio: '24/7 traveler support specialist' },
];

const VALUES = [
  { icon: '🌍', title: 'Global Reach', desc: 'Operating in 120+ countries with trusted local partners everywhere you want to go.' },
  { icon: '❤️', title: 'Passion for Travel', desc: 'Every team member is a passionate traveler who understands what makes a trip truly special.' },
  { icon: '🤝', title: 'Trust & Integrity', desc: 'We believe in transparent pricing, honest advice, and keeping every promise we make.' },
  { icon: '🌱', title: 'Sustainable Travel', desc: 'Committed to responsible tourism that benefits local communities and protects the environment.' },
  { icon: '⭐', title: 'Excellence', desc: 'We settle for nothing less than exceptional in every detail of your travel experience.' },
  { icon: '🛡️', title: 'Your Safety First', desc: 'Comprehensive safety protocols and 24/7 emergency support for complete peace of mind.' },
];

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg">
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container about-hero-content">
          <div className="section-tag">🌍 Our Story</div>
          <h1>We Live to <span>Travel,</span><br />We Travel to <span>Live</span></h1>
          <p>Since 2008, WanderlustCo has been turning travel dreams into extraordinary realities for thousands of adventurers worldwide.</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32 }}>
            <Link to="/places" className="btn btn-primary btn-lg">Explore Destinations</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Get in Touch</Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Mission */}
        <div className="mission-section">
          <div className="mission-grid">
            <div className="mission-images">
              <div className="mission-img main">
                <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700" alt="travel" />
              </div>
              <div className="mission-img side">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" alt="mountain" />
              </div>
              <div className="mission-stat-bubble">
                <div className="bubble-num">15+</div>
                <div className="bubble-label">Years of Excellence</div>
              </div>
            </div>
            <div className="mission-text">
              <div className="section-tag">✨ Our Mission</div>
              <h2 className="section-title">Making Every Journey <span>Unforgettable</span></h2>
              <p>At WanderlustCo, we believe travel is not just about reaching a destination — it's about the transformative experiences along the way. We've spent over 15 years perfecting the art of crafting journeys that resonate deeply with every traveler's soul.</p>
              <p style={{ marginTop: 16, color: 'var(--text-muted)', lineHeight: 1.8 }}>From solo adventures to family holidays, luxury escapes to budget explorations, we tailor every experience to reflect your unique personality and travel style.</p>
              <div className="mission-stats">
                {[['50K+', 'Happy Travelers'], ['120+', 'Destinations'], ['15+', 'Years'], ['98%', 'Satisfaction']].map(([val, lbl], i) => (
                  <div key={i} className="mini-stat">
                    <strong>{val}</strong>
                    <span>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="section">
          <div className="section-header">
            <div className="section-tag">💎 What We Stand For</div>
            <h2 className="section-title">Our Core <span>Values</span></h2>
            <p className="section-desc">The principles that guide every decision we make and every journey we craft</p>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="section">
          <div className="section-header">
            <div className="section-tag">👥 Meet the Team</div>
            <h2 className="section-title">The People Behind <span>Your Adventures</span></h2>
            <p className="section-desc">Passionate travelers who dedicate their expertise to make your dreams come true</p>
          </div>
          <div className="team-grid">
            {TEAM.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-img">
                  <img src={member.img} alt={member.name} />
                  <div className="team-overlay">
                    <div className="team-socials">
                      {['𝕏', 'in'].map((s, j) => <a key={j} href="#" className="t-social">{s}</a>)}
                    </div>
                  </div>
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="section timeline-section">
          <div className="section-header">
            <div className="section-tag">📅 Our Journey</div>
            <h2 className="section-title">Growing Together <span>Over the Years</span></h2>
          </div>
          <div className="timeline">
            {[
              { year: '2008', title: 'The Beginning', desc: 'Founded in Mumbai with a dream to make travel accessible to everyone' },
              { year: '2012', title: 'Going Global', desc: 'Expanded operations to 30+ countries with a network of 200+ local partners' },
              { year: '2016', title: 'Digital Revolution', desc: 'Launched our innovative online booking platform serving 10,000+ monthly users' },
              { year: '2020', title: 'Resilience & Growth', desc: 'Pivoted to virtual travel experiences during the pandemic, emerging stronger' },
              { year: '2024', title: 'New Horizons', desc: 'Celebrating 50,000+ happy travelers and expanding to 120+ destinations worldwide' },
            ].map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="tl-content">
                  <div className="tl-year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="tl-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Write Your Story?</h2>
          <p>Join thousands of adventurers who've trusted WanderlustCo to deliver extraordinary travel experiences.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            <Link to="/join" className="btn btn-accent btn-lg">Join Our Community</Link>
            <Link to="/places" className="btn btn-outline btn-lg">Explore Destinations</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
