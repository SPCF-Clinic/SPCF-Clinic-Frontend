import { queryOptions } from "@tanstack/react-query";

import { validateToken } from "@/api/auth";

export const authQueries = {
	all: () => ["auth"],
	me: () =>
		queryOptions({
			queryKey: [...authQueries.all(), "me"],
			queryFn: validateToken,
			retry: false,
			staleTime: Infinity,
		}),
};
