import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

import type { RecipeItem } from "../../types/types";
import { RecipeIngredients } from "./libs/components/components";

type RecipeDetailsProperties = RecipeItem;

const RecipeDetails: React.FC<RecipeDetailsProperties> = (item) => {
	return (
		<Box padding={3}>
			<Card>
				<CardMedia
					component="img"
					sx={{
						height: "min(450px, 40vh)",
					}}
					image={item.strMealThumb}
					alt={item.strMeal}
				/>
				<CardContent>
					<Typography variant="h4">{item.strMeal}</Typography>

					<Typography variant="subtitle1" color="textSecondary">
						{item.strCategory} | {item.strArea}
					</Typography>

					<Typography variant="body1" component="p">
						<strong>Instructions:</strong> {item.strInstructions}
					</Typography>

					<Box>
						<Typography variant="h6">Ingredients:</Typography>

						<RecipeIngredients {...item} />
					</Box>

					{item.strYoutube && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => window.open(item.strYoutube, "_blank")}
							fullWidth
							sx={{ marginTop: 2 }}
						>
							Watch Recipe Video
						</Button>
					)}
				</CardContent>
			</Card>
		</Box>
	);
};

export { RecipeDetails };
