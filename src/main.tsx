import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import {
	ErrorFallback,
	queryClient,
	QueryProvider,
} from "@/libs/components/components";
import { DefaultLayout } from "@/libs/layouts/layouts";
import { NotFound } from "@/pages/pages";

import {
	RecipePage,
	RecipesCartPage,
	RecipesPage,
} from "@/modules/recipes/pages/pages";

import { theme } from "./theme";

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
				<DefaultLayout />
			</ErrorBoundary>
		),
		children: [
			{
				path: "/",
				element: <RecipesPage />,
			},
			{
				path: "/recipe/:id",
				element: <RecipePage />,
			},
			{
				path: "/cart",
				element: <RecipesCartPage />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<QueryProvider>
				<RouterProvider router={router} />
			</QueryProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
