import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DefaultLayout } from "@/libs/layouts/layouts";
import { NotFound, RecipesPage } from "@/pages/pages";

import { theme } from "./theme";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./libs/components/error-fallback/error-fallback";

const router = createBrowserRouter([
	{
		element: (
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onError={(error, info) => {
					console.error("Caught an error:", error, info);
				}}
				onReset={() => {
					queryClient.clear();
				}}
			>
				<DefaultLayout />{" "}
			</ErrorBoundary>
		),
		children: [
			{
				path: "/",
				element: (
					<ErrorBoundary
						FallbackComponent={ErrorFallback}
						onError={(error, info) => {
							console.error("Caught an error:", error, info);
						}}
						onReset={() => {
							queryClient.clear();
						}}
					>
						<RecipesPage />
					</ErrorBoundary>
				),
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
