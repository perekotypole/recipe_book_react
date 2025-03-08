import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: React.FC<FallbackProps> = ({
	error,
	resetErrorBoundary,
}) => {
	return (
		<Stack role="alert" spacing={2}>
			<Alert severity="error" sx={{ width: "100%" }}>
				<AlertTitle>Error Details</AlertTitle>
				{error.message}
			</Alert>

			<Button
				variant="contained"
				color="secondary"
				onClick={resetErrorBoundary}
			>
				Try Again
			</Button>
		</Stack>
	);
};

export { ErrorFallback };
