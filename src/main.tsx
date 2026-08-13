import "@mantine/core/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppProvider from "./provider/AppProvider.tsx";
import App from "./App.tsx";
import { resolver, theme } from "./theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <BrowserRouter>
        <StrictMode>
          <MantineProvider
            defaultColorScheme="light"
            theme={theme}
            cssVariablesResolver={resolver}
          >
            <ReactQueryDevtools />
            <App />
          </MantineProvider>
        </StrictMode>
      </BrowserRouter>
    </AppProvider>
  </QueryClientProvider>,
);
