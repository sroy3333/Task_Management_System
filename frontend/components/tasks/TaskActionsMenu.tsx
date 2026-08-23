'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type TaskActionsMenuProps = {
  taskId: number;
  title: string;
};

export default function TaskActionsMenu({
  taskId,
  title,
}: TaskActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick,
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleOutsideClick,
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
    >
      <button
        type="button"
        aria-label={`Actions for ${title}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="rounded-md px-2 py-1 text-xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        ...
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-20 w-36 rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <Link
            href={`/tasks/${taskId}`}
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            View / Edit
          </Link>
        </div>
      )}
    </div>
  );
}
