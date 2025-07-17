import { useState, useEffect, type ChangeEvent } from "react";
import styled from "styled-components";
import { useUnit } from "effector-react";
import { $filters } from "@entities/task/model/taskStore";
import TaskCard from "@entities/task/ui/TaskCard";
import TaskModal from "@widgets/task-modal/ui/TaskModal";
import type { Task, TaskForm } from "@entities/task/model/taskStore";
import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "/api") + "/tasks";

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 28px;
  }
`;

/**
 * Список задач с поддержкой фильтрации и модальных окон для создания/редактирования.
 *
 * renderTaskCard вынесен для читаемости и возможного расширения логики.
 */
function TaskList() {
  const filters = useUnit($filters);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<TaskForm>({
    title: "",
    description: "",
    category: "",
    status: "",
    priority: ""
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TaskForm>({
    title: "",
    description: "",
    category: "",
    status: "",
    priority: ""
  });

  // Загрузка задач с backend
  useEffect(() => {
    setLoading(true);
    axios
      .get<Task[]>(API_URL)
      .then((res) => setTasks(res.data))
      .finally(() => setLoading(false));
  }, []);

  // CRUD
  const handleAddTask = async () => {
    const { title, category, status, priority } = form;
    if (!title || !category || !status || !priority) return;
    const res = await axios.post<Task>(API_URL, form);
    setTasks((prev) => [...prev, res.data]);
    setForm({
      title: "",
      description: "",
      category: "",
      status: "",
      priority: ""
    });
  };

  const handleDeleteTask = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditClick = (task: Task) => {
    setEditTaskId(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      category: task.category,
      status: task.status,
      priority: task.priority
    });
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (editTaskId === null) return;
    const res = await axios.patch<Task>(`${API_URL}/${editTaskId}`, editForm);
    setTasks((prev) => prev.map((t) => (t.id === editTaskId ? res.data : t)));
    setEditModalOpen(false);
    setEditTaskId(null);
  };

  const handleChange =
    (field: keyof TaskForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleEditChange =
    (field: keyof TaskForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((f) => ({ ...f, [field]: e.target.value }));
    };

  // Фильтрация на клиенте
  const filteredTasks = tasks.filter(
    (task) =>
      (!filters.category || task.category === filters.category) &&
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority)
  );

  function renderTaskCard(task: Task) {
    return (
      <TaskCard
        key={task.id}
        task={task}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
      />
    );
  }

  if (loading) return <div>Загрузка...</div>;

  return (
    <ListWrapper>
      <TaskModal
        open={false}
        title="Добавить задачу"
        form={form}
        onChange={handleChange}
        onSave={handleAddTask}
        onClose={() => {}}
        saveLabel="Добавить"
        disabled={
          !form.title || !form.category || !form.status || !form.priority
        }
      />
      <TaskModal
        open={editModalOpen}
        title="Редактировать задачу"
        form={editForm}
        onChange={handleEditChange}
        onSave={handleEditSave}
        onClose={() => setEditModalOpen(false)}
        saveLabel="Сохранить"
        disabled={
          !editForm.title ||
          !editForm.category ||
          !editForm.status ||
          !editForm.priority
        }
      />
      {filteredTasks.map(renderTaskCard)}
    </ListWrapper>
  );
}

export default TaskList;
