import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const TABS = ['Overview', 'Places', 'Users', 'Messages', 'Services'];
const PLACE_CATEGORIES = ['Adventure', 'Beach', 'Cultural', 'Wildlife', 'Luxury', 'Budget', 'Family'];
const EMPTY_PLACE_FORM = { category: 'Adventure', price: '' };

export default function AdminDashboard() {
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [placeDraft, setPlaceDraft] = useState(EMPTY_PLACE_FORM);
  const [savingPlaceId, setSavingPlaceId] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/stats');
      setStats(data);
    } catch (e) { } finally { setLoading(false); }
  };

  const loadPlaces = async () => {
    if (places.length) return;
    const { data } = await axios.get('/api/places');
    setPlaces(data.places);
  };

  const loadUsers = async () => {
    if (users.length) return;
    const { data } = await axios.get('/api/admin/users');
    setUsers(data);
  };

  const loadContacts = async () => {
    if (contacts.length) return;
    const { data } = await axios.get('/api/contacts');
    setContacts(data);
  };

  const loadServices = async () => {
    if (services.length) return;
    const { data } = await axios.get('/api/services');
    setServices(data);
  };

  const handleTab = (t) => {
    setTab(t);
    if (t === 'Places') loadPlaces();
    if (t === 'Users') loadUsers();
    if (t === 'Messages') loadContacts();
    if (t === 'Services') loadServices();
  };

  const seedData = async () => {
    try {
      await axios.post('/api/admin/seed');
      showToast('✅ Sample data seeded successfully!');
      setPlaces([]); setServices([]);
      loadStats();
    } catch (e) { showToast('❌ Failed to seed data'); }
  };

  const deletePlace = async (id) => {
    if (!window.confirm('Delete this destination?')) return;
    await axios.delete(`/api/places/${id}`);
    setPlaces(places.filter(p => p._id !== id));
    showToast('✅ Destination deleted');
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await axios.delete(`/api/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
    showToast('✅ User deleted');
  };

  const markContact = async (id, status) => {
    await axios.put(`/api/contacts/${id}`, { status });
    setContacts(contacts.map(c => c._id === id ? { ...c, status } : c));
    showToast('✅ Status updated');
  };

  const toggleFeatured = async (place) => {
    const { data } = await axios.put(`/api/places/${place._id}`, { isFeatured: !place.isFeatured });
    setPlaces(places.map(p => p._id === data._id ? data : p));
    showToast('✅ Featured status updated');
  };

  const startPlaceEdit = (place) => {
    setEditingPlaceId(place._id);
    setPlaceDraft({
      category: place.category,
      price: String(place.price)
    });
  };

  const cancelPlaceEdit = () => {
    setEditingPlaceId(null);
    setPlaceDraft(EMPTY_PLACE_FORM);
  };

  const handlePlaceDraftChange = (e) => {
    const { name, value } = e.target;
    setPlaceDraft(prev => ({ ...prev, [name]: value }));
  };

  const savePlaceEdit = async (placeId) => {
    const nextPrice = Number(placeDraft.price);

    if (!placeDraft.category || !Number.isFinite(nextPrice) || nextPrice < 0) {
      showToast('Please enter a valid category and price');
      return;
    }

    try {
      setSavingPlaceId(placeId);
      const { data } = await axios.put(`/api/places/${placeId}`, {
        category: placeDraft.category,
        price: nextPrice
      });

      setPlaces(prev => prev.map(place => place._id === data._id ? data : place));
      cancelPlaceEdit();
      showToast('Place details updated');
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed to update place');
    } finally {
      setSavingPlaceId('');
    }
  };

  if (loading) return <div className="loading-spinner" style={{ marginTop: 120 }}><div className="spinner"></div></div>;

  return (
    <div className="admin-page">
      {toast && <div className="toast toast-success">{toast}</div>}

      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div>
              <div className="admin-badge-title">⚙ Admin Dashboard</div>
              <h1>Control Panel</h1>
              <p>Manage your travel agency content and users</p>
            </div>
            <button className="btn btn-accent" onClick={seedData}>🌱 Seed Sample Data</button>
          </div>

          <div className="admin-tabs">
            {TABS.map(t => (
              <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => handleTab(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container admin-content">
        {/* OVERVIEW */}
        {tab === 'Overview' && stats && (
          <div className="overview-section">
            <div className="stat-cards">
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'blue' },
                { label: 'Destinations', value: stats.totalPlaces, icon: '🗺', color: 'green' },
                { label: 'Messages', value: stats.totalContacts, icon: '📨', color: 'yellow' },
                { label: 'Unread', value: stats.unreadContacts, icon: '🔔', color: 'red' },
              ].map((s, i) => (
                <div key={i} className={`stat-card ${s.color}`}>
                  <div className="stat-card-icon">{s.icon}</div>
                  <div>
                    <div className="stat-card-value">{s.value}</div>
                    <div className="stat-card-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="overview-grid">
              <div className="admin-card">
                <h3>Recent Users</h3>
                <div className="simple-list">
                  {stats.recentUsers?.map(u => (
                    <div key={u._id} className="list-item">
                      <div className="list-avatar">{u.name[0]}</div>
                      <div><strong>{u.name}</strong><span>{u.email}</span></div>
                      <span className={`badge ${u.role === 'admin' ? 'badge-yellow' : 'badge-green'}`}>{u.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="admin-card">
                <h3>Recent Messages</h3>
                <div className="simple-list">
                  {stats.recentContacts?.map(c => (
                    <div key={c._id} className="list-item">
                      <div className="list-avatar" style={{ background: 'rgba(232,168,32,0.2)', color: 'var(--accent)' }}>✉</div>
                      <div><strong>{c.name}</strong><span>{c.subject}</span></div>
                      <span className={`badge ${c.status === 'unread' ? 'badge-red' : 'badge-green'}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PLACES */}
        {tab === 'Places' && (
          <div className="admin-card">
            <div className="card-header">
              <h3>Destinations ({places.length})</h3>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Destination</th><th>Category</th><th>Price</th><th>Rating</th><th>Featured</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {places.map(p => {
                    const isEditing = editingPlaceId === p._id;
                    const isSaving = savingPlaceId === p._id;

                    return (
                      <tr key={p._id}>
                      <td>
                        <div className="table-dest">
                          <img src={p.image} alt={p.name} />
                          <div><strong>{p.name}</strong><span>{p.location}, {p.country}</span></div>
                        </div>
                      </td>
                      <td>
                        {isEditing ? (
                          <div className="table-edit-cell">
                            <label className="table-edit-label" htmlFor={`place-category-${p._id}`}>Category</label>
                            <select
                              id={`place-category-${p._id}`}
                              name="category"
                              className="admin-inline-control"
                              value={placeDraft.category}
                              onChange={handlePlaceDraftChange}
                              disabled={isSaving}
                            >
                              {PLACE_CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <span className="badge badge-green">{p.category}</span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <div className="table-edit-cell">
                            <label className="table-edit-label" htmlFor={`place-price-${p._id}`}>Price</label>
                            <div className="price-input-wrap">
                              <span>$</span>
                              <input
                                id={`place-price-${p._id}`}
                                name="price"
                                type="number"
                                min="0"
                                step="1"
                                className="admin-inline-control admin-inline-input"
                                value={placeDraft.price}
                                onChange={handlePlaceDraftChange}
                                disabled={isSaving}
                              />
                            </div>
                          </div>
                        ) : (
                          <strong className="table-price">${p.price.toLocaleString()}</strong>
                        )}
                      </td>
                      <td>{p.rating}</td>
                      <td>
                        <button
                          className={`toggle-btn ${p.isFeatured ? 'on' : 'off'}`}
                          onClick={() => toggleFeatured(p)}
                          disabled={isSaving}
                        >
                          {p.isFeatured ? 'Yes' : 'No'}
                        </button>
                      </td>
                      <td>
                        <div className="action-btns place-action-btns">
                          {isEditing ? (
                            <>
                              <button className="icon-btn" onClick={() => savePlaceEdit(p._id)} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save'}
                              </button>
                              <button className="icon-btn" onClick={cancelPlaceEdit} disabled={isSaving}>
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button className="icon-btn" onClick={() => startPlaceEdit(p)} title="Edit category and price">
                              Edit
                            </button>
                          )}
                          <button className="icon-btn danger" onClick={() => deletePlace(p._id)} title="Delete" disabled={isSaving}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'Users' && (
          <div className="admin-card">
            <div className="card-header"><h3>All Users ({users.length})</h3></div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div className="table-user">
                          <div className="table-avatar">{u.name[0]}</div>
                          <strong>{u.name}</strong>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{u.email}</td>
                      <td><span className={`badge ${u.role === 'admin' ? 'badge-yellow' : 'badge-green'}`}>{u.role}</span></td>
                      <td><span className={`badge ${u.isActive ? 'badge-green' : 'badge-red'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                      <td>
                        <div className="action-btns">
                          <button className="icon-btn danger" onClick={() => deleteUser(u._id)}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'Messages' && (
          <div className="admin-card">
            <div className="card-header"><h3>Contact Messages ({contacts.length})</h3></div>
            <div className="messages-list">
              {contacts.map(c => (
                <div key={c._id} className={`message-item ${c.status === 'unread' ? 'unread' : ''}`}>
                  <div className="msg-header">
                    <div>
                      <strong>{c.name}</strong>
                      <span>{c.email}</span>
                      {c.phone && <span>📞 {c.phone}</span>}
                    </div>
                    <div className="msg-meta">
                      <span className={`badge ${c.status === 'unread' ? 'badge-red' : c.status === 'replied' ? 'badge-green' : 'badge-yellow'}`}>{c.status}</span>
                      <span className="msg-date">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="msg-subject"><strong>Subject:</strong> {c.subject}</div>
                  <p className="msg-body">{c.message}</p>
                  <div className="msg-actions">
                    {c.status === 'unread' && <button className="btn btn-primary btn-sm" onClick={() => markContact(c._id, 'read')}>Mark as Read</button>}
                    {c.status !== 'replied' && <button className="btn btn-outline btn-sm" onClick={() => markContact(c._id, 'replied')}>Mark as Replied</button>}
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No messages yet</div>}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {tab === 'Services' && (
          <div className="admin-card">
            <div className="card-header"><h3>Services ({services.length})</h3></div>
            <div className="services-admin-grid">
              {services.map(s => (
                <div key={s._id} className="service-admin-card">
                  <div className="svc-admin-top">
                    <span className="svc-admin-icon">{s.icon}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <span>{s.price}</span>
                    </div>
                  </div>
                  <p>{s.description}</p>
                  <div className="svc-admin-features">
                    {s.features?.map((f, i) => <span key={i} className="badge badge-green">{f}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
