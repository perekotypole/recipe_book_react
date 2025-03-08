import { useMemo, useState } from "react";
import {
	Checkbox,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import type { RecipeItem } from "@/modules/recipes/types/types";
import { getIngredients } from "../../helpers/get-ingredients";

type RecipeIngredientsProperties = RecipeItem;

const RecipeIngredients: React.FC<RecipeIngredientsProperties> = (item) => {
	const ingredients = useMemo<
		Array<{
			ingredient: string;
			measure: string;
		}>
	>(() => getIngredients(item), [item]);

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

	return (
		<List>
			{ingredients.map(({ ingredient, measure }, index) => (
				<ListItemButton
					key={`${ingredient}-${index}`}
					onClick={handleToggle(index)}
					dense
				>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={checked.includes(index)}
							tabIndex={-1}
							disableRipple
						/>
					</ListItemIcon>

					<ListItemText
						id={`${ingredient}-${index}`}
						primary={`${measure} | ${ingredient}`}
					/>
				</ListItemButton>
			))}
		</List>
	);
};

export { RecipeIngredients };
