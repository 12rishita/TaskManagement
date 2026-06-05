import React from 'react';
import { CalendarCheck, CheckCircle2, ClipboardList, Mail, ShieldCheck, User } from 'lucide-react';

export function ProfilePage({ auth, stats }) {
  const initials = auth.user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 px-5 py-8 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold ring-1 ring-white/30">
                {initials || 'ST'}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Student Profile</p>
                <h1 className="mt-1 text-2xl font-bold">{auth.user.name}</h1>
                <p className="mt-1 flex items-center gap-2 text-sm text-blue-50"><Mail size={15} /> {auth.user.email}</p>
              </div>
            </div>
            <div className="rounded-lg bg-white/12 px-4 py-3 text-sm ring-1 ring-white/20">
              <p className="font-semibold">Account Status</p>
              <p className="mt-1 text-blue-50">JWT Protected</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <ProfileStat icon={<ClipboardList size={20} />} label="Total Tasks" value={stats.total} tone="blue" />
          <ProfileStat icon={<CheckCircle2 size={20} />} label="Completed" value={stats.completed} tone="green" />
          <ProfileStat icon={<CalendarCheck size={20} />} label="Pending" value={stats.pending} tone="amber" />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Account Details</h2>
          <div className="mt-4 grid gap-3">
            <DetailItem icon={<User size={18} />} label="Full Name" value={auth.user.name} />
            <DetailItem icon={<Mail size={18} />} label="Email Address" value={auth.user.email} />
            <DetailItem icon={<ShieldCheck size={18} />} label="Authentication" value="Secured with JWT token authentication" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Progress Summary</h2>
          <div className="mt-5">
            <div className="flex items-end justify-between">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Completion Rate</span>
              <strong className="text-3xl font-bold text-brand-600 dark:text-blue-300">{stats.completionPercentage || 0}%</strong>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-emerald-500" style={{ width: `${stats.completionPercentage || 0}%` }} />
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              {stats.pending ? `${stats.pending} task${stats.pending > 1 ? 's' : ''} still pending.` : 'All tasks are completed. Great work.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileStat({ icon, label, tone, value }) {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200'
  };

  return (
    <article className={`rounded-lg border border-slate-100 p-4 dark:border-slate-800 ${styles[tone]}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        {icon}
      </div>
      <strong className="mt-3 block text-2xl font-bold text-slate-900 dark:text-white">{value}</strong>
    </article>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <span className="mt-0.5 text-brand-600 dark:text-blue-300">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 font-medium text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
