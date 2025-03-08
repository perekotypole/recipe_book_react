import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { RecipeItem, RecipesList } from "../types/types";
import { getAllRecipes, getRecipeById } from "../requests/requests";
import { useEffect, useState } from "react";

type UseRecipesProps = {
	search: string;
	itemsPerPage: number;
	currentPage: number;
};

const queryKeys = {
	recipes: ["recipes"],
	recipe: (id: string) => ["recipes", id],
};

const useRecipesQuery = (
	search: string,
): UseQueryResult<RecipesList, Error> => {
	return useQuery({
		queryKey: ["recipes", search],
		queryFn: () => getAllRecipes(search),
	});
};

const useRecipes = ({ search, itemsPerPage, currentPage }: UseRecipesProps) => {
	const { data, ...queryData } = useRecipesQuery(search);

	const [paginatedData, setPaginatedData] = useState<RecipesList>([]);
	const [totalPages, setTotalPages] = useState<number>(0);

	useEffect(() => {
		if (data) {
			const startIndex = (currentPage - 1) * itemsPerPage;
			const endIndex = startIndex + itemsPerPage;

			setPaginatedData(data.slice(startIndex, endIndex));
			setTotalPages(Math.ceil(data.length / itemsPerPage));
		}
	}, [data, currentPage, itemsPerPage]);

	return {
		...queryData,
		data: paginatedData,
		currentPage,
		totalPages,
	};
};

const useRecipe = (id: number): UseQueryResult<RecipeItem, Error> => {
	return useQuery({
		queryKey: queryKeys.recipe(String(id)),
		queryFn: () => getRecipeById(id),
		enabled: !!id,
	});
};

export { queryKeys as recipeQueryKeys, useRecipes, useRecipe };
