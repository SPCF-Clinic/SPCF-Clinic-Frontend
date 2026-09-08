import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteField } from "@/api/fields";
import { FIELD_QUERY_KEY } from "@/query/fields";

export function useDeleteFieldMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteField,
		onSuccess: async (_, { type }) => {
			await queryClient.invalidateQueries({ queryKey: FIELD_QUERY_KEY[type] });
		},
	});
}
