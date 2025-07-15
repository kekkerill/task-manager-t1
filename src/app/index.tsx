import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  DARK_THEME,
  FontsVTBGroup,
  DropdownProvider
} from "@admiral-ds/react-ui";
import App from "@app/App";
import "@app/styles/index.css";

/**
 * Точка входа приложения.
 * Монтирует App в DOM и оборачивает в ThemeProvider.
 */
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
