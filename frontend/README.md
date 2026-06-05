# Student Dashboard Frontend

A clean and responsive React frontend for a MERN Stack Student Task Management System. This project is designed as a practical academic/internship project where students can manage assignments, deadlines, priorities, and daily study tasks from one dashboard.

## Live Project

- Frontend: https://student-dasboard-frontend.vercel.app
- Backend API: https://syncboard-backend-li7e.onrender.com/api

## Project Overview

The frontend provides a simple, professional, and recruiter-friendly interface for a student task manager. It includes authentication screens, protected dashboard routes, task management screens, profile view, dark mode, filters, sorting, and responsive layouts for mobile, tablet, and desktop.

The UI intentionally avoids overly flashy effects and focuses on usability, spacing, readable typography, and a realistic college-project presentation.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- JavaScript
- REST API integration
- JWT-based authentication flow
- Vercel deployment

## Features

- User login and registration screens
- JWT token storage and protected routes
- Dashboard with task statistics
- Total, completed, pending, and completion percentage cards
- Create, edit, delete, complete, and reopen tasks
- Task title, description, due date, status, and priority
- Search tasks by title or description
- Filter tasks by status and priority
- Sort tasks by newest or oldest
- Profile page with account and progress summary
- Dark mode toggle
- Responsive navigation
- Empty states, loading states, and API error messages
- Unknown routes redirect to the correct app view instead of showing a broken page

## Folder Structure

```text
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
  index.html
  package.json
  tailwind.config.js
  postcss.config.js
  vercel.json
```

## Environment Variables

Create a `.env.local` file in the frontend folder:

```env
VITE_API_BASE_URL=https://syncboard-backend-li7e.onrender.com/api
```

For local backend development, use:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://127.0.0.1:5173
```

Build for production:

```bash
npm run build
```

## Deployment

This frontend is configured for Vercel deployment.

Recommended Vercel settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Environment Variable:
VITE_API_BASE_URL=https://syncboard-backend-li7e.onrender.com/api
```

The `vercel.json` file includes a rewrite rule so the single-page app works correctly after refresh.

## Backend Repository

Backend GitHub repository:

```text
https://github.com/12rishita/SyncBoard_backend
```

## API Endpoints Used

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/tasks`
- `GET /api/tasks/stats`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/toggle`
- `DELETE /api/tasks/:id`

## Project Purpose

This project demonstrates frontend development skills with React, reusable components, API integration, authentication handling, responsive UI design, and deployment. It is suitable for academic submission, internship portfolios, and fresher-level MERN stack project demonstrations.
