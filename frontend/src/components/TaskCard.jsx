import { CalendarDays, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import React from 'react';
import { priorityTone } from '../constants.js';
import { Badge, IconButton } from './ui.jsx';

export function TaskCard({ onDelete, onEdit, onToggle, task }) {
  const cardAccent = task.status === 'completed'
    ? 'border-l-4 border-l-emerald-500'
    : task.priority === 'high'
      ? 'border-l-4 border-l-red-500'
      : task.priority === 'low'
        ? 'border-l-4 border-l-blue-400'
        : 'border-l-4 border-l-amber-400';

  return (
    <article className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 ${cardAccent}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={task.status} tone={task.status === 'completed' ? 'green' : 'amber'} />
            <Badge label={`${task.priority || 'medium'} priority`} tone={priorityTone(task.priority)} />
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
              <CalendarDays size={13} /> {task.dueDate ? `Due ${task.dueDate}` : 'No due date'}
            </span>
          </div>
          <h3 className={`mt-2 text-base font-bold ${task.status === 'completed' ? 'text-slate-500 line-through dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>{task.title}</h3>
          {task.description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{task.description}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <IconButton label="Toggle status" onClick={() => onToggle(task.id)}><CheckCircle2 size={17} /></IconButton>
          <IconButton label="Edit task" onClick={() => onEdit(task)}><Edit3 size={17} /></IconButton>
          <IconButton label="Delete task" onClick={() => onDelete(task.id)}><Trash2 size={17} /></IconButton>
        </div>
      </div>
    </article>
  );
}

export function RecentTaskItem({ task }) {
  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">{task.title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{task.description || 'No description provided'}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge label={task.status} tone={task.status === 'completed' ? 'green' : 'amber'} />
        <Badge label={task.priority || 'medium'} tone={priorityTone(task.priority)} />
      </div>
    </div>
  );
}
