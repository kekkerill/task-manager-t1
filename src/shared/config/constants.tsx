export const categories = [
  { value: "", label: "Все категории" },
  { value: "Bug", label: "Bug" },
  { value: "Feature", label: "Feature" },
  { value: "Documentation", label: "Documentation" },
  { value: "Refactor", label: "Refactor" },
  { value: "Test", label: "Test" }
];
export const statuses = [
  { value: "", label: "Все статусы" },
  { value: "To do", label: "To Do" },
  { value: "In progress", label: "In progress" },
  { value: "Done", label: "Done" }
];
export const priorities = [
  { value: "", label: "Любой приоритет" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" }
];
type TagKind = {
  background: string;
  border: string;
  backgroundHover?: string;
};

export const categoryTagKind: Record<string, TagKind> = {
  Bug: {
    background: "transparent",
    border: "var(--admiral-color-Error_Error60, #F53C3C)"
  },
  Feature: {
    background: "transparent",
    border: "var(--admiral-color-Purple_Purple60, #A259FF)"
  },
  Documentation: {
    background: "transparent",
    border: "var(--admiral-color-Blue_Blue60, #005BFF)"
  },
  Refactor: {
    background: "transparent",
    border: "var(--admiral-color-Orange_Orange60, #FF8C00)"
  },
  Test: {
    background: "transparent",
    border: "var(--admiral-color-Green_Green60, #00B755)"
  }
};

export const statusTagKind: Record<string, TagKind> = {
  "To do": {
    background: "transparent",
    border: "var(--admiral-color-Yellow_Yellow60, #FFD600)"
  },
  "In progress": {
    background: "transparent",
    border: "var(--admiral-color-Blue_Blue60, #005BFF)"
  },
  Done: {
    background: "transparent",
    border: "var(--admiral-color-Green_Green60, #00B755)"
  }
};

export const priorityTagKind: Record<string, TagKind> = {
  High: {
    background: "transparent",
    border: "var(--admiral-color-Error_Error60, #F53C3C)"
  },
  Medium: {
    background: "transparent",
    border: "var(--admiral-color-Orange_Orange60, #FF8C00)"
  },
  Low: {
    background: "transparent",
    border: "var(--admiral-color-Yellow_Yellow60, #FFD600)"
  }
};

export const defaultTagKind: TagKind = {
  background: "transparent",
  border: "var(--admiral-color-Neutral_Neutral30, #b4b4b4)"
};
