import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TaskForm } from "@entities/task/model/taskStore";
import TaskFormFields from "@features/task-edit/ui/TaskFormFields";
import { Button } from "@admiral-ds/react-ui";
import styled from "styled-components";
import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "/api") + "/tasks";

const initialForm: TaskForm = {
  title: "",
  description: "",
  category: "",
  status: "",
  priority: ""
};
const CreateTaskWrapper = styled.div`
  max-width: 500px;
  margin: 40px auto;
  background: #23272e;
  border-radius: 12px;
  padding: 32px;
  color: #fff;
`;

/**
 * Страница создания новой задачи.
 */
function CreateTaskPage() {
  const [form, setForm] = useState<TaskForm>(initialForm);
  const navigate = useNavigate();

  const handleChange =
    (field: keyof TaskForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleSave = async () => {
    await axios.post(API_URL, form);
    navigate("/");
  };

  return (
    <CreateTaskWrapper>
      <h2 style={{ marginTop: 0 }}>Создать задачу</h2>
      <TaskFormFields dimension="xl" form={form} onChange={handleChange} />
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Button
          appearance="secondary"
          dimension="xl"
          onClick={() => navigate("/")}
        >
          Отмена
        </Button>
        <Button
          appearance="primary"
          dimension="xl"
          onClick={handleSave}
          disabled={
            !form.title || !form.category || !form.status || !form.priority
          }
        >
          Создать
        </Button>
      </div>
    </CreateTaskWrapper>
  );
}

export default CreateTaskPage;
