import { InputField, SelectField } from "@admiral-ds/react-ui";
import type { ChangeEvent } from "react";
import type { TaskForm } from "@entities/task/model/taskStore";
import { categories, statuses, priorities } from "@shared/config/constants";
import { renderOption } from "@shared/ui/renderOption";

/**
 * Пропсы для компонента TaskFormFields.
 * @property {('xl'|'m'|'s')} dimension - Размер полей
 * @property {TaskForm} form - Данные формы
 * @property {(field: keyof TaskForm) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void} onChange - Обработчик изменений
 */
type Props = {
  dimension: "xl" | "m" | "s";
  form: TaskForm;
  onChange: (
    field: keyof TaskForm
  ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

/**
 * Универсальные поля формы для создания/редактирования задачи.
 * @param props
 */
function TaskFormFields({ dimension, form, onChange }: Props) {
  return (
    <>
      <InputField
        dimension={dimension}
        label="Название"
        required
        value={form.title}
        onChange={onChange("title")}
      />
      <InputField
        dimension={dimension}
        label="Описание"
        value={form.description}
        onChange={onChange("description")}
      />
      <SelectField
        dimension={dimension}
        label="Категория"
        required
        value={form.category}
        onChange={onChange("category")}
      >
        {categories.slice(1).map(renderOption)}
      </SelectField>
      <SelectField
        dimension={dimension}
        label="Статус"
        required
        value={form.status}
        onChange={onChange("status")}
      >
        {statuses.slice(1).map(renderOption)}
      </SelectField>
      <SelectField
        dimension={dimension}
        label="Приоритет"
        required
        value={form.priority}
        onChange={onChange("priority")}
      >
        {priorities.slice(1).map(renderOption)}
      </SelectField>
    </>
  );
}

export default TaskFormFields;
