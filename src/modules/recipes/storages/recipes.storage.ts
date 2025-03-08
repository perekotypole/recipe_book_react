import { useEffect, useState } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { RecipeDetails, RecipesList } from "../types/types";
import { getAllRecipes, getRecipeById } from "../requests/requests";

const queryKeys = {
	recipes: ["recipes"],
	recipe: (id: string) => ["recipes", id],
};

const useRecipes = ({
	search,
	itemsPerPage,
	currentPage,
	category,
}: {
	search: string;
	itemsPerPage: number;
	currentPage: number;
	category: string | null;
}) => {
	const { data, ...queryData } = useQuery({
		queryKey: ["recipes", search],
		queryFn: () => getAllRecipes(search),
	});

	const [paginatedData, setPaginatedData] = useState<RecipesList>([]);
	const [totalPages, setTotalPages] = useState<number>(0);

	useEffect(() => {
		if (data) {
			const filteredData =
				category !== null
					? data.filter((recipe) => recipe.strCategory === category)
					: data;

			const startIndex = (currentPage - 1) * itemsPerPage;
			const endIndex = startIndex + itemsPerPage;

			setPaginatedData(filteredData.slice(startIndex, endIndex));
			setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
		}
	}, [data, currentPage, itemsPerPage, category]);

	return {
		...queryData,
		data: paginatedData,
		currentPage,
		totalPages,
	};
};

const useRecipe = (id: number): UseQueryResult<RecipeDetails | null, Error> => {
	return useQuery({
		queryKey: queryKeys.recipe(String(id)),
		queryFn: () => getRecipeById(id),
		enabled: !!id,
	});
};

export { useRecipes, useRecipe };
