import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RecipeDetails } from "../types/types";

const queryKeys = {
	cart: ["cart"],
};

const useCart = () => {
	const queryClient = useQueryClient();

	const getCart = (): Array<RecipeDetails> => {
		return queryClient.getQueryData<Array<RecipeDetails>>(queryKeys.cart) || [];
	};

	const addToCart = useMutation({
		mutationKey: queryKeys.cart,
		mutationFn: async (recipe: RecipeDetails) => recipe,
		onMutate: async (recipe) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.cart });

			const previousCart =
				queryClient.getQueryData<RecipeDetails[]>(queryKeys.cart) ?? [];

			const isDuplicate = previousCart.some(
				(item) => item.idMeal === recipe.idMeal,
			);

			if (isDuplicate) {
				return { previousCart };
			}

			queryClient.setQueryData(queryKeys.cart, [...previousCart, recipe]);

			return { previousCart };
		},
		onError: (_error, _recipe, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(queryKeys.cart, context.previousCart);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.cart });
		},
	});

	const removeFromCart = useMutation({
		mutationKey: queryKeys.cart,
		mutationFn: async (idMeal: number) => idMeal,
		onMutate: async (idMeal) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.cart });

			const previousCart =
				queryClient.getQueryData<RecipeDetails[]>(queryKeys.cart) ?? [];

			const newCart = previousCart.filter((item) => item.idMeal !== idMeal);

			queryClient.setQueryData(queryKeys.cart, newCart);

			return { previousCart };
		},
		onError: (_error, _idMeal, context) => {
			if (context?.previousCart) {
				queryClient.setQueryData(queryKeys.cart, context.previousCart);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.cart });
		},
	});

	return {
		cart: getCart(),
		addToCart: addToCart.mutate,
		removeFromCart: removeFromCart.mutate,
	};
};

export { useCart };
