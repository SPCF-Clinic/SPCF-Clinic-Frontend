import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { checkInQueries } from "@/query/check-ins";

export function useCheckIns() {
	const [search] = useQueryState("search", { defaultValue: "" });
	const [date_from] = useQueryState("date_from", { defaultValue: "" });
	const [date_to] = useQueryState("date_to", { defaultValue: "" });
	return useQuery({
		...checkInQueries.list({
			search,
			date_from: date_from || undefined,
			date_to: date_to || undefined,
		}),
		placeholderData: keepPreviousData,
	});
}
