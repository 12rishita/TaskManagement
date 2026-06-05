import { ClipboardList, Moon, Sun } from 'lucide-react';
import React from 'react';
import { inputClass } from '../constants.js';
import { Alert, Field } from '../components/ui.jsx';

function tabClass(active) {
  return `rounded px-3 py-2 text-sm font-semibold ${active ? 'bg-white text-brand-600 shadow-sm dark:bg-slate-800 dark:text-blue-200' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`;
}

export function AuthPage({ authForm, authLoading, message, mode, onAuth, setAuthForm, setMode, setTheme, theme }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-slate-50 to-emerald-100 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <section className="w-full max-w-md overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg shadow-blue-100/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 px-6 py-5 text-white">
          <div className="mb-3 flex justify-end">
            <button
              className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 hover:bg-white/20"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              type="button"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/30">
            <ClipboardList size={24} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Student Task Manager</p>
          <h1 className="mt-1 text-2xl font-bold">{mode === 'login' ? 'Login to your account' : 'Create your account'}</h1>
          <p className="mt-2 text-sm text-blue-50">
            {mode === 'login' ? 'Access your dashboard and manage daily academic work.' : 'Register and start organizing assignments, deadlines, and study tasks.'}
          </p>
        </div>

        <div className="p-6">
          <div className="mb-5 grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-950">
            <button className={tabClass(mode === 'login')} onClick={() => setMode('login')} type="button">Login</button>
            <button className={tabClass(mode === 'register')} onClick={() => setMode('register')} type="button">Register</button>
          </div>

          <form className="space-y-4" onSubmit={onAuth}>
            {mode === 'register' && (
              <Field label="Name">
                <input className={inputClass} placeholder="Enter your name" required value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} />
              </Field>
            )}
            <Field label="Email">
              <input className={inputClass} placeholder="you@example.com" required type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} />
            </Field>
            <Field label="Password">
              <input className={inputClass} minLength={6} placeholder="Minimum 6 characters" required type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} />
            </Field>
            {message && <Alert message={message} />}
            <button className="w-full rounded-md bg-gradient-to-r from-brand-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-brand-700 hover:to-emerald-700 disabled:opacity-70" disabled={authLoading} type="submit">
              {authLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
