'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteTaskButtonProps = {
  taskId: number;
};

export default function DeleteTaskButton({
  taskId,
}: DeleteTaskButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?',
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:4000/tasks/${taskId}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      router.push('/tasks');
      router.refresh();
    } catch (error) {
      console.error(error);
      window.alert('Failed to delete task');
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}
