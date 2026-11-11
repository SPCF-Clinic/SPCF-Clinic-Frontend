import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { checkInQueries } from "@/query/check-ins";
import { useAppPage } from "../useAppPage";

export function useCheckIns() {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [date_from] = useQueryState("date_from", { defaultValue: "" });
  const [date_to] = useQueryState("date_to", { defaultValue: "" });
  const [page] = useAppPage();
  return useQuery({
    ...checkInQueries.list({
      search,
      date_from: date_from || undefined,
      date_to: date_to || undefined,
      per_page: 20,
      page,
    }),
    placeholderData: keepPreviousData,
  });
}
