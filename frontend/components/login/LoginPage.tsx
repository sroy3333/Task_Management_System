'use client';

import { useRouter } from 'next/navigation';

import ThemeToggle from '@/components/theme/ThemeToggle';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-[#0A0A0A] dark:bg-gray-950 dark:text-white">
      <div className="flex w-full justify-end px-6 pt-6">
        <ThemeToggle />
      </div>

      <div className="mt-10 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center">
          <span className="text-lg">◇</span>
        </div>

        <span className="text-sm font-semibold">
          Pyramid
        </span>
      </div>

      <div className="mt-24 w-full max-w-md px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Let&apos;s get back on track
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Enter your email below to login to your account.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="h-11 w-full rounded-md bg-black px-4 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Continue as Guest
          </button>

          <button
            type="button"
            disabled
            title="Google authentication is not configured for this assessment"
            className="h-11 w-full cursor-not-allowed rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-400 opacity-70 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500"
          >
            <span className="mr-2">G</span>
            Login with Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          By clicking continue, you agree to our{' '}
          <span className="underline">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="underline">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </main>
  );
}
