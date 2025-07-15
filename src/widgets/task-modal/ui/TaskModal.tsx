import {
  Modal,
  ModalTitle,
  ModalButtonPanel,
  Button
} from "@admiral-ds/react-ui";
import type { TaskForm } from "@entities/task/model/taskStore";
import type { ChangeEvent } from "react";
import TaskFormFields from "@features/task-edit/ui/TaskFormFields";
import { useMediaQuery } from "react-responsive";

/**
 * Пропсы для TaskModal.
 * @property {boolean} open
 * @property {string} title
 * @property {TaskForm} form
 * @property {(field: keyof TaskForm) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void} onChange
 * @property {() => void} onSave
 * @property {() => void} onClose
 * @property {string} [saveLabel]
 * @property {boolean} [disabled]
 */
type Props = {
  open: boolean;
  title: string;
  form: TaskForm;
  onChange: (
    field: keyof TaskForm
  ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onClose: () => void;
  saveLabel?: string;
  disabled?: boolean;
};

/**
 * Модальное окно для создания/редактирования задачи.
 * @param props
 */
function TaskModal({
  open,
  title,
  form,
  onChange,
  onSave,
  onClose,
  saveLabel = "Сохранить",
  disabled
}: Props) {
  const isMobile = useMediaQuery({ maxWidth: 819 });
  if (!open) return null;
  return (
    <Modal
      mobile={isMobile}
      dimension="xl"
      style={{ padding: 40, gap: 10 }}
      onClose={onClose}
    >
      <ModalTitle>{title}</ModalTitle>
      <TaskFormFields
        dimension={isMobile ? "s" : "xl"}
        form={form}
        onChange={onChange}
      />
      <ModalButtonPanel>
        <Button
          appearance="primary"
          dimension="xl"
          onClick={onSave}
          disabled={disabled}
        >
          {saveLabel}
        </Button>
        <Button appearance="secondary" dimension="xl" onClick={onClose}>
          Отмена
        </Button>
      </ModalButtonPanel>
    </Modal>
  );
}

export default TaskModal;
