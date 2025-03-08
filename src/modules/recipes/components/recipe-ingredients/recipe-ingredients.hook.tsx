import { useState } from "react";
import { RecipeIngredientsProperties } from "./recipe-ingredients";

const useRecipeIngredients = ({ ingredients }: RecipeIngredientsProperties) => {
	const [checked, setChecked] = useState<Array<number>>([]);

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const uniqueIngredients = new Map<string, string>();

	ingredients.forEach(({ ingredient, measure }) => {
		if (uniqueIngredients.has(ingredient)) {
			uniqueIngredients.set(
				ingredient,
				`${uniqueIngredients.get(ingredient)} + ${measure}`,
			);
		} else {
			uniqueIngredients.set(ingredient, measure);
		}
	});

	const finalIngredientsList = Array.from(uniqueIngredients.entries()).map(
		([ingredient, measure]) => ({ ingredient, measure }),
	);

	return {
		checked,
		handleToggle,
		ingredients: finalIngredientsList,
	};
};

export { useRecipeIngredients };
