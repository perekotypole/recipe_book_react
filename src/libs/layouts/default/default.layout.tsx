import { Outlet } from "react-router";
import { Container } from "@mui/material";

const DefaultLayout: React.FC = () => {
	return (
		<Container maxWidth="lg" style={{ padding: "15px" }}>
			<Outlet />
		</Container>
	);
};

export { DefaultLayout };
