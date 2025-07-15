import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "@admiral-ds/react-ui";
import { useUnit } from "effector-react";
import {
  $taskModel,
  updateTask,
  createTask
} from "@entities/task/model/taskStore";
import type { TaskForm } from "@entities/task/model/taskStore";
import TaskFormFields from "@features/task-edit/ui/TaskFormFields";
import type { Task } from "@entities/task/model/taskStore";

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
  const { tasks } = useUnit($taskModel);
  const update = useUnit(updateTask);
  const create = useUnit(createTask);
  const task = tasks.find((t: Task) => t.id === Number(id));
  const prevTasksCount = useRef(tasks.length);

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

  useEffect(() => {
    if (!task && tasks.length > prevTasksCount.current) {
      const last = tasks[tasks.length - 1];
      if (last) navigate(`/task/${last.id}`);
    }
    prevTasksCount.current = tasks.length;
  }, [tasks, task, navigate]);

  const handleEditChange =
    (field: keyof TaskForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditForm((f) => ({
        ...f,
        [field]: e.target.value
      }));
    };

  const handleEditSave = () => {
    if (task) {
      update({ id: task.id, task: editForm });
    } else {
      create(editForm);
      // редирект произойдёт в useEffect
    }
  };

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
