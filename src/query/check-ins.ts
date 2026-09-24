import { mutationOptions,queryOptions } from "@tanstack/react-query";

import {
	type GetCheckInsFilters,
	getCheckIn,
	getCheckIns,
	updateCheckIn,
	unassignBed,
	resumeBedTimer,
	pauseBedTimer,
	putDispenseItem
} from "@/api/check-ins";


export const checkInQueries = {
	all: () => ["checkIns"],
	lists: () => [...checkInQueries.all(), "list"],
	list: (filters?: GetCheckInsFilters) =>
		queryOptions({
			queryKey: [...checkInQueries.lists(), filters],
			queryFn: () => getCheckIns(filters),
		}),
	details: () => [...checkInQueries.all(), "detail"],
	detail: (id: number) =>
		queryOptions({
			queryKey: [...checkInQueries.details(), id],
			queryFn: () => getCheckIn(id),
		}),
	updateCheckIn: (id: number) =>
		mutationOptions({
			mutationKey: [...checkInQueries.details(), id, ],
			mutationFn: (payload: any) => updateCheckIn(id, payload),
		}),
	unassignBed: (id: number) => 
		mutationOptions({
			mutationKey: [...checkInQueries.details(), id, ],
			mutationFn: () => unassignBed(id),
		}),
	pauseBedTimer: (id: number) => 
		mutationOptions({
			mutationKey: [...checkInQueries.details(), id, ],
			mutationFn: () => pauseBedTimer(id),
		}),
	resumeBedTimer: (id: number) => 
		mutationOptions({
			mutationKey: [...checkInQueries.details(), id, ],
			mutationFn: () => resumeBedTimer(id),
		}),

		dispenseItem: () => ({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      putDispenseItem(id, payload),
  }),
	
};

