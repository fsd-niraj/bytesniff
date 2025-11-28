import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css"
import App from "./App";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
