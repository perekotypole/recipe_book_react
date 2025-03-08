import { RecipeItem } from "./recipe-item.type";

type RecipesListItem = Pick<
	RecipeItem,
	"idMeal" | "strMeal" | "strMealThumb" | "strArea" | "strCategory"
>;

export type { RecipesListItem };
