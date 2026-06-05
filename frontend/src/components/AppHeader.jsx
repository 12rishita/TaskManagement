import { ClipboardList, LogOut, Moon, Sun } from 'lucide-react';
import React from 'react';
import { navItems } from '../constants.js';

function navClass(active) {
  return `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${active ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-blue-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'}`;
}

export function AppHeader({ auth, logout, route, setTheme, theme }) {
  return (
    <header className="border-b border-blue-100 bg-white/95 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ClipboardList size={20} />
            </span>
            Student Task Manager
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a className={navClass(route === item.route)} href={`#/${item.route}`} key={item.route}>
                <Icon size={16} /> {item.label}
              </a>
            );
          })}
          <span className="hidden text-sm text-slate-500 dark:text-slate-600 md:inline">|</span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{auth.user.name}</span>
          <button
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="button"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" onClick={logout} type="button">
            <LogOut size={16} /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
