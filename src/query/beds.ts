import {
  infiniteQueryOptions,
  queryOptions,
  mutationOptions,
} from "@tanstack/react-query";

import { type BedQueryStatus, type GetBedsFilters, getBeds } from "@/api/beds";
import { postCheckInStudent } from "@/api/check-ins";

export const bedQueries = {
  all: () => ["beds"],
  lists: () => [...bedQueries.all(), "list"],
  list: <T extends BedQueryStatus>(filters?: GetBedsFilters<T>) =>
    infiniteQueryOptions({
      queryKey: [...bedQueries.lists(), filters],
      queryFn: ({ pageParam }) => getBeds({ ...filters, cursor: pageParam }),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.data.next_cursor,
    }),
  details: () => [...bedQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...bedQueries.details(), id],
      // queryFn: () => getBed(id),
    }),
};

export const checkInMuations = {
  post: () =>
    mutationOptions({
      mutationFn: (payload: any) => postCheckInStudent(payload),
    }),
};
