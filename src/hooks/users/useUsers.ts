import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { userQueries } from "@/query/users";

export function useUsers() {
	const [search] = useQueryState("search", { defaultValue: "" });
	return useQuery({
		...userQueries.list({ search }),
		placeholderData: keepPreviousData,
	});
}
