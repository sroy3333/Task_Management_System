import Link from 'next/link';

import MobileHeader from '@/components/mobile/MobileHeader';
import Sidebar from '@/components/sidebar/Sidebar';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <MobileHeader />

        <section className="px-5 py-8 md:px-10 md:py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Guest workspace overview.
          </p>

          <Link
            href="/tasks"
            className="mt-6 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            Open Tasks
          </Link>
        </section>
      </div>
    </main>
  );
}
