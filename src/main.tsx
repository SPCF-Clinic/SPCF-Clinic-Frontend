import "@mantine/core/styles.css";
import "@/styles/App.css";

import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import AppProvider from "./provider/AppProvider.tsx";
import { queryClient } from "./services/query-client.ts";
import { resolver, theme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<AppProvider>
			<BrowserRouter>
				<NuqsAdapter>
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
				</NuqsAdapter>
			</BrowserRouter>
		</AppProvider>
	</QueryClientProvider>,
);
