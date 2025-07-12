import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
};

export type TaskForm = Omit<Task, "id">;

type Filters = {
  category: string;
  status: string;
  priority: string;
};

type Store = {
  tasks: Task[];
  filters: Filters;
  addTask: (task: TaskForm) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, task: TaskForm) => void;
  setFilters: (filters: Partial<Filters>) => void;
};

export const useTaskStore = create<Store>()(
  persist(
    (set) => ({
      tasks: [],
      filters: { category: "", status: "", priority: "" },
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now() }]
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      editTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        })),
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters }
        }))
    }),
    {
      name: "task-manager-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks })
    }
  )
);
