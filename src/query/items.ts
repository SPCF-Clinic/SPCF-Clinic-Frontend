import { queryOptions } from "@tanstack/react-query";

import {
	type GetDispensedItemsFilters,
	type GetItemsFilters,
	getDispensedItems,
	getItems,
} from "@/api/items";
import type { ItemType } from "@/types/items";

export const itemQueries = {
	all: () => ["items"],
	lists: () => [...itemQueries.all(), "list"],
	list: <T extends ItemType>(filters: GetItemsFilters<T>) =>
		queryOptions({
			queryKey: [...itemQueries.lists(), filters],
			queryFn: () => getItems(filters),
		}),
	details: () => [...itemQueries.all(), "detail"],
	detail: (id: number) =>
		queryOptions({
			queryKey: [...itemQueries.details(), id],
			// queryFn: () => getItem(id),
		}),
	dispensed: (filters?: GetDispensedItemsFilters) =>
		queryOptions({
			queryKey: [...itemQueries.all(), "dispensed", filters],
			queryFn: () => getDispensedItems(filters),
		}),
};
