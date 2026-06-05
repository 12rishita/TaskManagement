import { LayoutDashboard, ListChecks, UserCircle } from 'lucide-react';

export const emptyTask = { title: '', description: '', dueDate: '', status: 'pending', priority: 'medium' };

export const navItems = [
  { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
  { label: 'Tasks', route: 'tasks', icon: ListChecks },
  { label: 'Profile', route: 'profile', icon: UserCircle }
];

export const inputClass = 'min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/10';

export function currentRoute() {
  const route = window.location.hash.replace('#/', '');
  return route || 'dashboard';
}

export function priorityTone(priority) {
  if (priority === 'high') return 'red';
  if (priority === 'low') return 'green';
  return 'slate';
}
