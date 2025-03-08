import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { CategoryItem, RecipeItem, RecipesList } from "../types/types";
import {
	getAllRecipes,
	getCategories,
	getRecipeById,
} from "../requests/requests";
import { useEffect, useState } from "react";

const queryKeys = {
	recipes: ["recipes"],
	recipe: (id: string) => ["recipes", id],
	categories: ["categories"],
};

const useRecipesQuery = (
	search: string,
): UseQueryResult<RecipesList, Error> => {
	return useQuery({
		queryKey: ["recipes", search],
		queryFn: () => getAllRecipes(search),
	});
};

type UseRecipesProperties = {
	search: string;
	itemsPerPage: number;
	currentPage: number;
	category: string | null;
};

const useRecipes = ({
	search,
	itemsPerPage,
	currentPage,
	category,
}: UseRecipesProperties) => {
	const { data, ...queryData } = useRecipesQuery(search);

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

const useRecipe = (id: number): UseQueryResult<RecipeItem, Error> => {
	return useQuery({
		queryKey: queryKeys.recipe(String(id)),
		queryFn: () => getRecipeById(id),
		enabled: !!id,
	});
};

const useCategories = (): UseQueryResult<Array<CategoryItem>, Error> => {
	return useQuery({
		queryKey: queryKeys.categories,
		queryFn: () => getCategories(),
	});
};

export { queryKeys as recipeQueryKeys, useRecipes, useRecipe, useCategories };
