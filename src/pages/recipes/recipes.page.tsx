import { useEffect, useState } from "react";
import { Pagination, TextField, Typography } from "@mui/material";

import { Loading } from "@/libs/components/components";
import { useDebounced } from "@/libs/hooks/hooks";

import { RecipesList } from "@/modules/recipes/components/components";
import { useRecipes } from "@/modules/recipes/hooks/use-recipes.hook";

const RecipesPage: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const {
		value: debouncedSearch,
		localValue: localSearchValue,
		onChange: onSearchChange,
	} = useDebounced({
		value: search,
		onChangeDelay: (value: string) => setSearch(value),
	});

	const { data, isSuccess, isLoading, isError, error, totalPages } = useRecipes(
		{
			search: debouncedSearch,
			itemsPerPage: 10,
			currentPage: page,
		},
	);

	const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	useEffect(() => {
		setPage(1);
	}, [debouncedSearch]);

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

			<TextField
				label="Search Recipes"
				variant="outlined"
				fullWidth
				value={localSearchValue}
				onChange={(e) => onSearchChange(e.target.value)}
				sx={{ mb: 4 }}
			/>

			{isLoading && <Loading />}

			{isSuccess && <RecipesList list={data} />}

			{totalPages > 1 && (
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					sx={{ mt: 2 }}
				/>
			)}
		</div>
	);
};

export { RecipesPage };
