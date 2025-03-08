import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

import type { RecipesListItem } from "../../types/types";
import { Link } from "react-router";

type RecipesCardProperties = RecipesListItem;

const RecipesCard: React.FC<RecipesCardProperties> = ({
	idMeal,
	strMeal,
	strMealThumb,
	strArea,
	strCategory,
}) => {
	return (
		<Link to={`recipe/${idMeal}`} style={{ textDecoration: "none" }}>
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
					<Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
						{strMeal}
					</Typography>

					<Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
						{strCategory && (
							<Typography variant="body2" color="text.secondary">
								{strCategory}
							</Typography>
						)}

						{strArea && (
							<Typography variant="body2" color="text.secondary">
								{strArea}
							</Typography>
						)}
					</Box>
				</CardContent>
			</Card>
		</Link>
	);
};

export { RecipesCard };
