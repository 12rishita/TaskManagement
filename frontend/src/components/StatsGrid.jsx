import { CheckCircle2, ClipboardList, Clock3, ShieldCheck } from 'lucide-react';
import React from 'react';

export function StatsGrid({ stats }) {
  const items = [
    { label: 'Total Tasks', value: stats.total, icon: ClipboardList, style: 'border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-200' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, style: 'border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-200' },
    { label: 'Pending', value: stats.pending, icon: Clock3, style: 'border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-200' },
    { label: 'Completion', value: `${stats.completionPercentage || 0}%`, icon: ShieldCheck, style: 'border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-200' }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article className={`rounded-lg border p-4 shadow-sm ${item.style}`} key={item.label}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{item.label}</p>
              <Icon size={18} />
            </div>
            <strong className="mt-3 block text-2xl font-bold text-slate-900 dark:text-white">{item.value}</strong>
          </article>
        );
      })}
    </section>
  );
}
