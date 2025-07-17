import { Tag, Button } from "@admiral-ds/react-ui";
import styled from "styled-components";
import type { Task } from "@entities/task/model/taskStore";
import {
  categoryTagKind,
  statusTagKind,
  priorityTagKind,
  defaultTagKind
} from "@shared/config/constants";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import ConfirmModal from "@shared/ui/ConfirmModal";

const TaskCardStyled = styled.div`
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60, 60, 60, 0.07);
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  border: 1px solid #5c6063;
  min-width: 240px;

  @media (min-width: 900px) {
    min-width: 320px;
    padding: 24px 32px;
  }
  @media (min-width: 1400px) {
    min-width: 380px;
    padding: 32px 40px;
  }
`;

const TaskMeta = styled.div`
  display: flex;
  gap: 16px;
  color: #666;
  align-items: center;
  flex-wrap: wrap;
`;

const TitleLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #a2c7fa;
  }
`;

/**
 * Пропсы для компонента TaskCard.
 * @property {Task} task - Данные задачи
 * @property {(task: Task) => void} onEdit - Колбэк для редактирования
 * @property {(id: number) => void} onDelete - Колбэк для удаления
 */
type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

/**
 * Карточка задачи с основными данными, тегами и кнопками управления.
 * @param props
 */
function TaskCard({ task, onEdit, onDelete }: Props) {
  const categoryKind = categoryTagKind[task.category] || defaultTagKind;
  const statusKind = statusTagKind[task.status] || defaultTagKind;
  const priorityKind = priorityTagKind[task.priority] || defaultTagKind;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const created = task.createdAt
    ? format(new Date(task.createdAt), "dd.MM.yyyy HH:mm")
    : "";

  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmModal
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            onDelete(task.id);
          }}
        />
      )}
      <TaskCardStyled>
        <h3 style={{ margin: 0, width: "auto" }}>
          <TitleLink to={`/task/${task.id}`}>{task.title}</TitleLink>
        </h3>

        <p style={{ margin: 0, color: "#b4b4b4", wordBreak: "break-all" }}>
          {task.description}
        </p>
        <TaskMeta>
          <Tag kind={categoryKind} statusViaBackground>
            {task.category}
          </Tag>
          <Tag kind={statusKind} statusViaBackground>
            {task.status}
          </Tag>
          <Tag kind={priorityKind} statusViaBackground>
            {task.priority}
          </Tag>
          {created && (
            <span style={{ color: "#888", fontSize: 12, marginLeft: 8 }}>
              {created}
            </span>
          )}
        </TaskMeta>
        <TaskMeta>
          <Button dimension="s" onClick={() => onEdit(task)}>
            Редактировать
          </Button>
          <Button
            dimension="s"
            appearance="danger"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            Удалить
          </Button>
        </TaskMeta>
      </TaskCardStyled>
    </>
  );
}

export default TaskCard;
