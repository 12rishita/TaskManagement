import { ListChecks } from 'lucide-react';
import React from 'react';

export function Badge({ label, tone }) {
  const tones = {
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    green: 'border-green-200 bg-green-50 text-green-700',
    red: 'border-red-200 bg-red-50 text-red-700',
    slate: 'border-slate-200 bg-slate-50 text-slate-700'
  };

  return <span className={`rounded border px-2 py-1 text-xs font-semibold capitalize dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${tones[tone] || tones.slate}`}>{label}</span>;
}

export function Field({ children, label }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}

export function Alert({ message }) {
  return <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200">{message}</div>;
}

export function EmptyState({ text }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <ListChecks className="mx-auto text-slate-400" size={36} />
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
}

export function IconButton({ children, label, onClick }) {
  return (
    <button aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" onClick={onClick} title={label} type="button">
      {children}
    </button>
  );
}

export function InfoRow({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
