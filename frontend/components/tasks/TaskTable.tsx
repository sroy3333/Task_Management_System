'use client';

import Link from 'next/link';

import type {
  Task,
  TaskPriority,
} from '@/types/task';

import TaskActionsMenu from './TaskActionsMenu';

type VisibleFields = {
  task: boolean;
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  actions: boolean;
};

type TaskTableProps = {
  tasks: Task[];
  visibleFields: VisibleFields;
};

function formatDueDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
}

function PriorityText({
  priority,
}: {
  priority: TaskPriority;
}) {
  return (
    <span
      className={`text-sm font-medium ${
        priority === 'High'
          ? 'text-red-600 dark:text-red-400'
          : priority === 'Medium'
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {priority}
    </span>
  );
}

function MemberAvatar() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
      D
    </div>
  );
}

export default function TaskTable({
  tasks,
  visibleFields,
}: TaskTableProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          No tasks found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            {visibleFields.task && (
              <th className="px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Task
              </th>
            )}

            {visibleFields.priority && (
              <th className="px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Priority
              </th>
            )}

            {visibleFields.members && (
              <th className="px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Members
              </th>
            )}

            {visibleFields.dueDate && (
              <th className="px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Due Date
              </th>
            )}

            {visibleFields.actions && (
              <th className="px-5 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-200 last:border-b-0 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              {visibleFields.task && (
                <td className="px-5 py-6">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    {task.title}
                  </Link>
                </td>
              )}

              {visibleFields.priority && (
                <td className="px-5 py-6">
                  <PriorityText priority={task.priority} />
                </td>
              )}

              {visibleFields.members && (
                <td className="px-5 py-6">
                  <MemberAvatar />
                </td>
              )}

              {visibleFields.dueDate && (
                <td className="px-5 py-6 text-sm text-gray-700 dark:text-gray-300">
                  {formatDueDate(task.dueDate)}
                </td>
              )}

              {visibleFields.actions && (
                <td className="px-5 py-6">
                  <TaskActionsMenu
                    taskId={task.id}
                    title={task.title}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
