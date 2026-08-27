import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { itemQueries } from "@/query/items";

export function useDispensedItems() {
	const [search] = useQueryState("search", { defaultValue: "" });
	return useQuery({
		...itemQueries.dispensed({ search }),
		placeholderData: keepPreviousData,
	});
}
