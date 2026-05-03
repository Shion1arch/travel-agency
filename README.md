# ✈ WanderlustCo — MERN Travel Agency Website

A full-stack travel agency web application built with the **MERN stack** (MongoDB, Express, React, Node.js). Features a beautiful dark-themed UI with interactive destination cards, admin dashboard, and complete user management.

---

## 🗂 Project Structure

```
travel-agency/
├── backend/                  # Express + MongoDB API
│   ├── models/
│   │   ├── User.js           # User schema (role: user | admin)
│   │   ├── Place.js          # Destination/Tour schema
│   │   ├── Service.js        # Services schema
│   │   └── Contact.js        # Contact messages schema
│   ├── routes/
│   │   ├── auth.js           # Register, Login, Profile
│   │   ├── places.js         # CRUD for destinations
│   │   ├── services.js       # CRUD for services
│   │   ├── contacts.js       # Contact form & admin view
│   │   └── admin.js          # Admin stats, user management, seed
│   ├── middleware/
│   │   └── auth.js           # JWT protect + adminOnly guards
│   ├── server.js             # Express app entry point
│   └── .env.example          # Environment variable template
│
└── frontend/                 # React SPA
    └── src/
        ├── context/
        │   └── AuthContext.js  # Global auth state (JWT + role)
        ├── components/
        │   ├── Navbar.js/.css  # Responsive navbar with user menu
        │   ├── Footer.js/.css  # Footer with newsletter
        │   └── PlaceCard.js/.css # Destination card component
        └── pages/
            ├── Home.js/.css          # Landing + featured + stats
            ├── Places.js/.css        # All tours with filter menu bar
            ├── Services.js/.css      # Services + packages + process
            ├── LoginDashboard.js/.css # Auth + user dashboard
            ├── AdminDashboard.js/.css # Admin-only panel (hidden from users)
            ├── AboutUs.js/.css        # Team + values + timeline
            ├── ContactUs.js/.css      # Contact form + FAQ
            └── JoinUs.js/.css         # Multi-step registration
```



### Backend
- **Express.js** — REST API
- **Mongoose** — MongoDB ODM
- **JWT** — Stateless authentication
- **bcryptjs** — Password hashing
- **Role-based access** — `user` and `admin` roles

### Frontend
- **React 18** — Component-based UI
- **React Router v6** — Client-side routing
- **Axios** — HTTP client
- **Context API** — Global auth state
- **Google Fonts** — Playfair Display + DM Sans

### Design Features
- 🌑 Dark theme with green & gold accent palette
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎠 Animated hero with particle effects
- 🃏 Interactive place cards with modal detail view
- 🗂 Category filter menu bar for tours
- 📊 Admin data tables with action buttons
- 💬 Accordion FAQ component
- ⏱ Multi-step registration form
- 🔔 Toast notifications

