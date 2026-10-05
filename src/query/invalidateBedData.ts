import type { QueryClient } from "@tanstack/react-query";

import { bedQueries } from "@/query/beds";
import { checkInQueries } from "@/query/check-ins";
import { dashboardQueries } from "@/query/dashboard";
import { enumQueries } from "@/query/enums";

/**
 * Bed occupancy lives in the bed lists, the check-in lists and the dashboard
 * rollup, so any mutation that changes occupancy has to refresh all of them.
 */
export function invalidateBedData(queryClient: QueryClient) {
  queryClient.prefetchQuery(enumQueries.checkIns());
  queryClient.invalidateQueries({ queryKey: checkInQueries.lists() });
  queryClient.invalidateQueries({ queryKey: bedQueries.lists() });
  queryClient.invalidateQueries({
    queryKey: dashboardQueries.dashboard().queryKey,
  });
}
