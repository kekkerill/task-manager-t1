import { useState, type ChangeEvent } from "react";
import styled from "styled-components";
import { useTaskStore } from "../store/store";
import type { Task, TaskForm } from "../store/store";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

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

function TaskList({
  modalOpen,
  setModalOpen
}: {
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
}) {
  const { tasks, filters, addTask, deleteTask, editTask } = useTaskStore();

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

  const handleChange =
    (field: keyof TaskForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({
        ...f,
        [field]: e.target.value
      }));
    };

  const handleAddTask = () => {
    addTask(form);
    setForm({
      title: "",
      description: "",
      category: "",
      status: "",
      priority: ""
    });
    setModalOpen(false);
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

  const handleEditChange =
    (field: keyof TaskForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((f) => ({
        ...f,
        [field]: e.target.value
      }));
    };

  const handleEditSave = () => {
    if (editTaskId !== null) {
      editTask(editTaskId, editForm);
      setEditModalOpen(false);
      setEditTaskId(null);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (!filters.category || task.category === filters.category) &&
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority)
  );

  return (
    <ListWrapper>
      <TaskModal
        open={modalOpen}
        title="Добавить задачу"
        form={form}
        onChange={handleChange}
        onSave={handleAddTask}
        onClose={() => setModalOpen(false)}
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

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEditClick}
          onDelete={deleteTask}
        />
      ))}
    </ListWrapper>
  );
}

export default TaskList;
