import { Tag, Button } from "@admiral-ds/react-ui";
import styled from "styled-components";
import type { Task } from "../store/store";
import {
  categoryTagKind,
  statusTagKind,
  priorityTagKind,
  defaultTagKind
} from "./constants";
import { Link } from "react-router-dom";

const TaskCardStyled = styled.div`
  background: transparent;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60, 60, 60, 0.07);
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
};

function TaskCard({ task, onEdit, onDelete }: Props) {
  const categoryKind = categoryTagKind[task.category] || defaultTagKind;
  const statusKind = statusTagKind[task.status] || defaultTagKind;
  const priorityKind = priorityTagKind[task.priority] || defaultTagKind;

  return (
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
        <Button dimension="s" onClick={() => onEdit(task)}>
          Редактировать
        </Button>
        <Button
          dimension="s"
          appearance="danger"
          onClick={() => onDelete(task.id)}
        >
          Удалить
        </Button>
      </TaskMeta>
    </TaskCardStyled>
  );
}

export default TaskCard;
