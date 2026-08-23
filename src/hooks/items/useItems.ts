import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import type { GetItemsFilters } from "@/api/items";
import { SEARCH_KEYS } from "@/pages/admin/medicines/searchKeys";
import { itemQueries } from "@/query/items";
import type { ItemType } from "@/types/items";

export function useItems<T extends ItemType>(props: GetItemsFilters<T>) {
	const searchKey = SEARCH_KEYS[props.type];

	const [search] = useQueryState(searchKey, { defaultValue: "" });
	return useQuery({
		...itemQueries.list({ search, ...props }),
		placeholderData: keepPreviousData,
	});
}
