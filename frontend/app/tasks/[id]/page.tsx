import Link from "next/link";
import type { ComponentProps } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import DeleteTaskButton from "@/components/tasks/DeleteTaskButton";
import EditTaskButton from "@/components/tasks/EditTaskButton";

type Task = {
  id: number;
  title: string;
  status: string;
  priority: ComponentProps<typeof EditTaskButton>["priority"];
  dueDate: ComponentProps<typeof EditTaskButton>["dueDate"];
};

async function getTask(id: string): Promise<Task> {
  const response = await fetch(`http://localhost:4000/tasks/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json();
}

type TaskDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskDetailPage({
  params,
}: TaskDetailPageProps) {
  const { id } = await params;

  const task = await getTask(id);

  return (
    <main className="flex min-h-screen bg-white text-gray-900">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Content */}

      <section className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">

        {/* Back */}

        <div className="mb-8">

          <Link
            href="/tasks"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            ← Back to Tasks
          </Link>

        </div>


        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
            {task.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Task details
          </p>

        </div>


        {/* Details Card */}

        <div className="max-w-3xl rounded-xl border border-gray-200 bg-white">

          {/* Status */}

          <div className="border-b border-gray-200 px-6 py-5">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Status
            </p>

            <p className="mt-2 text-sm font-medium text-gray-900">
              {task.status}
            </p>

          </div>


          {/* Task ID */}

          <div className="border-b border-gray-200 px-6 py-5">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Task ID
            </p>

            <p className="mt-2 text-sm font-medium text-gray-900">
              {task.id}
            </p>

          </div>


          {/* Title */}

          <div className="px-6 py-5">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Task
            </p>

            <p className="mt-2 text-sm font-medium text-gray-900">
              {task.title}
            </p>

          </div>

        </div>


        {/* Actions */}

        <div className="mt-6 flex gap-2">

          <EditTaskButton
            taskId={task.id}
            title={task.title}
            status={task.status as ComponentProps<typeof EditTaskButton>["status"]}
            priority={task.priority}
            dueDate={task.dueDate}
          />

          <DeleteTaskButton taskId={task.id} />

        </div>

      </section>

    </main>
  );
}
