import { queryOptions } from "@tanstack/react-query";

import { getAssignableCheckIns } from "@/api/enums";

export const enumQueries = {
  all: () => ["enums"],
  checkIns: () =>
    queryOptions({
      queryKey: [...enumQueries.all(), "checkIns"],
      queryFn: getAssignableCheckIns,
    }),
};
