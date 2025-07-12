import { Button, Option, Select } from "@admiral-ds/react-ui";
import styled from "styled-components";
import { useTaskStore } from "../store/store";
import { categories, statuses, priorities } from "./constants";
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 30px;
  gap: 30px;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
const CustomSelect = styled(Select)`
  border-radius: 4px;
  width: 200px;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

function TaskListHeader({ onCreate }: { onCreate: () => void }) {
  const { filters, setFilters } = useTaskStore();

  return (
    <Header>
      <Button dimension="l" onClick={onCreate}>
        Создать задачу
      </Button>
      <FilterWrapper>
        <CustomSelect
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
        >
          {categories.map((o) => (
            <Option key={o.value} value={o.value}>
              {o.label}
            </Option>
          ))}
        </CustomSelect>
        <CustomSelect
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value })}
        >
          {statuses.map((o) => (
            <Option key={o.value} value={o.value}>
              {o.label}
            </Option>
          ))}
        </CustomSelect>
        <CustomSelect
          value={filters.priority}
          onChange={(e) => setFilters({ priority: e.target.value })}
        >
          {priorities.map((o) => (
            <Option key={o.value} value={o.value}>
              {o.label}
            </Option>
          ))}
        </CustomSelect>
      </FilterWrapper>
    </Header>
  );
}

export default TaskListHeader;
