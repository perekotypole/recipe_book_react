import qs from "qs";

import { RecipeItem, RecipesList } from "../types/types";

const baseUrl = "https://www.themealdb.com/api/json/v1/1";

const getAllRecipes = async (search?: string): Promise<RecipesList> => {
	const paramsQuery = {
		s: search ?? "",
	};
	const paramsStr = qs.stringify(paramsQuery, { encode: false });
	const url = `${baseUrl}/search.php?${paramsStr}`;

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error("Failed to fetch recipes");
	}

	const data = (await res.json()) as {
		meals: Array<RecipeItem>;
	};

	return data.meals.map(({ idMeal, strMeal, strMealThumb }) => ({
		idMeal,
		strMeal,
		strMealThumb,
	}));
};

const getRecipeById = async (id: number): Promise<RecipeItem | null> => {
	const url = `${baseUrl}/lookup.php${id}`;

	const res = await fetch(url);

	if (!res.ok) {
		if (res.status === 404) {
			return null;
		} else {
			throw new Error("Failed to fetch recipe details");
		}
	}

	const data = (await res.json()) as {
		meals: Array<RecipeItem>;
	};

	return data.meals.at(0) ?? null;
};

export { getAllRecipes, getRecipeById };
