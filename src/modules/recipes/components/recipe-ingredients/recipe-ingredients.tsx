import {
	Checkbox,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import type { IngredientsList } from "@/modules/recipes/types/types";
import { useRecipeIngredients } from "./recipe-ingredients.hook";

export type RecipeIngredientsProperties = {
	ingredients: IngredientsList;
};

const RecipeIngredients: React.FC<RecipeIngredientsProperties> = (props) => {
	const { ingredients, handleToggle, checked } = useRecipeIngredients(props);

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
