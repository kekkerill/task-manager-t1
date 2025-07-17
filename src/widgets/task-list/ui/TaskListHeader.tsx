import { Button, Select } from "@admiral-ds/react-ui";
import styled from "styled-components";
import { useUnit } from "effector-react";
import { $filters, setFilters } from "@entities/task/model/taskStore";
import { categories, statuses, priorities } from "@shared/config/constants";
import { renderOption } from "@shared/ui/renderOption";
import { useNavigate } from "react-router-dom";

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
  @media (max-width: 980px) {
    justify-content: space-between;
  }
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;
const CustomSelect = styled(Select)`
  border-radius: 4px;
  width: 200px;
  @media (max-width: 780px) {
    width: 100%;
  }
`;
const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

/**
 * Хедер списка задач с фильтрами и кнопкой создания задачи.
 */
function TaskListHeader() {
  const filters = useUnit($filters);
  const setFilter = useUnit(setFilters);
  const navigate = useNavigate();
  return (
    <Header>
      <Button dimension="l" onClick={() => navigate("/task/new")}>
        Создать задачу
      </Button>
      <FilterWrapper>
        <SelectWrapper>
          <CustomSelect
            value={filters.category}
            onChange={(e) => setFilter({ category: e.target.value })}
            displayClearIcon={filters.category ? true : false}
          >
            {categories.map(renderOption)}
          </CustomSelect>
        </SelectWrapper>
        <SelectWrapper>
          <CustomSelect
            value={filters.status}
            onChange={(e) => setFilter({ status: e.target.value })}
            displayClearIcon={filters.status ? true : false}
          >
            {statuses.map(renderOption)}
          </CustomSelect>
        </SelectWrapper>
        <SelectWrapper>
          <CustomSelect
            value={filters.priority}
            onChange={(e) => setFilter({ priority: e.target.value })}
            displayClearIcon={filters.priority ? true : false}
          >
            {priorities.map(renderOption)}
          </CustomSelect>
        </SelectWrapper>
      </FilterWrapper>
    </Header>
  );
}

export default TaskListHeader;
