import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dispenseItem } from "@/api/items";
import { activityLogQueries } from "@/query/activity-logs";
import { itemQueries } from "@/query/items";
import type { ItemType } from "@/types/items";

export function useDispenseItemMutation(type: ItemType) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: dispenseItem,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: itemQueries.list({ type }).queryKey,
			});

			queryClient.invalidateQueries({
				queryKey: activityLogQueries.lists(),
			});
		},
	});
}
