import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import type { RecipesListItem } from "../../types/types";
import { Link } from "react-router";

type RecipesCardProperties = RecipesListItem;

const RecipesCard: React.FC<RecipesCardProperties> = ({
	idMeal,
	strMeal,
	strMealThumb,
}) => {
	return (
		<Link to={`recipe/${idMeal}`}>
			<Card
				sx={{
					cursor: "pointer",
					transition: "transform 0.3s",
					"&:hover": { transform: "scale(1.02)" },
				}}
			>
				<CardMedia
					component="img"
					height={240}
					image={strMealThumb}
					alt={strMeal}
					title={strMeal}
				/>

				<CardContent>
					<Typography variant="h6">{strMeal}</Typography>
				</CardContent>
			</Card>
		</Link>
	);
};

export { RecipesCard };
