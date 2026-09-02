import { queryOptions } from "@tanstack/react-query";

import { getDashboard } from "@/api/dashboard";

export const dashboardQueries = {
	all: () => ["dashboard"],
	dashboard: () =>
		queryOptions({
			queryKey: [...dashboardQueries.all()],
			queryFn: getDashboard,
		}),
};
