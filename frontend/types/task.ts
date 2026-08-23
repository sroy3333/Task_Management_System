export type TaskPriority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';

export type Task = {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
};
