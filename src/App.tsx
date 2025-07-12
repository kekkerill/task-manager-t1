import styled from "styled-components";
import { T } from "@admiral-ds/react-ui";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";

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

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppWrapper>
        <CustomT font="Main/L" forwardedAs="h2">
          Task Manager
        </CustomT>
        <Routes>
          <Route
            path="/"
            element={<Home modalOpen={modalOpen} setModalOpen={setModalOpen} />}
          />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
