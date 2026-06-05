# Deployment Guide

Deploy the backend on Render and the frontend on Vercel.

## 1. Push Project to GitHub

Create a GitHub repository and push this project.

```bash
git init
git add .
git commit -m "Student task manager MERN project"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## 2. Deploy Backend on Render

1. Open Render Dashboard.
2. Click `New` > `Web Service`.
3. Connect your GitHub repository.
4. Select this project repository.
5. Set the root directory to:

```text
backend
```

6. Use these commands:

```text
Build Command: npm install
Start Command: npm start
```

7. Add environment variables:

```env
NODE_ENV=production
JWT_SECRET=<your-long-random-secret>
MONGO_URI=<your-mongodb-atlas-uri>
CLIENT_ORIGIN=<your-vercel-frontend-url>
```

Render provides the `PORT` automatically. The backend already uses `process.env.PORT`.

After deploy, copy your Render backend URL, for example:

```text
https://student-task-manager-api.onrender.com
```

## 3. Deploy Frontend on Vercel

1. Open Vercel Dashboard.
2. Click `Add New` > `Project`.
3. Import the same GitHub repository.
4. Set the root directory to:

```text
frontend
```

5. Use these settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

6. Add environment variable:

```env
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```

7. Deploy the project.

## 4. Update Backend CORS

After Vercel gives you the frontend URL, go back to Render and update:

```env
CLIENT_ORIGIN=https://your-vercel-app.vercel.app
```

Then redeploy/restart the Render service.

## 5. Test After Deployment

Open the Vercel frontend URL and test:

- Register
- Login
- Create task
- Search/filter/sort tasks
- Mark complete/pending
- Profile page
- Logout

## Notes

- `frontend/vercel.json` is included for SPA routing.
- The backend uses MongoDB when `MONGO_URI` is provided.
- Keep `JWT_SECRET` private.
- Do not use local `.env` values directly in public screenshots or commits.
