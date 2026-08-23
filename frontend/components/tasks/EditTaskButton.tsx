'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type {
  TaskPriority,
  TaskStatus,
} from '@/types/task';

import EditTaskModal from './EditTaskModal';

type EditTaskButtonProps = {
  taskId: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};

export default function EditTaskButton({
  taskId,
  title,
  priority,
  status,
  dueDate,
}: EditTaskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleTaskUpdated() {
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Edit Task
      </button>

      {isOpen && (
        <EditTaskModal
          taskId={taskId}
          initialTitle={title}
          initialPriority={priority}
          initialStatus={status}
          initialDueDate={dueDate}
          onClose={() => setIsOpen(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </>
  );
}
