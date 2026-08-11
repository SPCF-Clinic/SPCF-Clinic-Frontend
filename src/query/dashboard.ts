import { getDashboard } from "@/api/dashboard";
import { queryOptions } from "@tanstack/react-query";

export const dashboardQueries = {
  all: () => ["dashboard"],
  dashboard: () =>
    queryOptions({
      queryKey: [...dashboardQueries.all()],
      queryFn: getDashboard,
    }),
};
