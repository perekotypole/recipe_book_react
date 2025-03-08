import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { Loading } from "@/libs/components/components";

import { RecipesList } from "@/modules/recipes/components/components";
import { getAllRecipes } from "@/modules/recipes/requests/requests";

const RecipesPage: React.FC = () => {
	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ["recipes"],
		queryFn: () => getAllRecipes(),
	});

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
