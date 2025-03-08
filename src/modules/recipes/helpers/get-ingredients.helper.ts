import type {
	IngredientsList,
	RecipeItem,
} from "@/modules/recipes/types/types";

const getIngredients = (recipe: RecipeItem): IngredientsList => {
	return Array.from({ length: 20 }, (_, i) => {
		const ingredient = recipe[`strIngredient${i + 1}` as keyof RecipeItem];
		const measure = recipe[`strMeasure${i + 1}` as keyof RecipeItem];

		return ingredient && (ingredient as string).trim() !== ""
			? {
					ingredient,
					measure: measure || "To taste",
				}
			: null;
	}).filter(
		(item): item is { ingredient: string; measure: string } => item !== null,
	);
};

export { getIngredients };
