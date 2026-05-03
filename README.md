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

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

### 1. Clone & Install

```bash
git clone <your-repo>
cd travel-agency

# Install all dependencies at once
npm run install-all
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/travel_agency
JWT_SECRET=your_super_secret_key_min_32_chars
NODE_ENV=development
```

### 3. Create Admin User

Start MongoDB, then run the backend once and register via the API:

```bash
# Option A: Use REST client (Postman / Thunder Client)
POST http://localhost:5000/api/auth/register
{
  "name": "Admin User",
  "email": "admin@wanderlustco.com",
  "password": "admin123"
}

# Then manually update the role in MongoDB:
# db.users.updateOne({ email: "admin@wanderlustco.com" }, { $set: { role: "admin" } })
```

### 4. Run Development Servers

```bash
# From root — starts both backend (port 5000) and frontend (port 3000)
npm run dev
```

Or separately:
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm start
```

### 5. Seed Sample Data

After logging in as admin, go to **Admin Dashboard** → Click **"Seed Sample Data"** button.

This creates:
- 6 sample destinations (Santorini, Bali, Serengeti, Machu Picchu, Maldives, Bangkok)
- 6 travel services

---

## 📄 Pages Overview

| Route | Page | Access |
|-------|------|--------|
| `/` | Home | Public |
| `/places` | Places & Tours | Public |
| `/services` | Services | Public |
| `/about` | About Us | Public |
| `/contact` | Contact Us | Public |
| `/join` | Join Us | Public |
| `/login` | Login / Dashboard | Public |
| `/admin` | Admin Dashboard | **Admin only** |

---

## 🔐 Admin Dashboard Features

The admin panel is **completely hidden** from regular users — the route `/admin` redirects non-admins away.

Admin can:
- 📊 View site stats (users, places, messages, services)
- 🗺 Manage destinations (toggle featured, delete)
- 👥 View and manage all users
- 📨 Read and update contact messages
- 🔧 View all services
- 🌱 Seed sample data with one click

---

## 🎨 Tech Stack & Key Features

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

---

## 🔌 API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |
| PUT | `/api/auth/profile` | Protected |

### Places
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/places` | Public |
| GET | `/api/places/featured` | Public |
| GET | `/api/places/:id` | Public |
| POST | `/api/places` | Admin |
| PUT | `/api/places/:id` | Admin |
| DELETE | `/api/places/:id` | Admin |

### Admin
| Method | Route | Access |
|--------|-------|--------|
| GET | `/api/admin/stats` | Admin |
| GET | `/api/admin/users` | Admin |
| PUT | `/api/admin/users/:id` | Admin |
| DELETE | `/api/admin/users/:id` | Admin |
| POST | `/api/admin/seed` | Admin |

---

## 🛠 Deployment

### MongoDB Atlas (Cloud)
1. Create cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGO_URI` in `.env`

### Render / Railway (Backend)
- Build command: `cd backend && npm install`
- Start command: `node backend/server.js`
- Add environment variables

### Vercel / Netlify (Frontend)
- Build command: `cd frontend && npm run build`
- Publish directory: `frontend/build`
- Add `REACT_APP_API_URL` if hosting separately

---

## 📝 License
MIT — Free to use and modify.

Built with ❤️ by WanderlustCo Team
