import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editField } from "@/api/fields";
import { FIELD_QUERY_KEY } from "@/query/fields";

export const EDIT_FIELD_MUTATION_KEY = ["edit-field"];

export function useEditFieldMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: EDIT_FIELD_MUTATION_KEY,
		mutationFn: editField,
		onSuccess: async (_, { type }) => {
			await queryClient.invalidateQueries({ queryKey: FIELD_QUERY_KEY[type] });
		},
	});
}
