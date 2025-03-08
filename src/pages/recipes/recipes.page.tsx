import { useEffect, useState } from "react";
import { Box, Button, Pagination, TextField, Typography } from "@mui/material";

import { Loading } from "@/libs/components/components";
import { useDebounced } from "@/libs/hooks/hooks";

import { RecipesList } from "@/modules/recipes/components/components";
import {
	useCategories,
	useRecipes,
} from "@/modules/recipes/hooks/use-recipes.hook";

const RecipesPage: React.FC = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const { data: categories, isSuccess: isCategoriesSuccess } = useCategories();

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
			category: selectedCategory,
		},
	);

	const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(selectedCategory !== category ? category : null);
	};

	useEffect(() => {
		setPage(1);
	}, [debouncedSearch, selectedCategory]);

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

			{isCategoriesSuccess && (
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6">Filter by Category:</Typography>

					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
						{categories.map((category) => (
							<Button
								key={category.strCategory}
								color="primary"
								size="small"
								variant={
									selectedCategory === category.strCategory
										? "contained"
										: "outlined"
								}
								onClick={() => handleCategoryChange(category.strCategory)}
							>
								{category.strCategory}
							</Button>
						))}
					</Box>
				</Box>
			)}

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
