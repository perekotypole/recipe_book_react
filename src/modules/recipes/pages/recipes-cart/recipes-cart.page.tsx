import { Button, Box, Typography, Divider } from "@mui/material";

import { BackButton } from "@/libs/components/components";

import { RecipesCard } from "@/modules/recipes/components/components";
import { useCart } from "@/modules/recipes/storages/storages";

const RecipesCartPage: React.FC = () => {
	const { cart, removeFromCart } = useCart();

	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<BackButton />
			</Box>

			<Typography
				variant="h2"
				sx={{
					marginBottom: 4,
				}}
			>
				Selected Recipes
			</Typography>

			{cart.length === 0 ? (
				<Typography variant="body1">No recipes selected yet.</Typography>
			) : (
				<>
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
						{cart.map((recipe) => (
							<Box key={recipe.idMeal}>
								<RecipesCard {...recipe} />

								<Button
									onClick={() => removeFromCart(recipe.idMeal)}
									color="error"
									sx={{ mt: 1 }}
								>
									Remove
								</Button>
							</Box>
						))}
					</Box>

					<Divider sx={{ marginY: 4 }} />

					<Typography variant="h5" sx={{ marginBottom: 2 }}>
						Ingredients List:
					</Typography>
					{/* <List>
						{ingredientsList.length > 0 ? (
							ingredientsList.map((ingredient, index) => (
								<ListItem key={index}>{ingredient}</ListItem>
							))
						) : (
							<Typography variant="body1">No ingredients available.</Typography>
						)}
					</List> */}

					<Divider sx={{ marginY: 4 }} />

					<Typography variant="h5" sx={{ marginBottom: 2 }}>
						Cooking Instructions:
					</Typography>
					{cart.map((recipe) => (
						<Box key={recipe.idMeal} sx={{ marginBottom: 3 }}>
							<Typography variant="h6">{recipe.strMeal}</Typography>
							<Typography variant="body1">{recipe.strInstructions}</Typography>
						</Box>
					))}
				</>
			)}
		</Box>
	);
};

export { RecipesCartPage };
