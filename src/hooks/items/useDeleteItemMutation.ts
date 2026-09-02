import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteItem } from "@/api/items";
import { itemQueries } from "@/query/items";
import type { ItemType } from "@/types/items";

export function useDeleteItemMutation(type: ItemType) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteItem,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: itemQueries.list({ type }).queryKey,
			});
		},
	});
}
