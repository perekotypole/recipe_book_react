import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
	cssVariables: true,
	palette: {
		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#f2f2f2",
		},
		error: {
			main: red.A400,
		},
	},
});

export { theme };
