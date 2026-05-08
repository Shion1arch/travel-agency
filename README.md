# WanderlustCo Travel Agency

A full-stack MERN travel agency application with a React frontend and an Express + MongoDB backend.

## Project Structure

```text
travel-agency/
|-- backend/                  # Express + MongoDB API
|   |-- middleware/           # Auth and admin guards
|   |-- models/               # Mongoose models
|   |-- routes/               # API routes
|   |-- server.js             # Express app entry point
|   `-- .env.example          # Backend environment template
`-- frontend/                 # React SPA
    `-- src/
        |-- components/       # Shared UI components
        |-- context/          # Global auth state
        `-- pages/            # Route-level pages
```

## Stack

### Backend
- Express.js
- Mongoose
- JSON Web Tokens
- bcryptjs
- Role-based access control

### Frontend
- React 18
- React Router v6
- Axios
- Context API

## Deployment Notes

### Backend on Render
- Use `cd backend && npm start` or `cd backend && yarn start` as the start command.
- Avoid running `install` in the start command. Let Render install dependencies during the build step.
- Set `MONGO_URI`, `JWT_SECRET`, and `CORS_ORIGINS` in the Render environment before deploying.
- Render injects `PORT` automatically, so you do not need to hardcode it in the dashboard.
- Check `GET /api/health` after deploy. The backend now binds its HTTP port immediately and reports config or database readiness there.
