import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/");
		}
	};

	return (
		<Button
			variant="contained"
			color="secondary"
			onClick={handleGoBack}
			size="small"
		>
			Go Back
		</Button>
	);
};

export { BackButton };
