import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createItem } from "@/api/items";
import { itemQueries } from "@/query/items";
import type { ItemType } from "@/types/items";

export function useCreateItemMutation(type: ItemType) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createItem,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: itemQueries.list({ type }).queryKey,
			});
		},
	});
}
