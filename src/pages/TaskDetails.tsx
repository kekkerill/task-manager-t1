import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { Button, Tag } from "@admiral-ds/react-ui";
import { useTaskStore } from "../store/store";
import TaskModal from "../components/TaskModal";
import type { TaskForm } from "../store/store";
import {
  categoryTagKind,
  statusTagKind,
  priorityTagKind
} from "../components/constants";

const DetailsWrapper = styled.div`
  margin-top: 40px;
  background: #23272e;
  border-radius: 12px;
  padding: 32px;
  min-width: 350px;
  color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.09);
`;

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, editTask } = useTaskStore();
  const task = tasks.find((t) => t.id === Number(id));

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<TaskForm>(
    task
      ? {
          title: task.title,
          description: task.description,
          category: task.category,
          status: task.status,
          priority: task.priority
        }
      : {
          title: "",
          description: "",
          category: "",
          status: "",
          priority: ""
        }
  );

  if (!task) {
    return (
      <DetailsWrapper>
        <h2>Задача не найдена</h2>
        <Button onClick={() => navigate("/")}>На главную</Button>
      </DetailsWrapper>
    );
  }

  const handleEditChange =
    (field: keyof TaskForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((f) => ({
        ...f,
        [field]: e.target.value
      }));
    };

  const handleEditSave = () => {
    editTask(task.id, editForm);
    setEditModalOpen(false);
  };

  return (
    <DetailsWrapper>
      <h2 style={{ marginTop: 0 }}>{task.title}</h2>
      <p style={{ color: "#b4b4b4" }}>{task.description}</p>
      <div style={{ display: "flex", gap: 12, margin: "18px 0" }}>
        <Tag kind={categoryTagKind[task.category]} statusViaBackground>
          {task.category}
        </Tag>
        <Tag kind={statusTagKind[task.status]} statusViaBackground>
          {task.status}
        </Tag>
        <Tag kind={priorityTagKind[task.priority]} statusViaBackground>
          {task.priority}
        </Tag>
      </div>
      <Button appearance="primary" onClick={() => setEditModalOpen(true)}>
        Редактировать
      </Button>
      <Button
        style={{ marginLeft: 16 }}
        appearance="secondary"
        onClick={() => navigate("/")}
      >
        Назад
      </Button>

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
    </DetailsWrapper>
  );
}

export default TaskDetails;
