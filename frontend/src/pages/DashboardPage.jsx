import React from 'react';
import { StatsGrid } from '../components/StatsGrid.jsx';
import { RecentTaskItem } from '../components/TaskCard.jsx';
import { EmptyState } from '../components/ui.jsx';

export function DashboardPage({ auth, recentTasks, stats }) {
  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-blue-100 bg-gradient-to-r from-white to-blue-50 p-5 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
        <p className="text-sm font-semibold text-brand-600">Welcome, {auth.user.name}</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">Track assignments, deadlines, and daily study tasks from a simple protected dashboard.</p>
      </section>
      <StatsGrid stats={stats} />
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Tasks</h2>
          <a className="text-sm font-semibold text-brand-600 hover:underline" href="#/tasks">Manage tasks</a>
        </div>
        {recentTasks.length === 0 ? (
          <EmptyState text="No recent tasks available. Create your first task from the tasks page." />
        ) : (
          <div className="divide-y divide-slate-100">
            {recentTasks.map((task) => <RecentTaskItem key={task.id} task={task} />)}
          </div>
        )}
      </section>
    </div>
  );
}
