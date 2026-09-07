import { useInfiniteQuery } from "@tanstack/react-query";

import { bedQueries } from "@/query/beds";
import type { GetBedsFilters } from "@/api/beds";

export const useBeds = (filters?: GetBedsFilters) => {
  return useInfiniteQuery(bedQueries.list(filters));
};