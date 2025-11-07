'use client';

interface LoaderProps {
  label?: string;
}

export function Loader({ label = 'Working...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      <span>{label}</span>
    </div>
  );
}
