import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createField } from "@/api/fields";
import { FIELD_QUERY_KEY } from "@/query/fields";

export function useCreateFieldMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createField,
		onSuccess: async (_, { type }) => {
			await queryClient.invalidateQueries({ queryKey: FIELD_QUERY_KEY[type] });
		},
	});
}
