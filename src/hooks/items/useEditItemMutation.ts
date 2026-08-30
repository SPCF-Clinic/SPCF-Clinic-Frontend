import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editItem } from "@/api/items";
import type { ItemFormValues } from "@/pages/admin/medicines/components/item-form/itemFormContext";
import { itemQueries } from "@/query/items";
import type { ItemType } from "@/types/items";

export function useEditItemMutation(type: ItemType) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ itemId, data }: { itemId: number; data: ItemFormValues }) =>
			editItem(itemId, data),
		onSuccess: async (_, { itemId }) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: itemQueries.list({ type }).queryKey,
				}),
				queryClient.invalidateQueries({
					queryKey: itemQueries.detail(itemId).queryKey,
				}),
			]);
		},
	});
}
