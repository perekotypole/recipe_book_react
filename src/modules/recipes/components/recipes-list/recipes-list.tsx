import { Grid2 as Grid, Typography } from "@mui/material";

import type { RecipesList as TRecipesList } from "../../types/types";
import { RecipesCard } from "../recipes-card/recipes-card";

type RecipesListProperties = {
	list: TRecipesList;
};

const RecipesList: React.FC<RecipesListProperties> = ({ list }) => {
	if (list.length === 0) {
		return (
			<Typography variant="body1">We couldn't find any recipes</Typography>
		);
	}

	return (
		<Grid container spacing={3}>
			{list.map((item) => (
				<Grid key={item.idMeal} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
					<RecipesCard item={item} isLink />
				</Grid>
			))}
		</Grid>
	);
};

export { RecipesList };
