import React from 'react';
import { emptyTask, inputClass } from '../constants.js';
import { TaskCard } from '../components/TaskCard.jsx';
import { TaskFilters } from '../components/TaskFilters.jsx';
import { EmptyState, Field } from '../components/ui.jsx';

export function TasksPage({ editingId, filters, loading, onDelete, onEdit, onFilterChange, onSubmit, onToggle, setEditingId, setTaskForm, taskForm, tasks }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{editingId ? 'Edit Task' : 'Create Task'}</h2>
        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          <Field label="Title">
            <input className={inputClass} required value={taskForm.title} onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })} />
          </Field>
          <Field label="Description">
            <textarea className={`${inputClass} min-h-28`} value={taskForm.description} onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Field label="Due Date">
              <input className={inputClass} type="date" value={taskForm.dueDate} onChange={(event) => setTaskForm({ ...taskForm, dueDate: event.target.value })} />
            </Field>
            <Field label="Priority">
              <select className={inputClass} value={taskForm.priority} onChange={(event) => setTaskForm({ ...taskForm, priority: event.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>
            <Field label="Status">
              <select className={inputClass} value={taskForm.status} onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value })}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </Field>
          </div>
          <button className="w-full rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700" type="submit">
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => { setEditingId(null); setTaskForm(emptyTask); }} type="button">
              Cancel Edit
            </button>
          )}
        </form>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tasks Management</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Search, filter, sort, and update your tasks.</p>
          </div>
        </div>
        <TaskFilters filters={filters} onFilterChange={onFilterChange} />
        {loading ? <p className="py-8 text-center text-sm text-slate-500">Loading tasks...</p> : tasks.length === 0 ? (
          <EmptyState text="No tasks found. Try changing filters or create a new task." />
        ) : (
          <div className="mt-4 space-y-3">
            {tasks.map((task) => <TaskCard key={task.id} onDelete={onDelete} onEdit={onEdit} onToggle={onToggle} task={task} />)}
          </div>
        )}
      </section>
    </div>
  );
}
