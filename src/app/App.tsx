import styled from "styled-components";
import { T } from "@admiral-ds/react-ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/home/ui/Home";
import TaskDetails from "@pages/task-details/ui/TaskDetails";
import CreateTaskPage from "@pages/task-new/ui/CreateTaskPage";

const AppWrapper = styled.div`
  width: 90%;
  max-width: 1400px;
  min-width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1600px) {
    max-width: 1800px;
  }
`;
const CustomT = styled(T)`
  white-space: nowrap;
`;

/*
 * Корневой компонент приложения.
 * Отвечает за роутинг и глобальное оформление.
 */
function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <CustomT font="Main/L" forwardedAs="h2">
          Task Manager
        </CustomT>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/new" element={<CreateTaskPage />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
