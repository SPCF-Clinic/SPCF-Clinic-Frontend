import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import type { GetItemsFilters } from "@/api/items";
import { itemQueries } from "@/query/items";
import type { ItemType } from "@/types/items";

export function useItems<T extends ItemType>(props: GetItemsFilters<T>) {
	const [search] = useQueryState("search", { defaultValue: "" });
	return useQuery({
		...itemQueries.list({ search, ...props }),
		placeholderData: keepPreviousData,
	});
}
