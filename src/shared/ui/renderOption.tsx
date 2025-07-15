import { Option } from "@admiral-ds/react-ui";

export function renderOption(o: { value: string; label: string }) {
  return (
    <Option key={o.value} value={o.value}>
      {o.label}
    </Option>
  );
}
