import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { checkInQueries } from "@/query/check-ins";

export function useSingleCheckInDetails(id: any) {
	return useQuery({
		...checkInQueries.detail(Number(id)),
		placeholderData: keepPreviousData,
	});
}
