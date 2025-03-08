import { Grid2 as Grid } from "@mui/material";

import type { RecipesList as TRecipesList } from "../../types/types";
import { RecipesCard } from "../recipes-card/recipes-card";

type RecipesListProperties = {
	list: TRecipesList;
};

const RecipesList: React.FC<RecipesListProperties> = ({ list }) => {
	return (
		<Grid container spacing={3}>
			{list.map((item) => (
				<Grid key={item.idMeal} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
					<RecipesCard {...item} />
				</Grid>
			))}
		</Grid>
	);
};

export { RecipesList };
