import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading: React.FC = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100%"
			width="100%"
		>
			<CircularProgress />
		</Box>
	);
};

export { Loading };
