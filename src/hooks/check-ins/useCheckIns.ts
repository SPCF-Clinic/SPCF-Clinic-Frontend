import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { checkInQueries } from "@/query/check-ins";

export function useCheckIns() {
	const [search] = useQueryState("search", { defaultValue: "" });
	return useQuery({
		...checkInQueries.list({ search }),
		placeholderData: keepPreviousData,
	});
}
