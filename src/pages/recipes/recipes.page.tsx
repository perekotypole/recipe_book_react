import { Typography } from "@mui/material";

import { Loading } from "@/libs/components/components";

import { RecipesList } from "@/modules/recipes/components/components";
import { useRecipes } from "@/modules/recipes/hooks/use-recipes";

const RecipesPage: React.FC = () => {
	const { data, isSuccess, isLoading, isError, error } = useRecipes("");

	if (isError) {
		throw error;
	}

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

			{isLoading && <Loading />}
			{isSuccess && <RecipesList list={data} />}
		</div>
	);
};

export { RecipesPage };
