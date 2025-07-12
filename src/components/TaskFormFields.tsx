import { InputField, SelectField, Option } from "@admiral-ds/react-ui";
import type { ChangeEvent } from "react";
import type { TaskForm } from "../store/store";
import { categories, statuses, priorities } from "./constants";
type Props = {
  dimension: "xl" | "m" | "s";
  form: TaskForm;
  onChange: (
    field: keyof TaskForm
  ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

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
        {categories.slice(1).map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </SelectField>
      <SelectField
        dimension={dimension}
        label="Статус"
        required
        value={form.status}
        onChange={onChange("status")}
      >
        {statuses.slice(1).map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </SelectField>
      <SelectField
        dimension={dimension}
        label="Приоритет"
        required
        value={form.priority}
        onChange={onChange("priority")}
      >
        {priorities.slice(1).map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </SelectField>
    </>
  );
}

export default TaskFormFields;
