import React from 'react';
import './PlaceCard.css';

export default function PlaceCard({ place, onBook }) {
  const stars = (rating) => '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');

  return (
    <div className="place-card">
      <div className="place-img-wrap">
        <img src={place.image} alt={place.name} loading="lazy" />
        <div className="place-overlay"></div>
        <span className="place-category">{place.category}</span>
        {place.isFeatured && <span className="place-featured">⭐ Featured</span>}
        <div className="place-duration-badge">⏱ {place.duration}</div>
      </div>

      <div className="place-body">
        <div className="place-location">
          <span className="loc-icon">📍</span>
          <span>{place.location}, {place.country}</span>
        </div>
        <h3 className="place-name">{place.name}</h3>
        <p className="place-desc">{place.shortDesc}</p>

        <div className="place-meta">
          <div className="place-rating">
            <span className="stars">{stars(place.rating)}</span>
            <span className="rating-val">{place.rating}</span>
            <span className="rating-count">({place.reviews})</span>
          </div>
          <div className="place-group">
            <span>👥</span>
            <span>Max {place.maxGroupSize}</span>
          </div>
        </div>

        {place.highlights && place.highlights.length > 0 && (
          <div className="place-highlights">
            {place.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="highlight-tag">✓ {h}</span>
            ))}
          </div>
        )}

        <div className="place-footer">
          <div className="place-price">
            <span className="price-from">From</span>
            <span className="price-amount">${place.price.toLocaleString()}</span>
            <span className="price-per">/ person</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => onBook && onBook(place)}>
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}
