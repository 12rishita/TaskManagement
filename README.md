# TaskManagement

A complete MERN Stack Student Task Management System built as a professional academic/internship project. The app includes JWT authentication, protected task management, dashboard statistics, search/filter/sort controls, and a clean responsive React + Tailwind CSS interface.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Development fallback: Local JSON file storage when MongoDB is not configured or unavailable
- Authentication: JWT
- API Style: REST API

## Features

- User registration and login
- JWT-based protected routes
- Logout functionality
- Form validation and API error handling
- Dashboard with total, completed, pending, and completion percentage stats
- Recent tasks overview
- Create, edit, delete, complete, and reopen tasks
- Task title, description, due date, status, and priority
- Search by task title or description
- Filter by status and priority
- Sort by newest or oldest
- Profile page
- Unknown routes redirect to the dashboard view
- Fully responsive mobile, tablet, and desktop UI

## Project Structure

```text
student-task-manager/
  backend/
    src/
      middleware/
        auth.js
      models/
        Task.js
        User.js
      routes/
        authRoutes.js
        taskRoutes.js
      store/
        fileStore.js
      index.js
    .env
    .env.example
    package.json
  frontend/
    src/
      components/
        AppHeader.jsx
        StatsGrid.jsx
        TaskCard.jsx
        TaskFilters.jsx
        ui.jsx
      pages/
        AuthPage.jsx
        DashboardPage.jsx
        ProfilePage.jsx
        TasksPage.jsx
      api.js
      App.jsx
      constants.js
      main.jsx
      styles.css
    tailwind.config.js
    postcss.config.js
    package.json
```

## Backend API Routes

### Auth

- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login and receive a JWT
- `GET /api/auth/profile` - Get authenticated user profile

### Tasks

- `GET /api/tasks` - List tasks with optional filters:
  - `search`
  - `status=pending|completed`
  - `priority=low|medium|high`
  - `sort=newest|oldest`
- `GET /api/tasks/stats` - Get dashboard statistics
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Mark task completed or pending
- `DELETE /api/tasks/:id` - Delete task

### Utility

- `GET /api` - API information
- `GET /api/health` - Health check

## Environment Variables

Create `backend/.env`:

```env
PORT=5001
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174
JWT_SECRET=replace-with-a-long-random-secret
MONGO_URI=
```

Create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Leave `MONGO_URI` blank for local JSON-file storage, or set it to a MongoDB connection string to use MongoDB Atlas/local MongoDB.

## Run Locally

Install backend dependencies:

```bash
cd backend
npm install
npm run dev
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://127.0.0.1:5173
```

If port `5173` is already in use:

```bash
npm run dev -- --port 5174 --host 127.0.0.1
```

Backend:

```text
http://localhost:5001/api
```

## Notes

- The frontend uses hash routes such as `#/dashboard`, `#/tasks`, and `#/profile`.
- The backend uses MongoDB when connected, otherwise it falls back to `backend/data/db.json`.
- API requests require the JWT token for protected task and profile routes.

## Deployment

Use Render for the backend and Vercel for the frontend.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment instructions.
