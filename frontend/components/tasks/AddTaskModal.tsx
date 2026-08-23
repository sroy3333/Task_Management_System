'use client';

import { FormEvent, useState } from 'react';

import type {
  TaskPriority,
  TaskStatus,
} from '@/types/task';

type AddTaskModalProps = {
  onClose: () => void;
  onTaskCreated: () => void;
};

export default function AddTaskModal({
  onClose,
  onTaskCreated,
}: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] =
    useState<TaskPriority>('Medium');
  const [status, setStatus] =
    useState<TaskStatus>('Todo');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    if (!dueDate) {
      setError('Please select a due date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'http://localhost:4000/tasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.trim(),
            priority,
            status,
            dueDate,
          }),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          Array.isArray(data?.message)
            ? data.message.join(' ')
            : data?.message;

        throw new Error(
          message || 'Failed to create task',
        );
      }

      onTaskCreated();
      onClose();
    } catch (submitError) {
      console.error(submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Failed to create task.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-title"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="add-task-title"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            Add Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter task title"
              autoFocus
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="task-priority"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Priority
            </label>

            <select
              id="task-priority"
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value as TaskPriority,
                )
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="task-status"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Status
            </label>

            <select
              id="task-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as TaskStatus,
                )
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="task-due-date"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Due date
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(event.target.value)
              }
              min={new Date().toISOString().slice(0, 10)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />
          </div>

          {error && (
            <p
              className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
