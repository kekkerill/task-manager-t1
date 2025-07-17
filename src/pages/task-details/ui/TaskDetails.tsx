import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@admiral-ds/react-ui";
import TaskFormFields from "@features/task-edit/ui/TaskFormFields";
import type { TaskForm, Task } from "@entities/task/model/taskStore";
import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "/api") + "/tasks";

const DetailsWrapper = styled.div`
  margin-top: 40px;
  background: #23272e;
  border-radius: 12px;
  padding: 32px;
  min-width: 350px;
  color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.09);
`;

/**
 * Страница задачи: редактирование или создание, если задача не найдена.
 *
 * useEffect отслеживает появление новой задачи и делает редирект на неё.
 */
function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState<TaskForm>({
    title: "",
    description: "",
    category: "",
    status: "",
    priority: ""
  });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get<Task>(`${API_URL}/${id}`)
        .then((res) => {
          setTask(res.data);
          setEditForm({
            title: res.data.title,
            description: res.data.description,
            category: res.data.category,
            status: res.data.status,
            priority: res.data.priority
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleEditChange =
    (field: keyof TaskForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleEditSave = async () => {
    if (id && task) {
      await axios.patch(`${API_URL}/${id}`, editForm);
      navigate("/");
    } else {
      await axios.post(API_URL, editForm);
      navigate("/");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <DetailsWrapper>
      <h2 style={{ marginTop: 0 }}>
        {task ? "Редактировать задачу" : "Создать задачу"}
      </h2>
      <TaskFormFields
        dimension="xl"
        form={editForm}
        onChange={handleEditChange}
      />
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <Button
          appearance="primary"
          dimension="xl"
          onClick={handleEditSave}
          disabled={
            !editForm.title ||
            !editForm.category ||
            !editForm.status ||
            !editForm.priority
          }
        >
          {task ? "Сохранить" : "Создать"}
        </Button>
        <Button
          style={{ marginLeft: 16 }}
          appearance="secondary"
          onClick={() => navigate("/")}
        >
          Назад
        </Button>
      </div>
    </DetailsWrapper>
  );
}

export default TaskDetails;
