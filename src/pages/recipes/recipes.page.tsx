import { Typography } from "@mui/material";

import type { RecipesList as TRecipesList } from "@/modules/recipes/types/types";
import { RecipesList } from "@/modules/recipes/components/components";

const items: TRecipesList = [
	{
		idMeal: 1,
		strMeal: "meal 1",
		strMealThumb: "",
	},
	{
		idMeal: 2,
		strMeal: "meal 2",
		strMealThumb: "",
	},
	{
		idMeal: 3,
		strMeal: "meal 3",
		strMealThumb: "",
	},
];

const RecipesPage: React.FC = () => {
	return (
		<div>
			<Typography
				variant="h2"
				component="h2"
				sx={{
					marginBottom: 4,
				}}
			>
				Recipe Book
			</Typography>

			<RecipesList list={items} />
		</div>
	);
};

export { RecipesPage };
