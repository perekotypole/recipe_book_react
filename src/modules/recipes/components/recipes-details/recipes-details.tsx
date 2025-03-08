import { useCallback } from "react";
import { useNavigate } from "react-router";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";

import type { RecipeDetails as TRecipeDetails } from "../../types/types";
import { RecipeIngredients } from "../recipe-ingredients/recipe-ingredients";
import { useCart } from "../../storages/cart.storage";

type RecipeDetailsProperties = TRecipeDetails;

const RecipeDetails: React.FC<RecipeDetailsProperties> = (item) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();

	const handleWantToCookClick = useCallback(() => {
		addToCart(item);
		navigate("/cart");
	}, [navigate, addToCart, item]);

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
					<Typography variant="h4">
						{item.strMeal}{" "}
						<Button
							variant="contained"
							color="secondary"
							onClick={handleWantToCookClick}
							size="small"
						>
							want to cook
						</Button>
					</Typography>

					<Typography variant="subtitle1" color="textSecondary">
						{item.strCategory} | {item.strArea}
					</Typography>

					<Typography variant="body1" component="p">
						<strong>Instructions:</strong> {item.strInstructions}
					</Typography>

					<Box>
						<Typography variant="h6">Ingredients:</Typography>

						<RecipeIngredients ingredients={item.ingredients} />
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
