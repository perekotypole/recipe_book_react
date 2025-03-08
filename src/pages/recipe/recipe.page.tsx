import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { useRecipe } from "@/modules/recipes/hooks/use-recipes.hook";
import { Loading, BackButton } from "@/libs/components/components";

import { RecipeDetails } from "@/modules/recipes/components/components";

import { NotFound } from "../pages";

const RecipePage: React.FC = () => {
	const { id } = useParams();
	const { data, isLoading, isSuccess, isError, error } = useRecipe(Number(id));

	if (isError) {
		throw error;
	}

	if (data === null) {
		return <NotFound />;
	}

	return (
		<div>
			<Box sx={{ mb: 2 }}>
				<BackButton />
			</Box>

			{isLoading && <Loading />}

			{isSuccess && (
				<>
					<Typography
						variant="h2"
						component="h2"
						sx={{
							marginBottom: 4,
						}}
					>
						{data.strMeal}
					</Typography>

					<RecipeDetails {...data} />
				</>
			)}
		</div>
	);
};

export { RecipePage };
