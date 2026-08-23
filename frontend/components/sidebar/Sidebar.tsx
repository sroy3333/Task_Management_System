'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Sidebar() {
  const pathname = usePathname();

  const isTasksActive = pathname.startsWith('/tasks');
  const isProjectsActive = pathname.startsWith('/projects');

  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-gray-200 bg-white px-6 py-7 dark:border-gray-800 dark:bg-gray-950 md:flex md:min-h-screen md:flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
          D
        </div>

        <div>
          <span className="block text-base font-semibold text-gray-900 dark:text-gray-100">
            Dexter
          </span>
          <span className="text-xs text-gray-400">Guest</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
          Workspace
        </p>

        <nav className="space-y-1">
          <Link
            href="/tasks"
            className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isTasksActive
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Tasks
          </Link>

          <Link
            href="/projects"
            className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isProjectsActive
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Projects
          </Link>
        </nav>
      </div>

      <ThemeToggle />
    </aside>
  );
}
