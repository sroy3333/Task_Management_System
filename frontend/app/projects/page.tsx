import Link from 'next/link';

import MobileHeader from '@/components/mobile/MobileHeader';
import Sidebar from '@/components/sidebar/Sidebar';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <MobileHeader />

        <section className="px-5 py-8 md:px-10 md:py-10">
          <div className="mb-8">
            <Link
              href="/tasks"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              ← Back to Tasks
            </Link>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">
            Projects
          </h1>

          <p className="mt-2 max-w-xl text-sm text-gray-500">
            Project management is not part of the current
            task data model. This page is intentionally kept
            separate so project functionality can be added
            later without coupling it to task persistence.
          </p>
        </section>
      </div>
    </main>
  );
}
