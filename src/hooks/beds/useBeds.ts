import { useInfiniteQuery } from "@tanstack/react-query";

import { bedQueries } from "@/query/beds";
import type { BedQueryStatus, GetBedsFilters } from "@/api/beds";

export const useBeds = <T extends BedQueryStatus>(
  filters?: GetBedsFilters<T>,
) => {
  return useInfiniteQuery(bedQueries.list(filters));
};
