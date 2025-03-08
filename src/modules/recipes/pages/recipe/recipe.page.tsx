import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { NotFound } from "@/pages/pages";
import { Loading, BackButton } from "@/libs/components/components";

import { useRecipe } from "@/modules/recipes/storages/storages";
import { RecipeDetails } from "@/modules/recipes/components/components";

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
		<Box>
			<Box sx={{ mb: 2 }}>
				<BackButton />
			</Box>

			{isLoading && <Loading />}

			{isSuccess && (
				<>
					<Typography
						variant="h2"
						sx={{
							marginBottom: 4,
						}}
					>
						{data.strMeal}
					</Typography>

					<RecipeDetails {...data} />
				</>
			)}
		</Box>
	);
};

export { RecipePage };
