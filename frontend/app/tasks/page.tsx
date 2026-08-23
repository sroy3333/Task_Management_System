import Sidebar from "@/components/sidebar/Sidebar";
import TasksClient from "@/components/tasks/TasksClient";
import type { Task } from "@/types/task";

async function getTasks(): Promise<Task[]> {
  const response = await fetch("http://localhost:4000/tasks", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
}

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main className="flex min-h-screen bg-white text-gray-900">
      {/* =========================
          SIDEBAR
      ========================== */}
      <Sidebar />

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <section className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">
        {/* =========================
            PAGE HEADING
        ========================== */}
        <div className="mb-9">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
            Tasks
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and track your tasks.
          </p>
        </div>

        {/* =========================
            TOOLBAR
        ========================== */}
        <TasksClient tasks={tasks} />
      </section>
    </main>
  );
}
