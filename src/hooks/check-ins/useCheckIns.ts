import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { checkInQueries } from "@/query/check-ins";
import { useAppPage } from "../useAppPage";

/** The URL-backed filters shared by the on-screen list and the print
 *  export, so both always describe the same set of check-ins. */
export function useCheckInFilters() {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [date_from] = useQueryState("date_from", { defaultValue: "" });
  const [date_to] = useQueryState("date_to", { defaultValue: "" });
  return {
    search,
    date_from: date_from || undefined,
    date_to: date_to || undefined,
  };
}

export function useCheckIns() {
  const filters = useCheckInFilters();
  const [page] = useAppPage();
  return useQuery({
    ...checkInQueries.list({
      ...filters,
      per_page: 20,
      page,
    }),
    placeholderData: keepPreviousData,
  });
}
