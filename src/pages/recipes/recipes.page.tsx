import { useState } from "react";
import { Pagination, Typography } from "@mui/material";

import { Loading } from "@/libs/components/components";

import { RecipesList } from "@/modules/recipes/components/components";
import { useRecipes } from "@/modules/recipes/hooks/use-recipes";

const RecipesPage: React.FC = () => {
	const [page, setPage] = useState(1);
	const { data, isSuccess, isLoading, isError, error, totalPages } = useRecipes(
		{
			search: "",
			itemsPerPage: 10,
			currentPage: page,
		},
	);

	const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

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

			{isSuccess && (
				<>
					<RecipesList list={data} />

					{totalPages > 1 && (
						<Pagination
							count={totalPages}
							page={page}
							onChange={handleChange}
							sx={{ mt: 2 }}
						/>
					)}
				</>
			)}
		</div>
	);
};

export { RecipesPage };
