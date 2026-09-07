import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editField } from "@/api/fields";
import { FIELD_QUERY_KEY } from "@/query/fields";

export function useEditFieldMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editField,
		onSuccess: async (_, { type }) => {
			await queryClient.invalidateQueries({ queryKey: FIELD_QUERY_KEY[type] });
		},
	});
}
