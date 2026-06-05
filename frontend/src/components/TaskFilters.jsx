import { Search } from 'lucide-react';
import React from 'react';
import { inputClass } from '../constants.js';

export function TaskFilters({ filters, onFilterChange }) {
  function update(key, value) {
    onFilterChange((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 lg:grid-cols-[minmax(220px,1fr)_160px_160px_150px]">
      <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-900">
        <Search size={16} className="text-slate-400" />
        <input className="min-h-10 w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100" placeholder="Search task" value={filters.search} onChange={(event) => update('search', event.target.value)} />
      </div>
      <select className={inputClass} value={filters.status} onChange={(event) => update('status', event.target.value)}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <select className={inputClass} value={filters.priority} onChange={(event) => update('priority', event.target.value)}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select className={inputClass} value={filters.sort} onChange={(event) => update('sort', event.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
