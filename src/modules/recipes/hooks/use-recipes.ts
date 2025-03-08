import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { RecipeItem, RecipesList } from "../types/types";
import { getAllRecipes, getRecipeById } from "../requests/requests";

const queryKeys = {
	recipes: ["recipes"],
	recipe: (id: string) => ["recipes", id],
};

const useRecipes = (search: string): UseQueryResult<RecipesList, Error> => {
	return useQuery({
		queryKey: queryKeys.recipes,
		queryFn: () => getAllRecipes(search),
	});
};

const useRecipe = (id: number): UseQueryResult<RecipeItem, Error> => {
	return useQuery({
		queryKey: queryKeys.recipe(String(id)),
		queryFn: () => getRecipeById(id),
		enabled: !!id,
	});
};

export { queryKeys as recipeQueryKeys, useRecipes, useRecipe };
