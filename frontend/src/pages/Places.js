import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';
import { formatCurrency, getPlaceBookingDetails } from '../data/placeBookingDetails';
import './Places.css';

const CATEGORIES = ['All', 'Adventure', 'Beach', 'Cultural', 'Wildlife', 'Luxury', 'Budget', 'Family'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' }
];

export default function Places() {
  const [searchParams] = useSearchParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const [bookModal, setBookModal] = useState(null);

  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    try {
      const params = { category, sort, page, limit: 9 };
      if (search) params.search = search;
      const { data } = await axios.get('/api/places', { params });
      setPlaces(data.places);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sort, page, search]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  useEffect(() => {
    if (!bookModal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setBookModal(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bookModal]);

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    fetchPlaces();
  };

  const selectedTripDetails = bookModal ? getPlaceBookingDetails(bookModal) : null;

  return (
    <div className="places-page">
      <div className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="page-hero-overlay"></div>
        <div className="container page-hero-content">
          <div className="section-tag">Explore the world</div>
          <h1>Places & <span>Tours</span></h1>
          <p>Discover extraordinary destinations curated just for you</p>
        </div>
      </div>

      <div className="container">
        <div className="places-toolbar">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{ width: 280 }}
            />
            <button type="submit" className="btn btn-primary btn-sm">Search</button>
            {search && (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearch('');
                  setPage(1);
                }}
              >
                Clear
              </button>
            )}
          </form>

          <div className="sort-wrap">
            <label htmlFor="places-sort">Sort by:</label>
            <select
              id="places-sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="category-menu">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              className={`cat-btn ${category === item ? 'active' : ''}`}
              onClick={() => handleCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="results-info">
          <span>{total} destination{total !== 1 ? 's' : ''} found</span>
          {(search || category !== 'All') && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearch('');
                setCategory('All');
                setSort('newest');
                setPage(1);
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : places.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">?</div>
            <h3>No destinations found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="places-grid">
            {places.map((place) => (
              <PlaceCard key={place._id} place={place} onBook={setBookModal} />
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="pagination">
            <button className="btn btn-outline btn-sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
              Prev
            </button>
            <div className="page-numbers">
              {[...Array(pages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-num ${page === index + 1 ? 'active' : ''}`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button className="btn btn-outline btn-sm" disabled={page === pages} onClick={() => setPage((value) => value + 1)}>
              Next
            </button>
          </div>
        )}
      </div>

      {bookModal && selectedTripDetails && (
        <div className="modal-overlay" onClick={() => setBookModal(null)}>
          <div
            className="modal modal-trip"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <button className="modal-close" onClick={() => setBookModal(null)} aria-label="Close trip details">x</button>

            <div className="modal-hero">
              <div className="modal-media">
                <img src={bookModal.image} alt={bookModal.name} className="modal-img" />
                <div className="modal-media-fade"></div>
                <div className="modal-media-chips">
                  <span>{bookModal.category}</span>
                  <span>{bookModal.duration}</span>
                  <span>{formatCurrency(bookModal.price)} / person</span>
                </div>
              </div>

              <div className="modal-body modal-summary">
                <span className="modal-eyebrow">Booking preview</span>
                <h2 id="booking-title">{bookModal.name}</h2>
                <p className="modal-location">{bookModal.location}, {bookModal.country}</p>
                <p className="modal-desc">{bookModal.description}</p>

                <div className="modal-details modal-details-expanded">
                  <div><span>Duration</span><strong>{bookModal.duration}</strong></div>
                  <div><span>Group size</span><strong>Max {bookModal.maxGroupSize}</strong></div>
                  <div><span>Rating</span><strong>{bookModal.rating} / 5</strong></div>
                  <div><span>Reviews</span><strong>{bookModal.reviews} verified</strong></div>
                </div>

                {bookModal.highlights?.length > 0 && (
                  <div className="trip-highlight-row">
                    {bookModal.highlights.map((highlight, index) => (
                      <span key={index} className="trip-highlight-pill">{highlight}</span>
                    ))}
                  </div>
                )}

                <div className="trip-price-banner">
                  <div>
                    <span className="trip-price-label">Starting from</span>
                    <strong>{formatCurrency(bookModal.price)}</strong>
                    <span className="trip-price-caption">per traveler</span>
                  </div>
                  <p className="trip-price-note">
                    Includes core arrangements, on-ground coordination, and the trip team shown below.
                  </p>
                </div>

                <div className="modal-actions">
                  <Link to="/contact" className="btn btn-primary btn-lg modal-book-btn">
                    Book This Trip
                  </Link>
                  <button className="btn btn-outline" onClick={() => setBookModal(null)}>Close</button>
                </div>
              </div>
            </div>

            <div className="trip-layout">
              <div className="trip-main">
                <section className="trip-panel">
                  <div className="trip-panel-head">
                    <span className="trip-section-tag">Trip essentials</span>
                    <h3>Everything your traveler needs before checkout</h3>
                  </div>
                  <div className="trip-facts-grid">
                    {selectedTripDetails.facts.map((fact, index) => (
                      <div key={index} className="trip-fact-card">
                        <span>{fact.label}</span>
                        <strong>{fact.value}</strong>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="trip-panel">
                  <div className="trip-panel-head">
                    <span className="trip-section-tag">Suggested flow</span>
                    <h3>How this tour usually unfolds</h3>
                  </div>
                  <div className="trip-timeline">
                    {selectedTripDetails.itinerary.map((item, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-label">{item.label}</div>
                        <div className="timeline-copy">
                          <h4>{item.title}</h4>
                          <p>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="trip-info-grid">
                  <section className="trip-panel">
                    <div className="trip-panel-head">
                      <span className="trip-section-tag">Included</span>
                      <h3>Covered in the package</h3>
                    </div>
                    <div className="trip-list">
                      {selectedTripDetails.included.map((item, index) => (
                        <div key={index} className="trip-list-item">{item}</div>
                      ))}
                    </div>
                  </section>

                  <section className="trip-panel">
                    <div className="trip-panel-head">
                      <span className="trip-section-tag">Plan separately</span>
                      <h3>Budget for these extras</h3>
                    </div>
                    <div className="trip-list trip-list-muted">
                      {selectedTripDetails.notIncluded.map((item, index) => (
                        <div key={index} className="trip-list-item">{item}</div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <aside className="trip-side">
                <section className="trip-panel budget-panel">
                  <div className="trip-panel-head">
                    <span className="trip-section-tag">Budget breakdown</span>
                    <h3>Where your trip price goes</h3>
                  </div>

                  <div className="budget-total">
                    <span>Total package</span>
                    <strong>{formatCurrency(bookModal.price)}</strong>
                    <small>per traveler</small>
                  </div>

                  <div className="budget-list">
                    {selectedTripDetails.budgetBreakdown.map((item, index) => (
                      <div key={index} className="budget-row">
                        <div>
                          <h4>{item.label}</h4>
                          <p>{item.note}</p>
                        </div>
                        <strong>{formatCurrency(item.amount)}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="budget-extra-note">
                    Keep around <strong>{formatCurrency(selectedTripDetails.extraBudget)}</strong> extra for personal spending and optional upgrades.
                  </div>
                </section>

                <section className="trip-panel">
                  <div className="trip-panel-head">
                    <span className="trip-section-tag">Assigned guides</span>
                    <h3>Your on-trip team</h3>
                  </div>

                  <div className="guide-list">
                    {selectedTripDetails.guides.map((guide, index) => (
                      <article key={index} className="guide-card">
                        <div className="guide-avatar">{guide.initials}</div>
                        <div className="guide-copy">
                          <div className="guide-topline">
                            <h4>{guide.name}</h4>
                            <span>{guide.rating}</span>
                          </div>
                          <p className="guide-role">{guide.title}</p>
                          <p className="guide-meta">{guide.experience}</p>
                          <p className="guide-meta">{guide.languages.join(' | ')}</p>
                          <p className="guide-bio">{guide.bio}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="trip-panel">
                  <div className="trip-panel-head">
                    <span className="trip-section-tag">Booking checkpoints</span>
                    <h3>What happens after you reserve</h3>
                  </div>

                  <div className="planning-list">
                    {selectedTripDetails.planning.items.map((item, index) => (
                      <div key={index} className="planning-item">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>

                  <p className="planning-note">{selectedTripDetails.planning.note}</p>
                </section>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
