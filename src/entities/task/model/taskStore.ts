import { createStore, createEvent } from "effector";

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

export const setFilters = createEvent<Partial<Filters>>();

export const $filters = createStore<Filters>({
  category: "",
  status: "",
  priority: ""
}).on(setFilters, (state, filters) => ({ ...state, ...filters }));
