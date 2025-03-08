import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { CategoryItem } from "../types/types";
import { getCategories } from "../requests/requests";

const queryKeys = {
	categories: ["categories"],
};

const useCategories = (): UseQueryResult<Array<CategoryItem>, Error> => {
	return useQuery({
		queryKey: queryKeys.categories,
		queryFn: () => getCategories(),
	});
};

export { useCategories };
