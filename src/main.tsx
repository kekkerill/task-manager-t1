import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  DARK_THEME,
  FontsVTBGroup,
  DropdownProvider
} from "@admiral-ds/react-ui";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={DARK_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <App />
      </DropdownProvider>
    </ThemeProvider>
  </React.StrictMode>
);
