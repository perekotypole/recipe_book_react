import { Card, CardContent, CardMedia, Typography } from "@mui/material";

import type { RecipesListItem } from "../../types/types";

type RecipesCardProperties = RecipesListItem;

const RecipesCard: React.FC<RecipesCardProperties> = ({
	strMeal,
	strMealThumb,
}) => {
	return (
		<Card>
			<CardMedia sx={{ height: 240 }} image={strMealThumb} title={strMeal} />
			<CardContent>
				<Typography variant="h6">{strMeal}</Typography>
			</CardContent>
		</Card>
	);
};

export { RecipesCard };
