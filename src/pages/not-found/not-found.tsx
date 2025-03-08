import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<Container sx={{ textAlign: "center", mt: 10 }}>
			<Typography variant="h1" color="primary">
				404
			</Typography>

			<Typography variant="h5" sx={{ mb: 3 }}>
				Oops! The page you're looking for doesn't exist.
			</Typography>

			<Box>
				<Button variant="contained" color="primary" component={Link} to="/">
					Go Home
				</Button>
			</Box>
		</Container>
	);
};

export { NotFound };
