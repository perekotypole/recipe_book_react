import { Card, CardContent, Typography } from "@mui/material";

import type { RecipesListItem } from "../../types/types";

type RecipesCardProperties = RecipesListItem;

const RecipesCard: React.FC<RecipesCardProperties> = ({ strMeal }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant="h6">{strMeal}</Typography>
			</CardContent>
		</Card>
	);
};

export { RecipesCard };
