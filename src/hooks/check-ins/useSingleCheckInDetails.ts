import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { checkInQueries } from "@/query/check-ins";

export function useSingleCheckInDetails(id: number | null) {
	return useQuery({
		...checkInQueries.detail(Number(id)),
		enabled: id !== null && id > 0,
		placeholderData: keepPreviousData,
	});
}
