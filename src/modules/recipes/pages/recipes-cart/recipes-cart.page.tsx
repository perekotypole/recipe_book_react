import { useMemo } from "react";
import { Button, Box, Typography, Divider, Stack } from "@mui/material";

import { BackButton } from "@/libs/components/components";

import { RecipesCard } from "@/modules/recipes/components/components";
import { useCart } from "@/modules/recipes/storages/storages";

import { RecipeIngredients } from "../../components/components";

const RecipesCartPage: React.FC = () => {
	const { cart, removeFromCart } = useCart();

	const ingredientsList = useMemo(
		() => cart.flatMap((recipe) => recipe.ingredients),
		[cart],
	);

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
				<Stack direction={{ xs: "column", md: "row" }} spacing={4}>
					<Box sx={{ flex: 1 }}>
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
							{cart.map((recipe) => (
								<Box key={recipe.idMeal}>
									<RecipesCard
										item={recipe}
										BottomComponent={
											<Stack>
												<Button
													onClick={() => removeFromCart(recipe.idMeal)}
													color="error"
													size="small"
												>
													Remove
												</Button>
											</Stack>
										}
									/>
								</Box>
							))}
						</Box>

						<Divider sx={{ marginY: 4 }} />

						<Typography variant="h5" sx={{ marginBottom: 2 }}>
							Cooking Instructions:
						</Typography>

						{cart.map((recipe) => (
							<Box key={recipe.idMeal} sx={{ marginBottom: 3 }}>
								<Typography variant="h6">{recipe.strMeal}</Typography>
								<Typography variant="body1">
									{recipe.strInstructions}
								</Typography>
							</Box>
						))}
					</Box>

					<Box
						sx={{
							width: 300,
							maxHeight: "90vh",
							overflowY: "auto",
							position: { xs: "relative", md: "sticky" },
							top: 0,
						}}
					>
						<Typography variant="h5" sx={{ marginBottom: 2 }}>
							Ingredients List:
						</Typography>
						<RecipeIngredients ingredients={ingredientsList} />
					</Box>
				</Stack>
			)}
		</Box>
	);
};

export { RecipesCartPage };
