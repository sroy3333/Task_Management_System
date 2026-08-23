'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle navigation"
            className="text-xl text-gray-700 dark:text-gray-200"
          >
            ☰
          </button>

          <span className="font-semibold text-gray-900 dark:text-white">
            Pyramid
          </span>
        </div>

        <ThemeToggle />
      </div>

      {open && (
        <nav className="border-t border-gray-100 px-5 py-3 dark:border-gray-800">
          <Link
            href="/tasks"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Tasks
          </Link>

          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Projects
          </Link>
        </nav>
      )}
    </header>
  );
}
