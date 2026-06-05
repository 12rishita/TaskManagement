import React, { useEffect, useMemo, useState } from 'react';
import { apiRequest } from './api.js';
import { AppHeader } from './components/AppHeader.jsx';
import { Alert } from './components/ui.jsx';
import { currentRoute, emptyTask } from './constants.js';
import { AuthPage } from './pages/AuthPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { TasksPage } from './pages/TasksPage.jsx';

export default function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('student-task-auth');
    return saved ? JSON.parse(saved) : null;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('student-task-theme') || 'light');
  const [route, setRoute] = useState(currentRoute());
  const [mode, setMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, completionPercentage: 0 });
  const [taskForm, setTaskForm] = useState(emptyTask);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', sort: 'newest' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const token = auth?.token;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('student-task-theme', theme);
  }, [theme]);

  useEffect(() => {
    const syncRoute = () => setRoute(currentRoute());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('student-task-auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('student-task-auth');
    }
  }, [auth]);

  useEffect(() => {
    if (!token) return;
    loadDashboard();
  }, [token, filters]);

  async function loadDashboard() {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.search) query.set('search', filters.search);
      if (filters.status) query.set('status', filters.status);
      if (filters.priority) query.set('priority', filters.priority);
      if (filters.sort) query.set('sort', filters.sort);
      const [taskData, statData] = await Promise.all([
        apiRequest(`/tasks?${query.toString()}`, { token }),
        apiRequest('/tasks/stats', { token })
      ]);
      setTasks(taskData.tasks);
      setStats(statData);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAuth(event) {
    event.preventDefault();
    setMessage('');
    setAuthLoading(true);
    try {
      const payload = mode === 'register' ? authForm : { email: authForm.email, password: authForm.password };
      const data = await apiRequest(`/auth/${mode}`, { method: 'POST', body: payload });
      setAuth(data);
      setAuthForm({ name: '', email: '', password: '' });
      window.location.hash = '/dashboard';
    } catch (error) {
      setMessage(error.message);
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleTaskSubmit(event) {
    event.preventDefault();
    setMessage('');
    try {
      const path = editingId ? `/tasks/${editingId}` : '/tasks';
      const method = editingId ? 'PUT' : 'POST';
      await apiRequest(path, { method, body: taskForm, token });
      setTaskForm(emptyTask);
      setEditingId(null);
      await loadDashboard();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function toggleTask(id) {
    setMessage('');
    try {
      await apiRequest(`/tasks/${id}/toggle`, { method: 'PATCH', token });
      await loadDashboard();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteTask(id) {
    setMessage('');
    try {
      await apiRequest(`/tasks/${id}`, { method: 'DELETE', token });
      await loadDashboard();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function startEdit(task) {
    setEditingId(task.id);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate || '',
      status: task.status,
      priority: task.priority || 'medium'
    });
    window.location.hash = '/tasks';
  }

  function logout() {
    setAuth(null);
    setTasks([]);
    setStats({ total: 0, completed: 0, pending: 0, completionPercentage: 0 });
    window.location.hash = '/dashboard';
  }

  const recentTasks = useMemo(() => tasks.slice(0, 4), [tasks]);

  if (!auth) {
    return (
      <AuthPage
        authForm={authForm}
        authLoading={authLoading}
        message={message}
        mode={mode}
        onAuth={handleAuth}
        setAuthForm={setAuthForm}
        setMode={setMode}
        setTheme={setTheme}
        theme={theme}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-emerald-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <AppHeader auth={auth} logout={logout} route={route} setTheme={setTheme} theme={theme} />
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {message && <Alert message={message} />}
        {route === 'dashboard' && <DashboardPage auth={auth} recentTasks={recentTasks} stats={stats} />}
        {route === 'tasks' && (
          <TasksPage
            editingId={editingId}
            filters={filters}
            loading={loading}
            onDelete={deleteTask}
            onEdit={startEdit}
            onFilterChange={setFilters}
            onSubmit={handleTaskSubmit}
            onToggle={toggleTask}
            setEditingId={setEditingId}
            setTaskForm={setTaskForm}
            taskForm={taskForm}
            tasks={tasks}
          />
        )}
        {route === 'profile' && <ProfilePage auth={auth} stats={stats} />}
        {!['dashboard', 'tasks', 'profile'].includes(route) && <DashboardPage auth={auth} recentTasks={recentTasks} stats={stats} />}
      </div>
    </main>
  );
}
