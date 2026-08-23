'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import type {
  TaskPriority,
  TaskStatus,
} from '@/types/task';

import AddTaskModal from './AddTaskModal';
import TaskTable from './TaskTable';

type VisibleFields = {
  task: boolean;
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  actions: boolean;
};

type TasksClientProps = {
  tasks: import('@/types/task').Task[];
};

export default function TasksClient({
  tasks,
}: TasksClientProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [search, setSearch] = useState('');
  const [isFieldsOpen, setIsFieldsOpen] =
    useState(false);
  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  const [statusFilter, setStatusFilter] =
    useState<'All' | TaskStatus>('All');

  const [priorityFilter, setPriorityFilter] =
    useState<'All' | TaskPriority>('All');

  const [visibleFields, setVisibleFields] =
    useState<VisibleFields>({
      task: true,
      priority: true,
      members: true,
      dueDate: true,
      actions: true,
    });

  function handleTaskCreated() {
    router.refresh();
  }

  function toggleField(field: keyof VisibleFields) {
    setVisibleFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  const filteredTasks = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !searchText ||
        task.title.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === 'All' ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'All' ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ]);

  const hasActiveFilter =
    statusFilter !== 'All' ||
    priorityFilter !== 'All';

  return (
    <>
      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search tasks..."
          aria-label="Search tasks"
          className="h-10 w-full max-w-sm rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="relative mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsFieldsOpen((current) => !current);
            setIsFilterOpen(false);
          }}
          className="h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          ▣ Fields
        </button>

        {isFieldsOpen && (
          <div className="absolute left-0 top-12 z-30 w-52 rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Show fields
            </p>

            {(
              [
                ['task', 'Task'],
                ['priority', 'Priority'],
                ['members', 'Members'],
                ['dueDate', 'Due Date'],
                ['actions', 'Actions'],
              ] as const
            ).map(([field, label]) => (
              <label
                key={field}
                className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <input
                  type="checkbox"
                  checked={visibleFields[field]}
                  onChange={() =>
                    toggleField(field)
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsFilterOpen((current) => !current);
            setIsFieldsOpen(false);
          }}
          className="h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          ⚱ Filter
        </button>

        {isFilterOpen && (
          <div className="absolute left-0 top-12 z-30 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:left-[96px]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Status
            </p>

            <div className="space-y-1">
              {[
                'All',
                'Todo',
                'In Progress',
                'Completed',
              ].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusFilter(
                      status as 'All' | TaskStatus,
                    );
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    statusFilter === status
                      ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Priority
            </p>

            <div className="space-y-1">
              {['All', 'High', 'Medium', 'Low'].map(
                (priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() =>
                      setPriorityFilter(
                        priority as
                          | 'All'
                          | TaskPriority,
                      )
                    }
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                      priorityFilter === priority
                        ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {priority}
                  </button>
                ),
              )}
            </div>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('All');
                  setPriorityFilter('All');
                  setIsFilterOpen(false);
                }}
                className="mt-3 w-full border-t border-gray-100 pt-3 text-left text-sm text-gray-500 hover:text-gray-900 dark:border-gray-800 dark:hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="h-10 rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          + Add Task
        </button>
      </div>

      {hasActiveFilter && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span>Filtered by:</span>

          {statusFilter !== 'All' && (
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {statusFilter}
            </span>
          )}

          {priorityFilter !== 'All' && (
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {priorityFilter}
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              setStatusFilter('All');
              setPriorityFilter('All');
            }}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Clear filters"
          >
            ×
          </button>
        </div>
      )}

      {tasks.length > 0 && filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            No matching tasks
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Try a different search term or clear your
            filters.
          </p>
        </div>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          visibleFields={visibleFields}
        />
      )}

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </>
  );
}
