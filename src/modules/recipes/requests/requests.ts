import qs from "qs";

import {
	CategoryItem,
	RecipeDetails,
	RecipeItem,
	RecipesList,
} from "../types/types";
import { getIngredients } from "../helpers/get-ingredients.helper";

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

	return (data.meals ?? []).map(
		({ idMeal, strMeal, strMealThumb, strArea, strCategory }) => ({
			idMeal,
			strMeal,
			strMealThumb,
			strArea,
			strCategory,
		}),
	);
};

const getRecipeById = async (id: number): Promise<RecipeDetails | null> => {
	const paramsQuery = {
		i: String(id),
	};
	const paramsStr = qs.stringify(paramsQuery, { encode: false });
	const url = `${baseUrl}/lookup.php?${paramsStr}`;

	const res = await fetch(url);

	if (!res.ok) {
		if (res.status === 404) {
			return null;
		} else {
			throw new Error("Failed to fetch recipe details");
		}
	}

	const data = await res.json();

	if (!Array.isArray(data.meals)) {
		throw new Error(data.meals);
	}

	const item = (data as { meals: Array<RecipeItem> }).meals.at(0) ?? null;

	if (item === null) {
		return null;
	}

	const ingredients = getIngredients(item);

	return {
		...item,
		ingredients,
	};
};

const getCategories = async (): Promise<Array<CategoryItem>> => {
	const url = `${baseUrl}/categories.php`;
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error("Failed to fetch recipes categories");
	}

	const data = (await res.json()) as {
		categories: Array<CategoryItem>;
	};

	if (!Array.isArray(data.categories)) {
		throw new Error(data.categories);
	}

	return data.categories;
};

export { getAllRecipes, getRecipeById, getCategories };
