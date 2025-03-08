import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24,
			staleTime: 1000 * 60 * 5,
		},
	},
});

const localStoragePersister = createSyncStoragePersister({
	storage: window.localStorage,
});

persistQueryClient({
	queryClient,
	persister: localStoragePersister,
	dehydrateOptions: {
		shouldDehydrateQuery: ({ queryKey }) => {
			return queryKey[0] === "cart";
		},
	},
});

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export { queryClient, QueryProvider };
