import { createStore, createEvent, combine } from "effector";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string; // ISO string
};

export type TaskForm = Omit<Task, "id" | "createdAt">;

export type Filters = {
  category: string;
  status: string;
  priority: string;
};

// Events
export const createTask = createEvent<TaskForm>();
export const deleteTask = createEvent<number>();
export const updateTask = createEvent<{ id: number; task: TaskForm }>();
export const setFilters = createEvent<Partial<Filters>>();
export const loadTasks = createEvent<Task[]>();

// Stores
const $tasks = createStore<Task[]>([])
  .on(loadTasks, (_, tasks) => tasks)
  .on(createTask, (state, task) => [
    ...state,
    { ...task, id: Date.now(), createdAt: new Date().toISOString() }
  ])
  .on(deleteTask, (state, id) => state.filter((task) => task.id !== id))
  .on(updateTask, (state, { id, task }) =>
    state.map((t) => (t.id === id ? { ...t, ...task } : t))
  );

const $filters = createStore<Filters>({
  category: "",
  status: "",
  priority: ""
}).on(setFilters, (state, filters) => ({ ...state, ...filters }));

export const $taskModel = combine({ tasks: $tasks, filters: $filters });

// --- LocalStorage logic ---
if (typeof window !== "undefined") {
  const raw = localStorage.getItem("tasks");
  if (raw) {
    try {
      const tasks: Task[] = JSON.parse(raw);
      loadTasks(tasks);
    } catch {
      console.error("Error parsing tasks from localStorage");
    }
  }
}

$tasks.watch((tasks) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
