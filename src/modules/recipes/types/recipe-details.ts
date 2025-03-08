import { IngredientsList } from "./ingredients-list.type";
import { RecipeItem } from "./recipe-item.type";

type RecipeDetails = Pick<
	RecipeItem,
	| "idMeal"
	| "strMeal"
	| "strMealAlternate"
	| "strCategory"
	| "strArea"
	| "strInstructions"
	| "strMealThumb"
	| "strTags"
	| "strYoutube"
	| "strImageSource"
	| "strCreativeCommonsConfirmed"
	| "strSource"
	| "dateModified"
> &
	Record<"ingredients", IngredientsList>;

export type { RecipeDetails };
